FROM node:14-slim as build-client
WORKDIR /
COPY client/package-lock.json ./
RUN npm i

#################

FROM node:14-slim as build-server
WORKDIR /
COPY server/package-lock.json ./
RUN npm i

#################

FROM node:14-slim

ENV MODE='server'

RUN npm i -g @craco/craco && \
    npm i -g sequelize && \ 
    npm i -g sequelize-cli && \ 
    npm i -g babel-register && \ 
    npm install -g create-react-app

WORKDIR /
COPY . .
COPY --from=build-client ./node_modules /client/
COPY --from=build-server ./node_modules /server/

RUN cd /client && npm i && npm run build
RUN cd /server && npm i

# Add docker-compose-wait tool -------------------
ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait
RUN cp /server/server/config/config.docker.json server/server/config/config.json 

RUN cd /
RUN chmod +x start.sh

EXPOSE 3000

ENTRYPOINT ["/start.sh"]