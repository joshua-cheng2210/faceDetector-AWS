# TLDR:
## front end
- s3 for storage
- cloudfront for CDN
- amplify for CI/CD (optional)

## backend
- lambda for serverless API
- api gateway for routing

## postgress DB
- rds for managed database

# details
1. Static Front-end on S3 + CloudFront (or AWS Amplify)
Option A: S3 + CloudFront
S3 Static Website Hosting

5 GB of standard storage + 20 000 GET, 2 000 PUT requests free per month.

Upload your compiled React build (npm run build) to a public S3 bucket, enable “Static website hosting.”

CloudFront CDN

1 TB of data transfer + 2 000 000 HTTP/S requests free per month.

Point a CloudFront distribution at that S3 bucket to get global caching, HTTPS, custom domains, etc.

Option B: AWS Amplify Console
5 GB stored, 15 GB served and 1 000 build minutes free per month.

Connect your GitHub repo, and Amplify will build & deploy your front-end automatically on every push.

2. Back-end API on Lambda + API Gateway (Serverless)
Rather than standing up an EC2 box, you can wrap your Express (or plain Node) handlers in AWS Lambda:

AWS Lambda

1 M free requests/month + 400 000 GB-seconds compute.

Use the serverless-http package to run your Express app in Lambda.

API Gateway (HTTP API)

1 M free calls/month + 750 000 messages.

Configure a single HTTP API in front of your Lambda function(s).

Result: your /api/... endpoints are truly “serverless,” scale to zero when idle, and never incur EC2 costs.

3. PostgreSQL on Amazon RDS
AWS Free Tier includes 750 hours of a single db.t2.micro or db.t3.micro instance per month for 12 months, plus:

20 GB of SSD database storage

20 GB of automated backup storage

Steps:

Open the RDS console → Create database →

Engine: PostgreSQL

Template: Free tier

DB instance class: db.t2.micro (or db.t3.micro)

Configure security group to allow access only from your Lambda (via VPC) or from your local IP for testing.

Note the endpoint and credentials—your backend code will connect there.

4. Glue It Together
Environment Variables

Store your RDS credentials in AWS Secrets Manager or (for Lambda) in encrypted Lambda environment variables.

VPC Considerations

If you put your Lambda in the same VPC as RDS, you’ll lose the very first “cold start” free tier credit—keep an eye on logs.

Alternatively, you can expose your RDS publicly (with strict security groups) for dev only, to avoid VPC overhead.

CI/CD

For the front-end, Amplify or a CloudFront invalidation script on S3.

For the back-end, use the Serverless Framework or AWS SAM to deploy your Lambda/API Gateway stack.

5. Alternatives & Tips
Elastic Beanstalk + EC2

You could launch a single t2.micro EC2 under Elastic Beanstalk for your Node API and still stay within 750 hours free.

Then front-end can also live on that same instance under Nginx—but you’ll burn outbound data transfer on EC2 (vs. cheap CloudFront).

Amazon Lightsail

1 static IP + 512 MB RAM VM free for one month only (less attractive for 12-month Free Tier).

Monitoring your usage

Set up AWS Budgets to alert you if you exceed free-tier usage.

Watch the AWS Billing Dashboard.

6. Bottom-Line Cost
Service	Free tier
S3 + CloudFront	5 GB storage + 1 TB CDN + request allowances
AWS Amplify (opt.)	5 GB storage + 15 GB transfer + 1 000 builds
Lambda + API Gateway	1 M requests + 400 000 GB-sec + 1 M calls
RDS PostgreSQL	750 h db.t2.micro + 20 GB storage + backups

All of the above add up to zero dollars per month as long as you stay within those limits. You absolutely can migrate your entire full-stack demo off Render.com and onto AWS Free Tier—and in the process learn how to design serverless APIs, static-site hosting, and managed databases in a real cloud environment.