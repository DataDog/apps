import json
from flask import Flask, jsonify
from flask_cors import CORS

from datadog_proxy import request_emails, request_ips, request_ifconfig

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def hello_world():
    return "<p>hello, world</p>"


@app.route('/emails')
def get_emails():

    response = request_emails()
    parse_to_json = json.loads((response.text))

    return jsonify(parse_to_json)


@app.route('/ips')
def get_ips():

    response = request_ips()
    parse_to_json = json.loads((response.text))
    ips = parse_to_json['data'][0]['attributes']['columns'][0]['values']

    ips_with_geo_data = request_ifconfig(ips)

    return jsonify(ips_with_geo_data)

