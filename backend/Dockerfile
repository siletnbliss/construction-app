###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:20-alpine As development

WORKDIR /usr/src/app 

COPY package*.json ./

RUN npm i 

COPY . .

CMD ["npm", "run", "start:dev" ]

###################
# BUILD FOR PRODUCTION
###################

FROM node:20-alpine As build

WORKDIR /usr/src/app

COPY package*.json ./

# copy already installed files from development
COPY --from=development /usr/src/app/node_modules ./node_modules

COPY . .

RUN npm run build 

ENV NODE_ENV production

# only install production dependencies
RUN npm ci --only=production && npm cache clean --force


###################
# PRODUCTION
###################
FROM node:20-alpine As production

# Copy the bundled code from the build stage to the production image
COPY  --from=build /usr/src/app/node_modules ./node_modules
COPY  --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]
