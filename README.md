Sample SAP S/4HANA System API for payments project
------

This repository contains a sample implementation of the SAP S/4HANA System API for payments, based on **FINS Payments Web UI Experience API** 

Containerise Payment Application
------

   - Ensure you have installed Vagrant on your laptop/PC. If you need help, [read this blog](https://mulethunder.blog/2021/01/08/teaching-how-to-use-vagrant-to-simplify-building-local-dev-and-test-environments/). 

   - Download or Git clone this Github repo: 

			git clone https://github.com/mulethunder/payments.git

   - In a terminal window, change directory to where you cloned/downloaded the repository – Notice that the Vagrantfile is already in there.

   - Start up your Vagrant Dev VM:

	        vagrant up

   - Note: Give it some time the first time. It will download the Ubuntu Box and install all dependencies. Subsequent times will be much faster. Once it finishes, as per the bootstrap process, your Vagrant VM is going to come with all necessary components installed, like Docker Engine, Node JS, etc, so that you can build your Hello World app as a Docker image.
    
   - You can now **vagrant ssh** into the Virtual Machine.

            vagrant ssh

   - Go to your working directory (mounted from host OS - shred folder).

            cd /vagrant

   - Feel free to explore the Dockerfile. It is doing the following:

        - Line 1: Starting from existing Docker Hub node image version 9.11.1 (the latest stable when writing this blog)

        - Line 2: Setting the Working directory within the new Docker node image (creating and changing current directory)

        - Line 3: Adding all the local directory (i.e. the “nodeJS-ms” App) content/files into the Working directory

        - Line 4: It will run “npm install” to retrieve all the NodeJS App dependencies. In this case only the “express” module (see package.json for more information).

        - Line 5: Defines the intended port on which the App is configured to run on. In this case 3000. 

        - Line 6: Setting the command to run when “this” image is run. In this case, running the NodeJS App (as indicated in package.json).

   - As for the NodeJS app, I tried to keep it extremely simple. The actual NodeJS app is app.js

        - Lines 1 to 5: Require the “express” module and getting the config file that contains the port on which this Application will listen on (i.e. 3000)

        - Lines 8 to 12: Define a GET API URI (i.e. “/”) and return “Hello World from a NodeJS Application” – Feel free to change the message if you like.

        - Lines 15 to 18: Defines the actual Listening service running on the configured port (i.e. 3000) and giving a welcome message.

   - The other file that you might want to have a look is the actual NodeJS descriptor package.json - It is quite self-explanatory, but just pay close attention to:

        - dependencies -> express – This is what is executed at “docker build” time, as defined in the Dockerfile (RUN npm install).

        - scripts -> Start: node app.js – This is what will be executed at “docker run” time as defined in the Dockerfile (CMD npm start).

   - Lastly, have a look at config.js – It defines the port on which the NodeJS app is going to run by default if not otherwise set as a system variable. Also notice that this aligns with the Dockerfile EXPOSE 3000 directive.

   - Ok, now that everything is clear, let’s build our Docker image. Since we already added the vagrant user to the docker group during the bootstrap of this Vagrant Box instance. Let’s simply build the docker image:

            docker build .
    
        Note: Notice the last dot “.”

   - Give it some time the first time, as it has to pull the node image from Docker Hub first (~200MB).

   - As the Docker build process moves across the 6 steps, you will be able to see the progress in the console.

   - At the end it will show you the id of your final Docker image. Make a note of it, as you will need it later when tagging your image.

   - Let’s quickly test that our new Docker image works well. For this, let’s run the image using its id as a reference. The command goes like this:

   - Execute locally your new Docker Image of your Application:

            docker run -p [HostPort]:[ContainerPORT] -it [DockerImageId]
        
            Note: -i is to run it in interactive mode, which means that you can stop it later on by ctrl+c.

                For example, in our case:
            
            docker run -p 3000:3000 -it [DockerImageId]

            By default port 3000 was configured as a "Port Forward" by vagrant as part of your VM bootstrap during its creation.

   - If you need to re-package this Docker image, tag the Docker image:

            docker tag [Image_ID] [DockerRepoUsername]/[DockerRepoName]:[version]

            For example:

                docker tag c26c58862548 mulethunder/payments:1.0

            Note, if you are unsure about the actual "image_id", you can use "docker images" to gather all images being generated.

            Also notice that you could have tagged your Docker image at the moment of “docker building” by using -t [user/repoName]
            

   - In your host OS, open a browser and go to: **http://localhost:3000** - Test your app. 
    
   - Once you feel comfortable with the Docker image, push it to Docker Hub or any other Image repository, so that you can run it easily in the future.
   
            For example: I assume that you have already created a repository in your DockerHub or ECR, for example, I have this one in DockerHub: mulethunder/payments

            In Vagrant, login to DockerHub or your Image Repository:

            docker login

                Enter username, password and email.

            docker push [DockerRepoUsername]/[DockerRepoName]

                E.g. docker push muletHunder/payments:1.0


Deploy your application in Kubernetes
------

   - Go to where you have installed and configured **kubectl**.

        Note: [Read this blog](https://mulethunder.blog/2021/09/01/getting-the-containers-and-kubernetes-basics-right/) if you need assistance to provision Kubernetes.

   - Download or Git clone this Github repo: 

            git clone https://github.com/mulethunder/payments.git

   - Go to where you cloned/downloaded the repository

   - Change directory to deploy/kubernetes

            cd deploy/kubernetes

   - Use the template **payments-dpl.yaml_sample** to create a new file **payment-dpl.yaml** - In this file, at the end, set the Docker image tag name (e.g. xxx/payments:1.0).

   - Deploy your application resources (deployment, service, ingress)

            ./deploy.sh        

   - Open up Kubernetes Dashboard UI or equivalent (e.g. WeaveScope) and validate all resources were deployed successfully.

   - Test your application, open a browser and go to: **http://[YOUR_KUBERNETES_LB]/xxx** - Test your app. 
    
    
If you need any assistance, feel free to [contact me](https://www.linkedin.com/in/citurria/).