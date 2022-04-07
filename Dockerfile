FROM node:9.11.1
WORKDIR /myProject
ADD . /myProject
RUN npm install
EXPOSE 3000
CMD npm start
