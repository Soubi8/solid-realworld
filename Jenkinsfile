pipeline {
    agent {
        label 'agent1'
    }
    options { 
        skipDefaultCheckout() 
    } 
    environment {
        DOCKER_PWD = credentials('docker-pwd')
        DEV = 'https://dev.epam.pp.ua'
        PROD = 'https://epam.pp.ua'
        REGISTRY_NAME = 'soubi8/fp'
        APP = 'front'
    }
    stages {
        stage('Clean Workspace'){
            steps {
                echo "============== Cleaning Workspace =============="
                sh 'rm -rf ./*'
            }
        }
        stage('SCM Checkout') {
            steps {
                echo "============== SCM Checkout =============="
                git branch: '${BRANCH_NAME}', credentialsId: 'jenkins_key', url: 'git@github.com:Soubi8/solid-realworld.git'
            }
        }
        stage('Build Front to Docker Image') {
            steps {
                echo "============== Building App to Docker Image =============="
                sh """
                    sudo usermod -aG docker $USER
                    sudo chown $USER /var/run/docker.sock
                    docker build --pull -t ${REGISTRY_NAME}:front_${BRANCH_NAME} .
                """
            }
        }
        stage('Push Docker Image') {
            steps {
                echo "============== Pushing Docker Image to DockerHub =============="
                sh 'echo "$DOCKER_PWD" | docker login -u soubi8 --password-stdin'
                sh "docker push ${REGISTRY_NAME}:front_${BRANCH_NAME}"
                sh 'docker logout' 
            }
        }
        stage('Deploy to Dev Server') {
            when {
                branch 'feature'
            }
            steps {
                echo "============== Deploying the App to Dev Server =============="
                script {
                    def dockerRun = "docker run --pull always --rm --name ${APP} -d -p 8081:80 ${REGISTRY_NAME}:front_${BRANCH_NAME}"
                    def dockerStop = "docker stop ${APP}"
                    sshagent(['aws_fp_api']) {
                        sh "ssh -o StrictHostKeyChecking=no ubuntu@${IP_DEV} '${dockerRun} || (${dockerStop} && ${dockerRun})'"
                    }
                }
            }
        }
        stage('Deploy to Prod Server') {
            when {
                branch 'main'
            }
            steps {
                echo "============== Deploying the App to Prod Server =============="
                script {
                    def dockerRun = "docker run --pull always --rm --name ${APP} -d -p 8081:80 ${REGISTRY_NAME}:front_${BRANCH_NAME}"
                    def dockerStop = "docker stop ${APP}"
                    sshagent(['aws_fp_api']) {
                        sh "ssh -o StrictHostKeyChecking=no ubuntu@${IP_PROD} '${dockerRun} || (${dockerStop} && ${dockerRun})'"
                    }
                }
            }
        }
        stage('Merge Request to Main branch') {
            when {
                branch 'feature'
            }
            steps {
                echo "============== Git Merge to Main Branch =============="
                withCredentials([string(credentialsId: 'git_token', variable: 'GIT_TOKEN')]) {
                    script{
                        sh '''
                            curl \\
                                -X POST \\
                                -H \"Accept: application/vnd.github.v3+json\" \\
                                -H \"Authorization: token ${GIT_TOKEN}\" \\
                                https://api.github.com/repos/soubi8/solid-realworld/merges \\
                                -d '{\"base\":\"main\",\"head\":\"feature\",\"commit_message\":\"Added Jenkinsfile, Dockerfile\"}'
                        '''
                    }
                }
            }
        }
    }
}
