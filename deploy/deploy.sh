#!/bin/bash

echo "Starting deploying to $EC2_IP_ADDRESS ... "
ssh ubuntu@$EC2_IP_ADDRESS "cd travel_be_auth && rm -f .env && cat $ENV_DATA >> .env"
ssh ubuntu@$EC2_IP_ADDRESS 'bash' < ./deploy/run_server.sh