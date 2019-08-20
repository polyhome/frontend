#!/bin/bash

set -xe
: "${API_URL?Need an api url}"

sed -i "s/API_URL_REPLACE/$API_URL/g" /usr/share/nginx/html/main*.js

exec "$@"