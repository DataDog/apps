from flask import Flask, jsonify
from flask_cors import CORS

import requests
import json

app = Flask(__name__)
CORS(app)


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
    url = "http://api:3001/api/menu?email=thomas.dimnet@datadoghq.com"

    payload = json.dumps({})
    headers = {
      'token': '3qyPgFdVA2GvkJZxSsthtM',
      'Content-Type': 'application/json'
    }

    response = requests.request("GET", url, headers=headers, data=payload)

    return response.text

