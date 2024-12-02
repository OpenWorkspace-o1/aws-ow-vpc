#!/usr/bin/env node
import 'source-map-support/register';

import * as cdk from 'aws-cdk-lib';
import * as dotenv from 'dotenv';
import { booleanParser, checkEnvVariables } from '../utils/check-environment-variable';

import { ApplyTags } from '../utils/apply-tag';
import { Aspects } from 'aws-cdk-lib';
import { AwsSolutionsChecks } from 'cdk-nag';
import { AwsVpcStack } from '../lib/aws-vpc-stack';
import { AwsVpcStackProps } from '../lib/AwsVpcStackProps';

dotenv.config(); // Load environment variables from .env file
const app = new cdk.App();

const appAspects = Aspects.of(app);

// check APP_NAME variable
checkEnvVariables('APP_NAME',
    'CDK_DEPLOY_REGION',
    'ENVIRONMENT',
    'VPC_SUBNET_TYPE',
    'NAT_GATEWAYS',
    'VPC_CIDR',
    'VPC_MAX_AZS',
    'OWNER',
);

const { CDK_DEFAULT_ACCOUNT: account } = process.env;

const cdkRegion = process.env.CDK_DEPLOY_REGION;
const deployEnvironment = process.env.ENVIRONMENT!;

const appName = process.env.APP_NAME!;
const owner = process.env.OWNER!;

// check best practices based on AWS Solutions Security Matrix
appAspects.add(new AwsSolutionsChecks());

appAspects.add(new ApplyTags({
    environment: deployEnvironment as 'development' | 'staging' | 'production' | 'feature',
    project: appName,
    owner: owner,
}));

const stackProps: AwsVpcStackProps = {
    resourcePrefix: `${appName}-${deployEnvironment}`,
    env: {
        region: cdkRegion,
        account,
    },
    deployRegion: cdkRegion,
    deployEnvironment,
    appName,
    vpcSubnetType: process.env.VPC_SUBNET_TYPE!,
    NAT_GATEWAYS: parseInt(process.env.NAT_GATEWAYS!),
    VPC_CIDR: process.env.VPC_CIDR!,
    VPC_MAX_AZS: parseInt(process.env.VPC_MAX_AZS!),
};
new AwsVpcStack(app, `AwsVpcStack`, {
    ...stackProps,
    stackName: `${appName}-${deployEnvironment}-${cdkRegion}-AwsVpcStack`,
    description: `AwsVpcStack for ${appName} in ${cdkRegion} ${deployEnvironment}.`,
});

app.synth();
