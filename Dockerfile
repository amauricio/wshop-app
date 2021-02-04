FROM node:lts-jessie

RUN apt-get update && \
    apt-get install -y dos2unix


# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./
# Install production dependencies.
RUN npm install

# Copy local code to the container image.
COPY . ./

RUN pwd
RUN ls -a


# Run the web service on container startup.
#CMD [ "npm", "start" ]
#EXPOSE 8080 9091
#CMD ["/bin/bash", "/usr/src/app/start.sh" ]


# Copy start shell to image
COPY start.sh /usr/src/app/start.sh

RUN cat /usr/src/app/start.sh
RUN dos2unix /usr/src/app/start.sh
RUN chmod +x /usr/src/app/start.sh


ENTRYPOINT ["/usr/src/app/start.sh"]

