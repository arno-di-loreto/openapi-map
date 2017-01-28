#! /bin/bash

set -e

if [ -z ${DEPLOY_REPO+x} ]
then 
  DEPLOY_REPO=`git config --get remote.origin.url`
  echo "DEPLOY_REPO is not set, using available remote url $DEPLOY_REPO"
else 
  echo "DEPLOY_REPO is set to $DEPLOY_REPO"
fi

if [ -z ${DEPLOY_BRANCH+x} ]
then 
  echo "DEPLOY_BRANCH is not set"
  exit 1 
else 
  echo "DEPLOY_BRANCH is set to $DEPLOY_BRANCH"
fi

if [ -z ${BUILD_TARGET+x} ]
then
  BUILD_TARGET="_site" 
  echo "BUILD_TARGET is not set, using default $BUILD_TARGET" 
else 
  echo "BUILD_TARGET is set to $BUILD_TARGET"
fi

if [ -z ${DEPLOY_TARGET+x} ]
then
  DEPLOY_TARGET=".deploy" 
  echo "DEPLOY_TARGET is not set, using default $DEPLOY_TARGET" 
else 
  echo "DEPLOY_TARGET is set to $DEPLOY_TARGET"
fi

if [ -z ${GH_TOKEN+x} ]
then 
  echo "GH_TOKEN is not set, using default credentials"
  DEPLOY_REPO_CREDENTIALS=$DEPLOY_REPO
else 
  echo "GH_TOKEN is set updating REPO_URL"
  TMP_URL=`echo $DEPLOY_REPO | sed "s/https:\/\///"`
  DEPLOY_REPO_CREDENTIALS="https://${GH_TOKEN}@${TMP_URL}"
fi

if [ -z ${PUBLISH_MESSAGE+x} ]
then 
  PUBLISH_MESSAGE="publish"
  echo "PUBLISH_MESSAGE is not set, using default value $PUBLISH_MESSAGE"
else 
  echo "PUBLISH_MESSAGE is set to $PUBLISH_MESSAGE"
fi

function update {
  echo "updating deploy branch $DEPLOY_BRANCH from $DEPLOY_REPO in $DEPLOY_TARGET"
  cd $DEPLOY_TARGET;git pull;cd ..;
}

function install { 
	echo "cloning deploy branch $DEPLOY_BRANCH from $DEPLOY_REPO in $DEPLOY_TARGET"
  git clone --depth 1 $DEPLOY_REPO --branch $DEPLOY_BRANCH --single-branch $DEPLOY_TARGET 
}

function prepare { 
	echo "cleaning $DEPLOY_TARGET folder"
	if [ -d "$DEPLOY_TARGET/.git" ]
  then
    update
  else
    install 
  fi
  rm -rf $DEPLOY_TARGET/*
  if [ -d $BUILD_TARGET ]
  then
    echo "copying build result from $BUILD_TARGET to $DEPLOY_TARGET"
    cp -r $BUILD_TARGET/* $DEPLOY_TARGET/
  else
    echo "no build available"
    exit 1 
  fi
}

function publish {
  echo "publishing"
  cd $DEPLOY_TARGET
  TO_COMMIT=`git status --porcelain | wc -l`
  if [ "$TO_COMMIT" -eq "0" ]; then
    echo "Nothing to commit on $DEPLOY_BRANCH in repo $DEPLOY_REPO";
  else
    if [ ${GH_USER+x} ]
    then
      echo "setting git user.name with GH_USER env variable" 
      git config --global user.name "$GH_USER"
    fi
    if [ ${GH_EMAIL+x} ]
    then
      echo "setting git user.email with GH_EMAIL env variable"
      git config --global user.email "$GH_EMAIL"
    fi
    git add --all
    git commit -m "$PUBLISH_MESSAGE"
    git push $DEPLOY_REPO_CREDENTIALS
  fi
}

function main {
	prepare
	publish
}

main