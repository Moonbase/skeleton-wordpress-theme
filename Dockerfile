FROM wordpress:latest

RUN curl -sS http://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -

RUN apt-get update && apt-get install -y build-essential libpq-dev nodejs yarn && rm -rf /var/lib/apt/lists/*

ADD package.json yarn.lock /usr/src/wordpress/wp-content/themes/wordpress-theme/
RUN yarn install

COPY . /usr/src/wordpress/wp-content/themes/wordpress-theme/
