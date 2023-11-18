### SIMULATING JENKINS AUTOMATION TO DEPLOY CONTAINERIZED JS WEBAPP USING GITHUB ACTION

### Introduction
The aim of this project is to demonstrates how to containerized Node.js web application using Docker, push it to repository (in this case nexus repository). And also, to create Docker-compose file, connecting it to MongoDB, and utilizing GitHub Actions to simulate CI/CD pipeline. The application includes a MongoDB database and Mongo Express for easy database management. 
And finally, the application is deployed on "assumed" production server to ensure seamless and reliable accessibility for end-users.

![84_SuI-Zg](https://github.com/Amosa7/todo-app-cicd-github-actions/assets/136304747/0bb1ae1c-6be8-4cc1-8a28-008da86859a2)

### STEP 1: PREPARING THE WEBAPP PROJECT
Begin by downloading the source code for the Todo-App from the Kashipara dev community. The frontend of the app has already been developed by the comm., and I built the backend using Node.js to enable server-side functionality. This backend will establish a connection with the MongoDB database.

![Screenshot (64)](https://github.com/Amosa7/todo-app-cicd-github-actions/assets/136304747/a1a404fc-4ae1-4bb5-86d3-c0a028458a6f)

### STEP 2: CREATING A DOCKERFILE
To containerize the Web App, I created a Dockerfile which  contains instructions for assembling the Docker image of the application. The image are built from base image (i.e node:latest).

I defined some environmental variables in this Dockerfile to determine or construct mongoURL accordingly when running the Dockerfile separately from the Docker-compose file:

- IS_DOCKER=true: Indicates that the application is running in a separate Docker container.
- IS_DOCKER_COMPOSE=false: Indicates that the application is not part of a docker-compose setup.

![Screenshot (66)](https://github.com/Amosa7/todo-app-cicd-github-actions/assets/136304747/d4d82c2f-4614-45b7-90fc-8dfbc7599a8b)

### STEP 3: CREATING A DOCKER-COMPOSE FILE (docker-compose.yaml) TO TEST AND RUN THE RUN APP LOCALLY
I created the docker-compose.yaml file to simultaneous execute MongoDB and Mongo Express containers. This file acts as a configuration blueprint, orchestrating connection of the app and Mongodb database and also Mongo-express for user interface of Mongdb.

![Screenshot (67)](https://github.com/Amosa7/todo-app-cicd-github-actions/assets/136304747/862cc4cd-900f-4e01-8f5f-78fd730971ab)

### STEP4: RUNNING THE APP LOCALLY
To run the App locally, I initiate the MongoDB and Mongo Express containers by executing the YAML file...Mongo-express is accessible on localhost:8080

![Screenshot (44)](https://github.com/Amosa7/todo-app-cicd-github-actions/assets/136304747/f428c71c-624c-4c50-b3b5-6cfbdafefbd1)

![Screenshot (48)](https://github.com/Amosa7/todo-app-cicd-github-actions/assets/136304747/95cfd7ae-8125-416b-a186-837ce962c6b4)

#### And then, start the App locally from my terminal.As you can see, the app is running and accessible on localhost:3000

![Screenshot (68)](https://github.com/Amosa7/todo-app-cicd-github-actions/assets/136304747/c62cab11-a989-405b-8908-0a8fef29294b)

![Screenshot (47)](https://github.com/Amosa7/todo-app-cicd-github-actions/assets/136304747/1bdac846-39f0-4078-9e98-f7d18727f3d6)


### STEP: BUILDING AND PUSHING DOCKER IMAGE TO REPOSITORY (NEXUS)

Recall, that I have successfully created Dockerfile in previous step, next is that I built the image and tagged it with Nexus Repository details. After that, I created docker-hosted repository on nexus and then logged in into repository and finally, pushed the image to nexus repository.

![Screenshot (56 1)](https://github.com/Amosa7/todo-app-cicd-github-actions/assets/136304747/ca5d229b-9ae2-41dc-b98a-c151390e0188)

### STEP: DEPLOYING ON "ASSUMED" PROD SERVER

Next is an important step which is the deploying of the the App on assumed production server. I copied docker-compose.yaml and use it on  productions server to initiate or deploy the App, I defined some environmental variables to pull the docker image of the App from Nexus repository, and to run Mongodb and Mongo express containers.

![Screenshot (57)](https://github.com/Amosa7/todo-app-cicd-github-actions/assets/136304747/8d206b91-0cb6-4247-9e9d-602306482d2d)

![Screenshot (58)](https://github.com/Amosa7/todo-app-cicd-github-actions/assets/136304747/320ae58d-b750-4692-9967-f3f76ea246c6)

Explanation of the 3 services defined:
Todo-app:
- This service represents the Node.js web application. It pulled the Docker image I built from Nexus Repository.

Mongodb:
- This pulled official MongoDB image from Docker Hub. 
- its the database nodejs app will connect to

Mongo-express:
- This also pulled official Mongo-express image from Docker hub.
- it provides a web-based user interface for managing MongoDB databases.

And BOOM, My app is running successful on production server.

![Screenshot (60)](https://github.com/Amosa7/todo-app-cicd-github-actions/assets/136304747/a9ffdb7a-8c3c-4296-ba17-41e8f03faa45)

![Screenshot (61)](https://github.com/Amosa7/todo-app-cicd-github-actions/assets/136304747/6962f0d2-44e3-43f3-916d-7df25f5a92cf)
