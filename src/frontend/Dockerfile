FROM node:22-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm run install

COPY . .

RUN npm run build --prod

FROM nginx:stable

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/time-tracking/browser/ /usr/share/nginx/html

EXPOSE 80
