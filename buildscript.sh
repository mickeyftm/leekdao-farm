#!/bin/sh
read -s -p "Enter Password for sudo: " sudoPW

yarn

if [ -d "build" ]
then
  rm -rf build/*
else
  echo "build folder not exists"
fi

yarn build

TIMESTAMP=`date '+%Y_%m_%d_%H_%M_%S'`
BUILD_FOLDER_PRE="build_"
BUILD_FOLDER=$BUILD_FOLDER_PRE$TIMESTAMP
ssh leekdao@149.28.181.19 "mkdir $BUILD_FOLDER"

scp -r ./build/* leekdao@149.28.181.19:~/$BUILD_FOLDER/
ssh leekdao@149.28.181.19 "echo $sudoPW | sudo -S rm -rf /var/www/html/farm.leekdao.xyz/*"
ssh leekdao@149.28.181.19 "echo $sudoPW | sudo -S cp -R ~/$BUILD_FOLDER/* /var/www/html/farm.leekdao.xyz/"