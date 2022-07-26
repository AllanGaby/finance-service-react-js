FROM node:16 as builder
ARG API_HOST
ENV BASE_URL=${API_HOST}
WORKDIR /opt/tcc-finance-service
COPY ./src ./src
COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./public_key.pem ./public_key.pem
COPY ./webpack.production.js ./webpack.production.js
COPY ./.env ./.env
RUN echo $API_HOST
RUN export BASE_URL=$API_HOST
RUN yarn
RUN yarn build

FROM nginx:alpine
COPY --from=builder /opt/tcc-finance-service/public /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
