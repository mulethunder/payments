    # For GUI support, see this: https://gist.github.com/niw/bed28f823b4ebd2c504285ff99c1b2c2
    echo "##########################################################################"
    echo "###################### Updating packages ##############################"

    sudo apt-get update

    echo "##########################################################################"    
    echo "###################### Installing Git ##############################"

    sudo apt-get install git -y
   

    echo "##########################################################################"
    echo "############### Installing NodeJS via Node Version Manager on an Ubuntu Machine ###############"

    #curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
    #source ~/.bashrc 
    #nvm list-remote

    chmod 755 /vagrant/nvm-install.sh
    /vagrant/nvm-install.sh

    source ~/.nvm/nvm.sh

    nvm install v14.17.5
    #Switch: nvm use v14.10.0 

    sudo apt install npm -y

    echo "##########################################################################"
    echo "############# Installing and configuring Docker for Dev #######################"

    sudo apt-get install docker.io -y
    sudo usermod -G docker ubuntu
    sudo usermod -G docker vagrant
    docker --version


#    echo "##########################################################################"
#    echo "############# Installing Kubernets Cluster #########################"


    # Install kubectl
    echo "#################### Install kubectl"
    curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
    sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

    # Install k3d - current release (as in: https://k3d.io/v5.0.0/#installation):
    echo "#################### Install k3d"
    curl -s https://raw.githubusercontent.com/rancher/k3d/main/install.sh | bash


    # Install helm:
 #   echo "#################### Install helm"
 #   curl https://baltocdn.com/helm/signing.asc | sudo apt-key add -
 #   sudo apt install apt-transport-https --yes
 #   echo "deb https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
 #   sudo apt update
 #   sudo apt install helm -y    

    # Create a cluster called cri-cluster-1 with 1 control plane node (servers) and 3 worker nodes (agents):
    #k3d cluster create cri-cluster-1
    echo "#################### Create cluster as non-root"
    sudo runuser -l vagrant -c "k3d cluster create cri-cluster-1 --agents 3 --servers 1 --k3s-arg '--disable=traefik@server:*' --port '80:80@server:*' --port '443:443@server:*' --wait --timeout '300s'"

    # # Let's break gracefully here....
    # exit 0

    # Merge kube config and set context:
    #k3d kubeconfig merge mycluster --kubeconfig-switch-context

    # Get cluster info
    echo "#################### Get cluster info"
    kubectl cluster-info
    #kubectl get nodes
    #kubectl get pods -A 

    # Install my own NodeJS Hello World app:
    #kubectl create namespace hello-microservices
    #kubectl apply -f /vagrant/cri-hello-ms/hello-nodejs-dpl.yaml
    #kubectl apply -f /vagrant/cri-hello-ms/hello-nodejs-svc.yaml
    #kubectl apply -f /vagrant/cri-hello-ms/hello-nodejs-ing.yaml

    exit 0

    # Install Kuberneets dashboard:
    echo "#################### Install Kuberneets dashboard"
    kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0/aio/deploy/recommended.yaml
    # kubectl proxy --port=8001
    # http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/.
    ## Login:
    # Get token:
    #kubectl get secret -n kube-system
    #kubectl describe secret default-token-xxxxxx -n kube-system
    # Better method (https://www.replex.io/blog/how-to-install-access-and-add-heapster-metrics-to-the-kubernetes-dashboard): 
    # Let's create a dashboard service account bound to the admin user:
    kubectl create serviceaccount dashboard-admin-sa
    # Binding user to cluster-admin role:
    kubectl create clusterrolebinding dashboard-admin-sa --clusterrole=cluster-admin --serviceaccount=default:dashboard-admin-sa
    # Let's review the new created secret:
    kubectl get secrets
    # Let's esee the token with a simple describe:
    kubectl describe secret dashboard-admin-sa-token-XXXXXXXXX
    # E.g. 
    #   token:  XXXXXXXXX    


    # Create Docker Hub secret to pull image from private repository:
    . /vagrant/setEnv.sh
    kubectl create secret docker-registry myregistrysecret \
    --docker-server=$DOCKER_REGISTRY_SERVER \
    --docker-username=$DOCKER_USER \
    --docker-password=$DOCKER_PASSWORD \
    --docker-email=$DOCKER_EMAIL
    

    echo "#################### Install apps"
    kubectl apply -f /vagrant/node-app/deployment.yaml
    kubectl apply -f /vagrant/java-app/deployment.yaml



    # Install Helm 3 (https://helm.sh/docs/intro/install/):
    # Nice step by ste in simple minukube here: https://www.bogotobogo.com/DevOps/Docker/Docker_Kubernetes_ElasticSearch_with_Helm_minikube.php
    echo "#################### Install helm"

    curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

    # Install elastic search chart:
    echo "#################### Install helm charts for Elasticsearch, Kibana and Fluentbit"
    helm repo add elastic https://Helm.elastic.co
    helm repo list

    # If using PV, see values-linode.yaml for example: https://gitlab.com/nanuchi/efk-course-commands
    # helm install elasticsearch elastic/elasticsearch -f values-linode.yaml
    echo "#################### Install elasticsearch"
    helm install elasticsearch elastic/elasticsearch -f /vagrant/installs/elasticsearch/values.yaml
    ## Wait for pods to start:
    # kubectl get pods --namespace=default -l app=elasticsearch-master
    # kubectl get events
    # helm --namespace=default test elasticsearch


    echo "#################### Install kibana"
    helm install kibana elastic/kibana
    ## Port-forward to be abel to enter Kibana website via Vagrant GUI browser:
    # kubectl port-forward deployment/kibana-kibana 5601

    
    #echo "#################### Install Nginx Ingress Controller"
    # helm repo add stable https://charts.helm.sh/stable 
    # helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
    # helm install nginx-ingress ingress-nginx/ingress-nginx
    # kubectl --namespace default get services -o wide nginx-ingress-ingress-nginx-controller

    #echo "#################### Install Traefik 2"

    
    #echo "#################### Install Fluentd"

    ### First attempt using Bitnami chart:
    ###helm repo add bitnami https://charts.bitnami.com/bitnami
    ###helm install fluentd bitnami/fluentd

    ## Second attempt using (https://github.com/fluent/helm-charts/tree/main/charts/fluentd)
    helm repo add fluent https://fluent.github.io/helm-charts
    helm repo update
    helm install fluentd fluent/fluentd

    # See: https://gitlab.com/nanuchi/efk-course-commands/-/blob/master/fluentd-config.yaml
    # kubectl rollout restart daemonset/fluentd

    ## Test DNS name:
    # kubectl apply -f https://k8s.io/examples/admin/dns/dnsutils.yaml
    # kubectl get pods dnsutils
    # kubectl exec -i -t dnsutils -- nslookup kubernetes.default
    # kubectl exec -i -t dnsutils -- nslookup elasticsearch-master.default.svc.cluster.local
    # kubectl exec -i -t dnsutils -- curl elasticsearch-master.default.svc.cluster.local:9200




