pipeline {
    
    agent {
     dockerfile true   
    }
    
    environment {
        registry = "802165080994.dkr.ecr.us-east-1.amazonaws.com/mydockerrepo"
    }
    
    //This Code gets the code from Git Repo
    stages {
        stage ('Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/saspath/express-scaffold']])
            }
        }
        //This code will build the image
        stage ('Docker Build') {
            steps {
                script {
                    dockerImage = docker.build registry
                }
            }
        }
        //This code pushes the image to AWS-ECR
        stage ('Docker Push') {
            steps {
                script {
                    sh 'aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 802165080994.dkr.ecr.us-east-1.amazonaws.com'
                    sh 'docker push 802165080994.dkr.ecr.us-east-1.amazonaws.com/mydockerrepo:latest'
                }
            }
        }
        //Stopping Docker containers for cleaner Docker run
        stage ('stop previous containers') {
            steps {
                sh 'docker ps -f name=myNodejsContainer -q | xargs --no-run-if-empty docker container stop'
                sh 'docker container ls -a -fname=myNodejsContainer -q | xargs -r docker container rm'
            }
        }
        //This will run the Docker container
        stage ('Docker Run') {
            steps {
                script {
                    sh 'docker run -d -p 8098:5000 --rm --name myNodejsContainer 802165080994.dkr.ecr.us-east-1.amazonaws.com/mydockerrepo:latest'
                }
            }   
        }
    }
}
