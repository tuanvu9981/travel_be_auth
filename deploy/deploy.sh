#!/bin/bash

echo "Starting deploying to $EC2_IP_ADDRESS ... "

# Get sensitive data from ENV_DATA in CICD storage, copy to .env file in repo.
ssh ubuntu@$EC2_IP_ADDRESS 'bash' < ./deploy/before_running.sh

ssh ubuntu@$EC2_IP_ADDRESS 'bash' < ./deploy/run_server.sh