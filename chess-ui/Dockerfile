FROM node:18-alpine
WORKDIR /app
EXPOSE 3000
COPY . .
RUN npm install
COPY . .
CMD ["npm", "start"]