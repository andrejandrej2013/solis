FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . ./
# in dev mod (nodemon)
CMD [ "npm", "run", "dev" ]

# in production mod
# CMD [ "npm", "run", "start" ]
