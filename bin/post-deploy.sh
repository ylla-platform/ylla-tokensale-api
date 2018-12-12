#!/usr/bin/env bash

# load node
. $HOME/.bashrc
. "$NVM_DIR/nvm.sh" && nvm use v11

host=$(hostname)
name=ylla
project=ylla-tokensale-api

. $HOME/www/${name}/${project}/.env

production=$YLLA_PRODUCTION_HOST
development=$YLLA_DEVELOPMENT_HOST

node -v
npm -v

echo "current host: $host production: $production development: $development"

if [[ $host == "$production" ]] || [[ $host == "$development" ]]; then
  cd $HOME/www/${name}/${project}
  npm i
  # pm2 restart
  . $HOME/.bashrc
	if [[ $host == "$production" ]]; then
  	echo "restarting production...."
  	npm run restart:production
	elif [[ $host == "$development" ]]; then
	  echo "restarting development...."
  	npm run restart:development
	fi
fi
