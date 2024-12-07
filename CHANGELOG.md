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