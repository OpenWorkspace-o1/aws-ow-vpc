## 2025-01-11 [*](https://github.com/OpenWorkspace-o1/aws-vpc/pull/27)

### Changed
- Updated `aws-cdk` and `aws-cdk-lib` dependencies from `2.175.0` to `2.175.1`.

### Updated
- Updated `peerDependencies` for `aws-cdk` and `aws-cdk-lib` to version `2.175.1`.
- Incremented project version from `0.1.5` to `0.1.6`.

## 2025-01-10 [*](https://github.com/OpenWorkspace-o1/aws-vpc/pull/23)

### Changed
- Unified `removalPolicy` logic in `AwsVpcStack` for consistent behavior across environments.
- Updated `aws-cdk` and `aws-cdk-lib` dependencies from `2.174.0` to `2.175.0`.
- Updated `typescript` dependency from `~5.7.2` to `~5.7.3`.

### Updated
- Updated `peerDependencies` for `aws-cdk` and `aws-cdk-lib` to version `2.175.0`.

## 2024-12-29 [*](https://github.com/OpenWorkspace-o1/aws-vpc/pull/19)

### Changed
- Updated `aws-cdk` and `aws-cdk-lib` dependencies from `2.173.2` to `2.173.4`
- Updated `OWNER` field in environment configuration files from `OPENWORKSPACE` to `OpenWorkspace-o1`

### Updated
- Incremented project version from `0.1.3` to `0.1.4`
- Updated `peerDependencies` for `aws-cdk` and `aws-cdk-lib` to version `2.173.4

## 2024-12-07

### Changed
- Simplified `APP_NAME` environment variable from `openworkspace-aws-vpc` to `ow-vpc` across development, example, and production configuration files
- Updated environment configuration files to use shorter, more concise app name while maintaining consistent settings

## 2024-12-07

### Changed
- Renamed VPC variable from `cxVpc` to `owVpc` for improved code consistency
- Updated production environment VPC configuration to use `PRIVATE_ISOLATED` subnets and removed NAT gateways
- Applied removal policy to VPC and subnet resources for clean stack deletion

### Added
- Implemented VPC ID export functionality using `CfnOutput` for easier cross-stack referencing