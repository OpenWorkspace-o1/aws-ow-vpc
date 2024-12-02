# AWS VPC CDK Project

This project creates a customizable VPC infrastructure using AWS CDK with TypeScript.

## Prerequisites

- Node.js (v14.x or later)
- AWS CLI v2
- AWS CDK CLI
- AWS Account and credentials

## Setup Instructions

### 1. Install AWS CLI

```bash
# macOS (using Homebrew)
brew install awscli

# Verify installation
aws --version
```

### 2. Configure AWS CLI Profile

```bash
aws configure
# Enter your:
# - AWS Access Key ID
# - AWS Secret Access Key
# - Default region (e.g., ap-southeast-2)
# - Output format (json)
```

### 3. Install AWS CDK CLI

```bash
npm install -g aws-cdk
```

### 4. Project Setup

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

Edit the `.env` file with your desired configuration:
- APP_NAME: Your application name
- CDK_DEPLOY_REGION: AWS region for deployment
- ENVIRONMENT: development/staging/production
- VPC_SUBNET_TYPE: PRIVATE_ISOLATED or PRIVATE_WITH_EGRESS
- NAT_GATEWAYS: Number of NAT gateways
- VPC_CIDR: VPC CIDR range
- VPC_MAX_AZS: Maximum number of Availability Zones

### 5. Deploy Infrastructure

```bash
# Bootstrap CDK (first time only)
cdk bootstrap

# Deploy the stack
cdk deploy
```

## Available VPC Configurations

- PRIVATE_ISOLATED: VPC with private subnets only
- PRIVATE_WITH_EGRESS: VPC with private subnets and NAT Gateways for internet access

## Useful Commands

* `npm run build`   Compile TypeScript to JavaScript
* `npm run watch`   Watch for changes and compile
* `npm run test`    Run the jest unit tests
* `cdk deploy`      Deploy this stack to your AWS account
* `cdk diff`        Compare deployed stack with current state
* `cdk synth`       Emit the synthesized CloudFormation template
