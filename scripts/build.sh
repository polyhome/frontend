set -e
echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
docker build -t polyhome/frontend .
docker push polyhome/frontend:latest
docker tag polyhome/frontend:latest polyhome/frontend:$TRAVIS_TAG
docker push polyhome/frontend:$TRAVIS_TAG
docker tag polyhome/frontend:latest polyhome/frontend:${TRAVIS_TAG:0:3}
docker push polyhome/frontend:${TRAVIS_TAG:0:3}