FROM node:latest AS build
WORKDIR /app
COPY ./package.json ./
RUN npm i
COPY . .
ENV VITE_BACKEND_URL=/api
RUN npm run build

FROM nginx:latest
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html