## DEVELOPMENT
# dev
FROM node:14.17.6-alpine AS dev
# args
ARG UID=1000
ARG GID=$UID
ARG APP_PATH
# body
RUN deluser --remove-home node              \
  && addgroup -S node -g ${GID}             \
  && adduser -S -G node -u ${UID} node      \
  && mkdir -p ${APP_PATH}                   \
  && chown -R ${UID}:${GID} ${APP_PATH}
USER node
WORKDIR ${APP_PATH}

## PRODUCTION
# build
FROM node:14.17.6-alpine AS build-front
ARG APP_PATH
ARG API_URL
WORKDIR ${APP_PATH}
RUN echo "API_URL='${API_URL}'" >> .env
COPY . .
RUN npm install
RUN npm run build

# nginx
FROM nginx:1.13.9-alpine AS prod-front
ARG APP_PATH
COPY --from=build-front ${APP_PATH}/build/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
