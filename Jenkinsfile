pipeline {
    
    agent { dockerfile true }
    
    //environment {
    //    registry = "068643504245.dkr.ecr.us-east-1.amazonaws.com/express-repo"
    //}
    stages {
        //Loading variables
        stage('Load Variables') {
            steps {
                script {
                    //make sure that file exists on this node
                    def constants = load 'Variables'
                    registry = constants.registryECR
                    awsRegion = constants.awsRegion
                    branch = constants.branchName
                    gitURL = constants.gitURL
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
                    //Getting shaId for image and using it in PUSH to ECR
                    def sha_id = sh(
                        script: "git rev-parse --short HEAD",
                        returnStdout: true
                    ).trim()
                    image_name = "$registry:$sha_id"
                    dockerImage = docker.build image_name
                }
            }
        }
        //This code pushes the image to AWS ECR
        stage ('Docker Push') {
            steps {
                script {
                    sh "aws ecr get-login-password --region $awsRegion | docker login --username AWS --password-stdin $registry"                    
                    sh "docker push $image_name"
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
                    sh "docker run -d -p 3000:3000 --rm --name mynodeContainer $image_name"
                }
            }
        }
    }
}
