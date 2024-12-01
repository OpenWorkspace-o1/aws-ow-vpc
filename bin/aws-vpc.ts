#!/usr/bin/env node

import * as cdk from 'aws-cdk-lib';
import { AwsVpcStack } from '../lib/aws-vpc-stack';

const app = new cdk.App();
new AwsVpcStack(app, 'AwsVpcStack', {
});
