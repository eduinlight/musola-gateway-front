#!/bin/bash
# exit the script on fails
set -e

# VARS
CI_REGISTRY=$1
DEPLOY_TOKEN=$2
DEPLOY_TOKEN_PASSWORD=$3

# DOCKER COMPOSE VARS
export MUSOLATEST_GATEWAYS_FRONT_IMAGE_NAME=$4
export PORT=$5

# isolating docker-compose
DIR=~/front
mkdir -p $DIR
cp ~/docker-compose.yml $DIR/docker-compose.yml
cd $DIR

docker login -u $DEPLOY_TOKEN -p $DEPLOY_TOKEN_PASSWORD $CI_REGISTRY
docker-compose pull 
docker-compose up -d
docker image prune -f
