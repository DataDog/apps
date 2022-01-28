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
    if geo.status_code == 200
        retried = false
        context.response.headers.add "X-retried", "false"
    else
        until geo.status_code == 200
          debug == "true" && STDERR.puts "#{Time.local} : #{geo.status_code} received, retrying..."
          geo = get_geo(ip)
          retried = true
          context.response.headers.add "X-retried", "true"
        end
    end
    ## quick & dirty hack to handle bad responses (mostly 429s / rate-limits)
    ## better : implement retries w/ exponential backoff startegy, see https://github.com/feifanzhou/robust_http.cr
    ## even better : do not rely on 3rd party API, implement GeoIP2 natively, see https://github.com/delef/geoip2.cr

    if ! geo.nil?
        begin
            geo_j = JSON.parse(geo.body)
            geo_h = geo_j.as_h
        rescue
          debug == "true" && STDERR.puts geo.body
          geo_h = {} of String => String
        end
    else
        geo_h = {} of String => String
    end

    ## Build response object
    response = {
        "http" => {
            "headers": headers,
            "method": method,
            "path": path,
            "params": params,
            "retried": retried
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
