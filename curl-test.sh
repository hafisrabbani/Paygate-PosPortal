#!/bin/bash

# Define color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "#######################################################"
echo -e "################# Testing Payment API #################"
echo -e "#######################################################\n"

read -p "Enter order_id: " order_id
read -p "Enter amount: " amount
read -p "Enter expired_minute: " expired_minute

# Install jq
echo -e "${BLUE}Installing jq...${NC}"
sudo apt-get install jq -y
echo -e "\n"

# Endpoint 1: Get Payment Channel
echo -e "${BLUE}Testing get-payment-channel endpoint...${NC}"
curl --location 'http://20.2.221.64/api/v1/payment/get-payment-channel' | jq
echo -e "\n"

# Endpoint 2: Create Transaction
echo -e "${BLUE}Testing create-transaction endpoint...${NC}"
curl --location 'http://20.2.221.64/api/v1/payment/create-transaction' \
    --header 'Content-Type: application/json' \
    --data '{
        "order_id": "'"$order_id"'",
        "amount": "'"$amount"'",
        "expired_minute": "'"$expired_minute"'"
    }' | jq
echo -e "\n"

# Endpoint 3: Create Payment
echo -e "${BLUE}Testing create-payment endpoint...${NC}"
curl --location 'http://20.2.221.64/api/v1/payment/create-payment' \
    --header 'Content-Type: application/json' \
    --data '{
        "order_id": "'"$order_id"'"
    }' | jq
echo -e "\n"

# Endpoint 4: Get Status Payment
echo -e "${BLUE}Testing get-status-payment endpoint...${NC}"
curl --location "http://20.2.221.64/api/v1/payment/get-status-payment?order_id=$order_id" | jq
echo -e "\n"

echo -e "${GREEN}All tests completed.${NC}"
