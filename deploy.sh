#!/bin/bash

# if pull request to branch production
echo $TRAVIS_PULL_REQUEST_BRANCH && $TRAVIS_BRANCH
if [ $TRAVIS_PULL_REQUEST_BRANCH == 'production' ] ; then
  echo 'Attempting deploy...'
else
  echo 'Not deploying, pull request branch is not production.'
fi
