FROM centos:8

# Create app directory
WORKDIR /usr/src/frontend-web

ADD . ./
RUN curl -sL https://rpm.nodesource.com/setup_14.x | bash -
RUN dnf install -y nodejs

RUN npm install

EXPOSE 3000
CMD [ "npm", "start"]
