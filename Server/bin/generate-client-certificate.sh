#!/bin/bash

cacrt="./certs/ca-crt.pem"
cakey="./certs/ca-key.pem"
clientkey="./certs/client-key.pem"
clientcsr="./certs/client-csr.pem"
clientcrt="./certs/client-crt.pem"

openssl genrsa -out "$clientkey" 4096

openssl req -new -key "$clientkey" -out "$clientcsr"

openssl x509 -req -days 9999 -in "$clientcsr" -CA "$cacrt" -CAkey "$cakey" -CAcreateserial -out "$clientcrt"

openssl verify -CAfile "$cacrt" "$clientcrt"
