
# stage: 1 — build
FROM node as sentiment-analysis-webapp
ARG BUILD_ENV
WORKDIR /app
COPY . ./
RUN yarn
RUN node -r dotenv/config ./node_modules/.bin/react-scripts build dotenv_config_path=config/$BUILD_ENV.env

# stage: 2 — the production environment
FROM nginx:alpine
COPY /config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=sentiment-analysis-webapp /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]