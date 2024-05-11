FROM node:20-alpine as node-helper

ARG build_env=development

WORKDIR /app

RUN npm cache clean --force

COPY . .

RUN npm install

RUN ./node_modules/@angular/cli/bin/ng build

FROM nginx:1.24 as ngx

COPY --from=node-helper /app/dist/my_blog /usr/share/nginx/html

COPY /nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
