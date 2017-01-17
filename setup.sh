#!/usr/bin/env bash

# Set up skeleton branch
git branch -m master skeleton
git remote rename origin skeleton-wordpress-theme
git remote set-url --push skeleton-wordpress-theme no-pushing
git branch -u skeleton-wordpress-theme/master

# Set up master branch
git checkout -b master

# Set up new remote
echo -n "Enter a new Git repository origin: "
read neworigin
if [ -n "$neworigin" ]; then
  git remote add origin "$neworigin"
fi

echo "Setup complete. Pull the 'skeleton-wordpress-theme' branch, then merge it into 'master' to update from the skeleton."
