pipeline {
    
    agent any
    
    environment {
        registry = "068643504245.dkr.ecr.us-east-1.amazonaws.com/express-repo"
    }
    stages {
        stage ('Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/saspath/express-scaffold']])
            }
        }
        stage ('Docker Image Build') {
            steps {
                script {
                    dockerImage = docker.build registry
                }
            }
        }
        //This code pushes the image to AWS ECR
        stage ('Docker Push') {
            steps {
                script {
                    sh 'aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 068643504245.dkr.ecr.us-east-1.amazonaws.com'
                    sh 'docker push 068643504245.dkr.ecr.us-east-1.amazonaws.com/express-repo:latest'
                }
            }
        }
        //Stopping Docker containers for cleaner Docker run
        stage ('stop previous containers') {
            steps {
                sh 'docker ps -f name=mynodeContainer -q | xargs --no-run-if-empty docker container stop'
                sh 'docker container ls -a -fname=mynodeContainer -q | xargs -r docker container rm'
            }
        }
        //This will run the Docker container
        stage ('Docker Run') {
            steps {
                script {
                    sh 'docker run -d -p 3000:3000 --rm --name mynodeContainer 068643504245.dkr.ecr.us-east-1.amazonaws.com/express-repo:latest'
                }
            }
        }
    }
}
