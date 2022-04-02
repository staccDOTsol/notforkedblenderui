FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN chown -R node /usr/src/app
COPY . .
EXPOSE 3000
RUN yarn && yarn build
USER node
CMD ["yarn", "start"]
