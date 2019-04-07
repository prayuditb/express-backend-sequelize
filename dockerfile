from node:10.15.3-alpine

WORKDIR /app
COPY . .
RUN cp .env.prod .env
RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm run serve"]