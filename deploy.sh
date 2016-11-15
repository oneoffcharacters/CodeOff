#!/bin/bash

# if pull request to branch production
if [ $TRAVIS_PULL_REQUEST_BRANCH == 'production' ] ; then
  echo 'Attempting deploy...'
  docker --help
else
  echo 'Not deploying, pull request branch is not production.'
fi
