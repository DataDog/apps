from flask import Flask, jsonify
from flask_cors import CORS

import requests
import json

app = Flask(__name__)
CORS(app)

API_URL = 'http://api:3000/api'
TOKEN = 'IkQfZt50rspbRSsoLSgwgo'

@app.route('/api/users', methods=['POST'])
def create_user():
    url = "http://api:3001/api/users"

    payload = json.dumps({
      "name": "thomas",
      "email": "thomas.dimnet@datadoghq.com",
      "password": "toto90",
      "address": "Hooiland 20, 5663HC Geldrop"
    })
    headers = {
      'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    return response.text


@app.route('/api/tokens', methods=['POST'])
def get_token():
    url = "http://api:3000/api/tokens"

    payload = json.dumps({
      "email": "thomas.dimnet@datadoghq.com",
      "password": "toto90"
    })
    headers = {
      'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    return response.text


@app.route('/api/menu', methods=['GET'])
def get_menu():
    url = '{}/menu?email=thomas.dimnet@datadoghq.com'.format(API_URL)

    payload = json.dumps({})
    headers = {
      'token': TOKEN,
      'Content-Type': 'application/json'
    }

    response = requests.request("GET", url, headers=headers, data=payload)
    data = json.loads(response.text)

    pizzas = []

    for key, pizza in data.items():
        pizzas.append(pizza)


    res = {
        "data": pizzas
    }

    return jsonify(res)


@app.route('/api/cart', methods=['GET'])
def get_cart():
    url = '{}/cart?email=thomas.dimnet@datadoghq.com'.format(API_URL)

    payload={}
    headers = {
      'token': TOKEN
    }

    response = requests.request("GET", url, headers=headers, data=payload)

    return response.text



@app.route('/api/cart', methods=['POST'])
def update_cart():
    url = '{}/cart'.format(API_URL)

    payload = json.dumps({
      "email": "thomas.dimnet@datadoghq.com",
      "id": "da8e-9f48-eac6",
      "size": 10,
      "amount": 1
    })
    headers = {
      'token': TOKEN,
      'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    return response.text


@app.route('/api/order', methods=['POST'])
def create_order():
    url = "{}/order".format(API_URL)

    payload = json.dumps({
      "email": "thomas.dimnet@datadoghq.com"
    })
    headers = {
      'token': TOKEN,
      'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    print(response.text)

    return "ok"

