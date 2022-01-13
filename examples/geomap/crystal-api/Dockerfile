FROM crystallang/crystal:1.3.0-alpine-build as base
ADD . /api
WORKDIR /api
RUN shards install
EXPOSE 8080

FROM base as build
RUN shards build
ENTRYPOINT ["bin/geomap"]
HEALTHCHECK --start-period=15s --interval=15s --timeout=5s --retries=3 \
  CMD curl -f http://localhost:8080 || exit 1

