# Slice Pizza


## cURL Requests

### Creating an user

```
curl --location --request POST 'http://localhost:5000/api/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "username",
    "email": "username@example.com",
    "password": "password",
    "address": "Hooiland 20, 5663HC Geldrop"
}'
```

### Getting a token

```
curl --location --request POST 'http://localhost:5000/api/tokens' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "username@example.com",
    "password": "password"
}'
```


### Getting the menu

curl --location --request GET 'http://localhost:5000/api/menu?email=username@example.com' \
--header 'token: yourToken' \
--header 'Content-Type: application/json' \
--data-raw '{}'

