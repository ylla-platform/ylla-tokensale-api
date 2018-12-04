#!/usr/bin/env bash

args=(-azvP --delete --exclude=node_modules --exclude=.idea --exclude=.git)
hosts=(ylladev ylla ylladevfrankfurt yllafrankfurt) # tornado lightning thunder tundra jefferson
dry=() #add --dry-run to enable testing
user=ubuntu
name=ylla
project=ylla-tokensale-api

for host in "${hosts[@]}"
do
  echo ""
  date
  echo "---------------------"
  echo "syncing ${host}"
  echo "---------------------"
  rsync ${dry[@]} ${args[@]} ./ ${user}@${host}:www/${name}/${project}
  ssh -t ${user}@${host} \$HOME/www/${name}/${project}/bin/post-deploy.sh
done

version=$(jq -r .version package.json)
say "yella token sale API is live!"
exit
