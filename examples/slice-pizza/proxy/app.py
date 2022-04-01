from flask import Flask, jsonify, request
from flask_cors import CORS

import requests
import json

app = Flask(__name__)
CORS(app)

API_URL = 'http://api:3000/api'

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.json

    payload = json.dumps({
      "name": data["name"],
      "email": data["email"],
      "password": data["password"],
      "address": data["address"]
    })
    headers = {
      'Content-Type': 'application/json'
    }

    url = "{}/users".format(API_URL)

    response = requests.request("POST", url, headers=headers, data=payload)
    return response.text


@app.route('/api/tokens', methods=['POST'])
def get_token():
    data = request.json

    payload = json.dumps({
      "email": data["email"],
      "password": data["password"]
    })
    headers = {
      'Content-Type': 'application/json'
    }

    url = "{}/tokens".format(API_URL)

    response = requests.request("POST", url, headers=headers, data=payload)

    return response.text


@app.route('/api/menu', methods=['GET'])
def get_menu():
    email = request.args.get("email")
    token = request.headers.get("token")
    
    payload = json.dumps({})
    headers = {
      'token': token,
      'Content-Type': 'application/json'
    }

    url = '{}/menu?email={}'.format(API_URL, email)

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
    token = request.headers.get("token")

    payload={}
    headers = {
      'token': token
    }

    url = '{}/cart?email=thomas.dimnet@datadoghq.com'.format(API_URL)
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

