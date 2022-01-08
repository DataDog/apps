require "http/server"
require "json"

bind = ENV["BIND"] ||= "0.0.0.0"
port = ENV["PORT"] ||= "8080"
port = port.to_i

debug = ENV["DEBUG"] ||= "false"

def parse_body(headers, method, req)
    if method == "POST"
        if headers["Content-Type"] == "application/json"
            body = JSON.parse(req.body.as(IO).gets_to_end.to_s)
        else
            body = req.body.as(IO).gets_to_end.to_s
        end
    else
        body = nil
    end

    return body
end


def get_geo(ip)
    if ip.nil?
        geo = HTTP::Client.get "https://ifconfig.co/json"
    elsif ip == "*"
        geo = HTTP::Client.get "https://ifconfig.co/json?ip=8.8.8.8"
    else
        geo = HTTP::Client.get "https://ifconfig.co/json?ip=#{ip}"
    end

    return geo
end


server = HTTP::Server.new do |context|
    ## Process Context
    req = context.request
    headers = req.headers
    path = req.path
    params = req.query_params.to_h
    method = req.method

    body = parse_body(headers, method, req)

    ## Get geolookup ip either from x-forwarded-for header or from url query params
    if headers.has_key?("X-Forwarded-For") ; ip = headers["X-Forwarded-For"] ; end
    if params.has_key?("ip") ; ip = params["ip"] ; end

    geo = get_geo(ip)

    if ! geo.nil?
        geo_j = JSON.parse(geo.body)
        geo_h = geo_j.as_h
    end

    ## Build response object
    response = {
        "http" => {
            "headers": headers,
            "method": method,
            "path": path,
            "params": params
        },
        "geo" => geo_h
    }

    context.response.content_type = "text/json"
    context.response.print response.to_pretty_json
    context.response.headers.add "Access-Control-Allow-Origin", "*"
    context.response.status_code = 200
    context.response.close
end

address = server.bind_tcp bind, port
puts "Magic happens on port #{port}"

server.listen

