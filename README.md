# 전체적인 S3 진행 정리

### 1. 버킷 생성

```bash
aws s3 mb s3://[BUCKET_NAME]
```

### 2. 버킷과 로컬 빌드 파일 동기화

```bash
aws s3 sync [BUILD_FILE_PATH] s3://[BUCKET_NAME]
```

### 3. 퍼블릭 액세스 차단 해제

```bash
aws s3api put-public-access-block --bucket [BUCKET_NAME] --public-access-block-configuration 'IgnorePublicAcls=false, BlockPublicPolicy=false, RestrictPublicBuckets=false, BlockPublicAcls=false'
```

or

<details>
<summary><u><i>S3PublicAccessBlockConfig.json</i></u></summary>

```json
{
  "IgnorePublicAcls": false, // or false
  "BlockPublicPolicy": false, // or false
  "RestrictPublicBuckets": false, // or false
  "BlockPublicAcls": false // or false
}
```

</details>

```bash
aws s3api put-public-access-block --bucket [BUCKET_NAME] --public-access-block-configuration file://[S3PublicAccessBlockConfig.json_FILE_PATH]
```

### 4. 버킷 정책 추가

<details>
<summary><u><i>S3BucketPolicy.json</i></u></summary>

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "[BUCKET_ARN]/*"
    }
  ]
}
```

</details>

```bash
aws s3api put-bucket-policy --bucket [BUCKET_NAME] --policy file://[S3BucketPolicy.json_FILE_PATH]
```

### 5. 정적 웹 사이트 호스팅 활성화

```bash
aws s3 website s3://[BUCKET_NAME]/ --index-document index.html --error-document index.html
```

<br>
<br>

# 전체적인 CloudFront 배포 진행 정리

### 1. CloudFront 배포 (json 적용)

<details>
<summary><u><i>CloudFrontDistributionConfig.json</i></u></summary>

```json
{
  "CallerReference": "[BUCKET_ID]",
  "Comment": "[COMMENTS]",
  "DefaultRootObject": "[ex: index.html]",
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "[CLOUDFRONT_ID]",
        "DomainName": "[BUCKET_DOMAIN]",
        "OriginPath": "",
        "CustomHeaders": {
          "Quantity": 0
        },
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        },
        "ConnectionAttempts": 3,
        "ConnectionTimeout": 10,
        "OriginShield": {
          "Enabled": false
        },
        "OriginAccessControlId": ""
      }
    ]
  },
  "OriginGroups": {
    "Quantity": 0
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "[BUCKET_NAME]",
    "TrustedSigners": {
      "Enabled": false,
      "Quantity": 0
    },
    "TrustedKeyGroups": {
      "Enabled": false,
      "Quantity": 0
    },
    "ViewerProtocolPolicy": "redirect-to-https"|"allow-all"|"https-only",
    "AllowedMethods": {
      "Quantity": 2,
      "Items": ["HEAD", "GET"]|["GET", "HEAD", "OPTIONS"]|["GET", "HEAD". "OPTIONS", "PUT", "PATCH", "DELETE"],
      "CachedMethods": {
        "Quantity": 2,
        "Items": ["HEAD", "GET"]|["GET", "HEAD", "OPTIONS"]|["GET", "HEAD". "OPTIONS", "PUT", "PATCH", "DELETE"]
      }
    },
    "SmoothStreaming": false,
    "Compress": true,
    "LambdaFunctionAssociations": {
      "Quantity": 0
    },
    "FunctionAssociations": {
      "Quantity": 0
    },
    "FieldLevelEncryptionId": "",
    "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6"|"4135ea2d-6df8-44a3-9df3-4b5a84be39ad"|"4135ea2d-6df8-44a3-9df3-4b5a84be39ad"|"08627262-05a9-4f76-9ded-b50ca2e3a84f"
  },
  "CacheBehaviors": {
    "Quantity": 0
  },
  "CustomErrorResponses": {
    "Quantity": 1,
    "Items": [
      {
        "ErrorCode": 403,
        "ResponsePagePath": "/index.html",
        "ResponseCode": "200",
        "ErrorCachingMinTTL": 10
      }
    ]
  },
  "Logging": {
    "Enabled": false,
    "IncludeCookies": false,
    "Bucket": "",
    "Prefix": ""
  },
  "PriceClass": "PriceClass_100"|"PriceClass_200"|"PriceClass_All",
  "Enabled": true,
  "Restrictions": {
    "GeoRestriction": {
      "RestrictionType": "blacklist"|"whitelist"|"none",
      "Quantity": 2,
      "Items": ["AF", "AX", ...]
    }
  },
  "WebACLId": "",
  "HttpVersion": "http1.1"|"http2"|"http3"|"http2and3",
  "IsIPV6Enabled": true,
  "ContinuousDeploymentPolicyId": "",
  "Staging": false
}
```

</details>

```bash
aws cloudfront create-distribution --distribution-config file://[CloudFrontDistributionConfig.json_FILE_PATH]
```

### 2. CloudFront 무효화

```bash
aws cloudfront create-invalidation --distribution-id [CloudFront_ID] --paths "/*" # or "/file"
```
