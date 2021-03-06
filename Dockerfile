# if you're doing anything beyond your local machine, please pin this to a specific version at https://hub.docker.com/_/node/
FROM node:8

# default to port ${PORT} for node, and 5858 or 9229 and 9230 (tests) for debug
EXPOSE ${PORT} 5858 9229 9230

# Create app directory
# Where the app is built and run inside the docker fs
ENV CWD=/app
WORKDIR ${CWD}

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./package*.json ./

RUN npm install && npm cache clean --force

# expose .bin for node packages
ENV PATH /app/node_modules/.bin:$PATH

# check every 30s to ensure this service returns HTTP 200
HEALTHCHECK --interval=30s CMD node healthcheck.js

# Bundle app source
COPY ./ ./

# if you want to use npm start instead, then use `docker run --init in production`
# so that signals are passed properly. Note the code in index.js is needed to catch Docker signals
# using node here is still more graceful stopping then npm with --init afaik
# I still can't come up with a good production way to run with npm and graceful shutdown
CMD [ "node", "index.js" ]
