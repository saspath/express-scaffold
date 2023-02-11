pipeline {
    agent any
    environment {
        CI = 'true'
    }
    stages {
        stage ('Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/saspath/myPythonDockerRepo']])
            }
        }      
        stage('Build') {
            steps {
                sh 'sudo apt update'
                sh 'sudo apt install nodejs npm'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
              echo 'Testing Node JS application...'
                //sh './jenkins/scripts/test.sh'
            }
        }
        //stage('Deliver') {
        //    steps {
        //        sh './jenkins/scripts/deliver.sh'
        //        input message: 'Finished using the web site? (Click "Proceed" to continue)'
        //        sh './jenkins/scripts/kill.sh'
        //    }
        //}
    }
}
