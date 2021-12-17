# Datadog Redis App

![The Datadog Dashboard and the Datadog App of the project](redis-app-hero.png)

## Prerequesites

- Docker
- A Datadog Account with:
  - An API Key
  - An application Key


## Getting Started

Clone the repo

```
$ git clone git@github.com:DataDog/apps.git
```

Change to Random Dog Directory

```
$ cd ./cd examples/redis/
```

Copy the example env file and add yours

```
$ cp .env.example .env
```

Build the Docker images

```
$ docker-compose build
```

Launch the Docker containers and go to Datadog.
A Dashboard and an Datadog App has been created for you.

Search for the Datadog App Redis Dashboard.

```
$ docker-compose up
```

## Contributing

If you want to contribute to the project, don't hesitate to contact me at
thomas.dimnet@datadoghq.com.

There is also a docker-compose file for the dev env.
Build your Docker images

```
$ docker-compose -f docker-compose-dev.yml build
```

Launch your Docker containers

```
$ docker-compose -f docker-compose-dev.yml up
```

Then, you can bash into them

```
$ docker container exec -ti ${containerId} bash
```




