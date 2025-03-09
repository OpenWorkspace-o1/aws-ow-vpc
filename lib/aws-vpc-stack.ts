import * as cdk from 'aws-cdk-lib';
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as iam from "aws-cdk-lib/aws-iam";
import * as logs from "aws-cdk-lib/aws-logs";
import { Construct } from 'constructs';
import { AwsVpcStackProps } from './AwsVpcStackProps';
import { parseVpcSubnetType } from '../utils/vpc-type-parser';
import { NagSuppressions } from 'cdk-nag';

export class AwsVpcStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AwsVpcStackProps) {
    super(scope, id, props);

    const vpcName = `${props.resourcePrefix}-VPC`;
    const vpcSubnetType = parseVpcSubnetType(props.vpcSubnetType);

    // print out vpcSubnetType
    console.log(`VPC Subnet Type: ${vpcSubnetType}`);

    // print out maxAzs
    console.log(`Max Availability Zones: ${props.VPC_MAX_AZS}`);

    // print out NAT gateways
    console.log(`NAT Gateways: ${props.NAT_GATEWAYS}`);

    // print out VPC CIDR
    console.log(`VPC CIDR: ${props.VPC_CIDR}`);

    const removalPolicy = props.deployEnvironment === 'production' ? cdk.RemovalPolicy.RETAIN : cdk.RemovalPolicy.DESTROY;

    const owVpc = new ec2.Vpc(this, vpcName, {
            ipAddresses: ec2.IpAddresses.cidr(props.VPC_CIDR), //IPs in Range - 65,536
            natGateways: props.NAT_GATEWAYS, // Isolated Subnets do not route traffic to the Internet (in this VPC), and as such, do not require NAT gateways.
            maxAzs: props.VPC_MAX_AZS, // for high availability
            subnetConfiguration: [
                {
                    name: `${props.resourcePrefix}-PUBLIC`,
                    subnetType: ec2.SubnetType.PUBLIC,
                    cidrMask: 24, //IPs in Range - 256
                },
                {
                    name: `${props.resourcePrefix}-${vpcSubnetType}-rds`,
                    subnetType: vpcSubnetType,
                    cidrMask: 24, //IPs in Range - 256
                },
                {
                    name: `${props.resourcePrefix}-${vpcSubnetType}-services`,
                    subnetType: vpcSubnetType,
                    cidrMask: 24, //IPs in Range - 256
                },
            ],
            enableDnsHostnames: true,
            enableDnsSupport: true,
    });
    owVpc.applyRemovalPolicy(removalPolicy);

    // apply removal policy to all vpc and subnet resources
    owVpc.applyRemovalPolicy(removalPolicy);
    for (const subnet of owVpc.privateSubnets) {
        subnet.applyRemovalPolicy(removalPolicy);
    }
    for (const subnet of owVpc.isolatedSubnets) {
        subnet.applyRemovalPolicy(removalPolicy);
    }
    for (const subnet of owVpc.publicSubnets) {
        subnet.applyRemovalPolicy(removalPolicy);
    }

    const vpcFlowLogRole = new iam.Role(this, `${props.resourcePrefix}-RoleVpcFlowLogs`, {
        assumedBy: new iam.ServicePrincipal("vpc-flow-logs.amazonaws.com"),
        inlinePolicies: {
            CloudWatchFullAccessPolicy: new iam.PolicyDocument({
                statements: [
                    new iam.PolicyStatement({
                        actions: [
                            "logs:CreateLogGroup",
                            "logs:CreateLogStream",
                            "logs:PutLogEvents",
                            "logs:DescribeLogGroups",
                            "logs:DescribeLogStreams",
                        ],
                        resources: ["*"],
                    }),
                ],
            }),
        },
    });

    // Suppress cdk-nag rule for wildcard permissions
    NagSuppressions.addResourceSuppressions(
        vpcFlowLogRole,
        [
            {
                id: 'AwsSolutions-IAM5',
                reason: 'The wildcard permissions are required for VPC flow logs to function correctly.',
            },
        ],
        true
    );

    const vpcFlowLogGroup = new logs.LogGroup(this, `${props.resourcePrefix}-VpcFlowLogGroup`, {
        retention: logs.RetentionDays.ONE_MONTH,
        removalPolicy: removalPolicy,
    });

    new logs.LogStream(this, `${props.resourcePrefix}-VpcFlowLogStream`, {
        logGroup: vpcFlowLogGroup,
        removalPolicy: removalPolicy,
    });

    new ec2.FlowLog(this, `${props.resourcePrefix}-VpcFlowLog`, {
        resourceType: ec2.FlowLogResourceType.fromVpc(owVpc),
        destination: ec2.FlowLogDestination.toCloudWatchLogs(vpcFlowLogGroup, vpcFlowLogRole),
        trafficType: ec2.FlowLogTrafficType.ALL,
    });

    // export vpc id
    new cdk.CfnOutput(this, `${props.resourcePrefix}-VPC-ID`, {
        value: owVpc.vpcId,
        description: 'VPC ID',
        exportName: `${props.resourcePrefix}-VPC`,
    });
  }
}
