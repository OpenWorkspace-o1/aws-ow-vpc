declare module NodeJS {
    interface ProcessEnv {
        [key: string]: string | undefined;
        CDK_DEPLOY_REGION: string;
        ENVIRONMENT: string;
        APP_NAME: string;
        VPC_ID: string;
        VPC_SUBNET_TYPE: string;
        NAT_GATEWAYS: string;
        VPC_CIDR: string;
        VPC_MAX_AZS: string;
        OWNER: string;
    }
}