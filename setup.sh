#!/usr/bin/env bash

# Set up skeleton branch
echo "== Configuring skeleton and master branch =="
git branch -m master skeleton
git remote rename origin skeleton-wordpress-theme
git remote set-url --push skeleton-wordpress-theme no-pushing
git branch -u skeleton-wordpress-theme/master

# Set up master branch
git checkout -b master

# Set up new remote
echo "== Configuring remotes =="
echo -n "Enter a new Git repository origin:"
read neworigin
if [ -n "$neworigin" ]; then
  git remote add origin "$neworigin"
fi

echo "== Installing NPM dependencies =="
yarn install

echo "== Building assets =="
yarn run build

echo "== Setup complete =="
echo "- You can remove the setup script and 'Creating a project' section from the readme."
echo "- To update from the skeleton pull the 'skeleton-wordpress-theme' branch, then merge it into 'master'."
