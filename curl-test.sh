#!/bin/bash

read -p "Enter order_id: " order_id
read -p "Enter amount: " amount
read -p "Enter expired_minute: " expired_minute


# Endpoint 1: Get Payment Channel
echo "Testing get-payment-channel endpoint..."
curl --location 'http://20.2.221.64/api/v1/payment/get-payment-channel'
echo -e "\n"

# Endpoint 2: Create Transaction
echo "Testing create-transaction endpoint..."
curl --location 'http://20.2.221.64/api/v1/payment/create-transaction' \
    --header 'Content-Type: application/json' \
    --data '{
        "order_id": $order_id,
        "amount": $amount,
        "expired_minute": $expired_minute
    }'
echo -e "\n"

# Endpoint 3: Create Payment
echo "Testing create-payment endpoint..."
curl --location 'http://20.2.221.64/api/v1/payment/create-payment' \
    --header 'Content-Type: application/json' \
    --data '{
        "order_id": $order_id,
    }'
echo -e "\n"

# Endpoint 4: Get Status Payment
echo "Testing get-status-payment endpoint..."
curl --location 'http://20.2.221.64/api/v1/payment/get-status-payment?order_id=$order_id'
echo -e "\n"

echo "All tests completed."
