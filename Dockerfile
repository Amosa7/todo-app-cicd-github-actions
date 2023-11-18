# Use the official Node.js image as the base image
FROM node:latest

# Set environment variables
ENV MONGO_INITDB_ROOT_USERNAME=admin
ENV MONGO_INITDB_ROOT_PASSWORD=09031184603

# Set environment variables for Docker
ENV IS_DOCKER true
ENV IS_DOCKER_COMPOSE false

# Set the working directory in the container
WORKDIR /home/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json /home/app/


# Install application dependencies
RUN npm install

# Copy the application files to the working directory
COPY . /home/app

# Expose the port on which the application will run
EXPOSE 3000

# Command to run when the container starts
CMD ["node", "app.js"]
