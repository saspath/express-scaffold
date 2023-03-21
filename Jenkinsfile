pipeline {
    
    agent { dockerfile true }
    
    environment {
    //    registry = "068643504245.dkr.ecr.us-east-1.amazonaws.com/express-repo"
        shortImageID =""
    }
    stages {
        //Loading variables
        stage('Load Variables') {
            steps {
                script {
                    //make sure that file exists on this node
                    def constants = load 'Variables'
                    registry = constants.registryECR
                    branch = constants.branchName
                    gitURL = constants.gitURL
                    echo branch
                    echo registry
                    echo gitURL
                }
            }
        }
        stage ('Checkout') {
            steps {
                checkout scmGit(branches: [[name: branch]], extensions: [], userRemoteConfigs: [[url: gitURL]])
            }
        }
        stage ('Docker Image Build') {
            steps {
                script {
                    dockerImage = docker.build registry
                    echo dockerImage.id
                    def imageID = sh(returnStdout: true, script: "docker inspect -f '{{.ID}}' ${registry}").trim()
                    echo "Image-ID: ${imageID}"
                    def mySubstring = imageID.split(':')[1]
                    shortImageID = mySubstring.substring(0, Math.min(mySubstring.length(), 12))
                    echo "first12Chars of Image-ID: ${shortImageID}"
                }
            }
        }
        //This code pushes the image to AWS ECR
        stage ('Docker Push') {
            steps {
                script {
                    sh 'aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 068643504245.dkr.ecr.us-east-1.amazonaws.com'
                    echo "again - first12Chars of Image-ID: ${shortImageID}"
                    sh "docker push 068643504245.dkr.ecr.us-east-1.amazonaws.com/express-repo:latest"
                    sh "docker tag ${shortImageID} 068643504245.dkr.ecr.us-east-1.amazonaws.com/express-repo:latest"
                    echo "again & again - first12Chars of Image-ID: ${shortImageID}"
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
                    sh "docker run -d -p 3000:3000 --rm --name mynodeContainer 068643504245.dkr.ecr.us-east-1.amazonaws.com/express-repo:latest"
                }
            }
        }
    }
}
