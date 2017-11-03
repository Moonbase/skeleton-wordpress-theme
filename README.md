# Moonbase Co. WordPress starter theme

## Creating a project
To create a new project from this skeleton, follow these steps:

* `git clone <repository-url>` this repository.
* Change into the new directory.
* Run `./setup.sh`. This will create a 'skeleton' branch and a 'master' branch. The 'skeleton' branch is used to update from the skeleton later on.
* You can remove this section of the readme and the setup script, the project is now set up.

## Required WordPress plugins
This theme requires the following WordPress plugins:

* The Timber WordPress plugin: http://upstatement.com/timber/

## Development requirements
The following is required for your development environment:

* Docker and Docker Compose

or

* A webserver supporting PHP
* A MySQL server
* Node: https://nodejs.org/en/
* NPM: https://nodejs.org/en/
* Yarn: https://yarnpkg.com

## Installation

* `git clone <repository-url>` this repository.
* Change into the new directory.
* `yarn install`

## Developing
The following commands are available for development:

* `docker-compose up`: Starts a development server using Docker Compose.
* `yarn run build`: Build all front-end assets.
* `yarn run watch`: Starts a watcher that builds all front-end assets when they are changed.

If you are using Docker, you can also run the yarn commands in the Docker container: `docker-compose exec web sh -c "cd /var/www/html/wp-content/themes/wordpress-theme && yarn watch"`.

## Updating from the skeleton
This project was created using the skeleton-wordpress-theme project skeleton. If you want to update this project to the latest changes made to the skeleton, follow these steps:

* Pull remote 'skeleton-wordpress-theme/master' into local branch 'skeleton'.
* Switch to the local branch 'master'.
* Merge the local branch 'skeleton' into 'master'.
