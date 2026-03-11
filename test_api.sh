#!/bin/bash
# Registrando um usuário
USER_RES=$(curl -s -X POST http://localhost:8080/api/v1/users -H "Content-Type: application/json" -d '{"name":"Teste Error","email":"error@test.com","cpf":"12345678901","password":"password123","phone":"11999999999"}')
echo "Create User: $USER_RES"

# Login para pegar o token
LOGIN_RES=$(curl -s -X POST http://localhost:8080/api/v1/auth/login -H "Content-Type: application/json" -d '{"email":"error@test.com","password":"password123"}')
echo "Login: $LOGIN_RES"
TOKEN=$(echo $LOGIN_RES | grep -oP '"token":"\K[^"]+')

# Testando listOrders
ORDERS_RES=$(curl -s -X GET http://localhost:8080/api/v1/orders/user/1 -H "Authorization: Bearer $TOKEN")
echo "List Orders: $ORDERS_RES"

# Testando listUsers
USERS_RES=$(curl -s -X GET http://localhost:8080/api/v1/users -H "Authorization: Bearer $TOKEN")
echo "List Users: $USERS_RES"
