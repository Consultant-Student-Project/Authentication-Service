FROM  node:latest

# Creating working dir
WORKDIR /usr/src/app

# Installing dependincies
COPY package*.json ./
RUN npm install
RUN npm install -g typescript
RUN npm install bcrypt --save 
# Copy source code
COPY . .

# Expose port
EXPOSE 3000


# Start App
CMD [ "npm","start" ]