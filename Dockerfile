FROM node:latest
COPY . /hosp_back  
WORKDIR /hosp_back
RUN npm install
CMD ["npm", "start"]
EXPOSE 8000
