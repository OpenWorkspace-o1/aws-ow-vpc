import { StackProps } from "aws-cdk-lib";

export interface AwsVpcStackProps extends StackProps {
    readonly resourcePrefix: string;
    readonly deployRegion: string | undefined;
    readonly deployEnvironment: string;
    readonly appName: string;
    readonly vpcSubnetType: string;
    readonly NAT_GATEWAYS: number;
    readonly VPC_CIDR: string;
    readonly VPC_MAX_AZS: number;
}
