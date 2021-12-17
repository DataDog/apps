import redis
from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

cache = redis.Redis(
    host='redis',
    port=6379,
    client_name='flask-app',
)


@app.route('/clients', methods=['GET'])
def get_clients():
    clients = cache.client_list()

    data = list(map(lambda client: {
        'id': client['id'],
        'ip': client['addr'],
        'name': client['name']
        }, clients))

    return jsonify({'data': data})


@app.route('/keys', methods=['GET'])
def get_keys():
    data = cache.keys()

    res = []

    for key in data:
        res.append(key.decode())

    return jsonify({'data': res})


@app.route('/keys/<key_id>', methods=['GET'])
def get_key(key_id):
    key_value = cache.get(key_id)

    return jsonify({'data': key_value.decode()})


@app.route('/keys/<key_id>', methods=['DELETE'])
def delete_key(key_id):
    delete_key = cache.delete(key_id)

    return jsonify({
        'success': str(bool(delete_key))
    })


@app.route('/search', methods=['GET'])
def search_key():
    query = request.args.get('query')

    keys = cache.keys('*{}*'.format(query))

    if len(keys) == 0:
        return jsonify({'search': []})

    result = get_keys_value(keys)

    return jsonify({'search': result})


def get_keys_value(keys):
    data = []

    for key in keys:
        decoded_key = key.decode()
        key_value = cache.get(decoded_key)
        ttl = cache.ttl(decoded_key)

        data.append({
            'key_id': decoded_key,
            'key_value': key_value.decode(),
            'key_ttl': ttl
        })

    return data

