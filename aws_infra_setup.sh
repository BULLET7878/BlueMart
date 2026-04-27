#!/bin/bash
set -e

# ==========================================
# AWS Infrastructure Setup for BlueMart
# ==========================================

REGION="us-east-1"
CLUSTER_NAME="bluemart-cluster"
SERVER_REPO="bluemart-server"
CLIENT_REPO="bluemart-client"

echo "Checking AWS credentials..."
aws sts get-caller-identity > /dev/null || { echo "AWS credentials not configured. Please run 'aws configure'."; exit 1; }

echo "1. Creating ECR Repositories..."
# Create Server Repo if it doesn't exist
aws ecr describe-repositories --repository-names $SERVER_REPO --region $REGION 2>/dev/null || \
aws ecr create-repository --repository-name $SERVER_REPO --region $REGION

# Create Client Repo if it doesn't exist
aws ecr describe-repositories --repository-names $CLIENT_REPO --region $REGION 2>/dev/null || \
aws ecr create-repository --repository-name $CLIENT_REPO --region $REGION

echo "2. Creating ECS Cluster..."
aws ecs create-cluster --cluster-name $CLUSTER_NAME --region $REGION

echo "3. IAM Roles Setup (Ensure ecsTaskExecutionRole exists)..."
# This script assumes ecsTaskExecutionRole exists. 
# If it doesn't, you need to create it with 'AmazonECSTaskExecutionRolePolicy' attached.

echo "=========================================="
echo "AWS Infrastructure Setup Complete!"
echo "Next Steps:"
echo "1. Ensure 'ecsTaskExecutionRole' exists in IAM."
echo "2. Push code to GitHub to trigger the CI/CD pipeline which registers Task Definitions and creates Services."
echo "=========================================="
