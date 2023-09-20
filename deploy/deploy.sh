#!/bin/bash

echo "Starting deploying to $EC2_IP_ADDRESS ... "
ssh ubuntu@$EC2_IP_ADDRESS 'bash' < ./deploy/run_server.sh