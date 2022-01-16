#!/bin/bash

# launches a docker container to execute lighthouse. for development.

rm -r lighthouse/report/*

VARIANT=${VARIANT:-trainings}

docker run --rm -u "$(id -u)" -v "$(pwd)":/app -w /app -e VARIANT=${VARIANT} \
trion/chromium-lighthouse ./lighthouse/launch.sh

