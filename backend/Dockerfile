FROM node
WORKDIR /app
RUN apt update && apt install ffmpeg -y
COPY ./package.json ./
RUN npm i
COPY . .
CMD ["npm","start"]