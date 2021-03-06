FROM cloudron/base:0.8.1
MAINTAINER Johannes Zellner <johannes@nebulon.de>

ENV DEBIAN_FRONTEND noninteractive

ENV PATH /usr/local/node-0.12.7/bin:$PATH

RUN mkdir -p /app/code
WORKDIR /app/code

ADD src /app/code/src
ADD app /app/code/app
ADD cli /app/code/cli

ADD package.json app.js start.sh README.md /app/code/

RUN npm install --production

EXPOSE 3000

CMD [ "/app/code/start.sh" ]
