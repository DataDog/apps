#!/bin/sh

set -euo pipefail

## bail if missing deps
type curl jq 1>&2

_curl(){
    ## test ${URL}
    ## bail if response != 200
    curl ${URL:-127.0.0.1:8080} ${OPTS:--Lksfo/dev/null} ${EXTRA_OPTS:-} -w '
    {
        "http" : {
            "status_code" :  %{http_code}      ,
            "duration"    :  %{time_total}     ,
            "url"         : "%{url_effective}"
        }
    }
    ' | jq ${JQ_OPTS:--ce} "${FILTER:-select( .http.status_code == ${STATUS_CODE:-200} )}"
}

## loop-test ${URL}
while _curl ; do sleep ${DELAY:-0} ; done
