FROM node:12.18.2-alpine
WORKDIR '/app'

COPY package.json .
RUN npm install 
COPY . .
CMD ["npm", "start"]