#!/bin/bash

# if pull request to branch production
if [ $TRAVIS_BRANCH == 'production' ] ; then
  echo 'Attempting deploy...'
  docker build -q -t rdgifford/thesis .
  # docker run -p 3000:3000 rdgifford/thesis
  docker login -u $DOCKER_LOGIN_USER -p $DOCKER_LOGIN_PASSWORD
  
  docker ps -a
else
  echo 'Not deploying, pull request branch is not production.'
fi
