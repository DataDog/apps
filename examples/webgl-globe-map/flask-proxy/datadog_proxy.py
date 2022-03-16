import requests
import json
import os

DD_SITE = os.environ.get('DD_SITE')
DD_API_KEY = os.environ.get('DD_API_KEY')
DD_APP_KEY = os.environ.get('DD_APP_KEY')
AUTH_TOKEN = os.environ.get('AUTH_TOKEN')

def request_emails():
    url = "https://app.{}/api/v2/query/scalar".format(DD_SITE)

    payload = json.dumps({
      "meta": {
        "dd_extra_usage_params": {
          "widget_id": "552688630132494",
          "is_user_initiated": True
        }
      },
      "data": [
        {
          "type": "scalar_request",
          "attributes": {
            "formulas": [
              {
                "formula": "query1",
                "limit": {
                  "count": 1000,
                  "order": "desc"
                }
              }
            ],
            "queries": [
              {
                "search": {
                  "query": ""
                },
                "data_source": "audit",
                "compute": {
                  "aggregation": "count"
                },
                "name": "query1",
                "indexes": [
                  "*"
                ],
                "group_by": [
                  {
                    "should_exclude_missing": True,
                    "facet": "@usr.email",
                    "sort": {
                      "aggregation": "count",
                      "order": "desc"
                    },
                    "limit": 1000
                  }
                ]
              }
            ],
            "from": 1646818864000,
            "to": 1646822464000
          }
        }
      ],
      "_authentication_token": AUTH_TOKEN
    })
    headers = {
      'DD-API-KEY': DD_API_KEY,
      'DD-APPLICATION-KEY': DD_APP_KEY,
      'DD-SITE': DD_SITE,
      'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    return response


def request_ips():
    url = "https://app.{}/api/v2/query/scalar".format(DD_SITE)

    payload = json.dumps({
      "meta": {
        "dd_extra_usage_params": {
          "widget_id": "2313104896100148",
          "is_user_initiated": True
        }
      },
      "data": [
        {
          "type": "scalar_request",
          "attributes": {
            "formulas": [
              {
                "formula": "query1",
                "limit": {
                  "count": 50,
                  "order": "desc"
                }
              }
            ],
            "queries": [
              {
                "search": {
                  "query": ""
                },
                "data_source": "audit",
                "compute": {
                  "aggregation": "count"
                },
                "name": "query1",
                "indexes": [
                  "*"
                ],
                "group_by": [
                  {
                    "should_exclude_missing": True,
                    "facet": "@network.client.ip",
                    "sort": {
                      "aggregation": "count",
                      "order": "desc"
                    },
                    "limit": 1000
                  }
                ]
              }
            ],
            "from": 1646829682000,
            "to": 1646833282000
          }
        }
      ],
      "_authentication_token": AUTH_TOKEN
    })
    headers = {
      'DD-API-KEY': DD_API_KEY,
      'DD-APPLICATION-KEY': DD_APP_KEY,
      'DD-SITE': DD_SITE,
      'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    return response


def request_ifconfig(ips):
    geo_data = []

    for ip in ips:
        ip = ip[0]
        response = requests.get(url='https://ifconfig.co/json?ip={}'.format(ip))
        parse_to_json = json.loads(response.text)

        lat = parse_to_json['latitude']
        lng = parse_to_json['longitude']

        geo_data.append({
            "id": ip,
            "lat": lat,
            "lng": lng
        })

    return geo_data

