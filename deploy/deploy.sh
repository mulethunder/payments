#!/bin/bash
#microservices..
  #payments microservice..
  #git clone --quiet https://github.com/mulethunder/payments.git >>/tmp/noise.out && cd payments
  kubectl create namespace payments
  
  ## Updating as Conatiner repo is public now:
  # kubectl create secret docker-registry dhreg --docker-server=https://index.docker.io/v1/ --docker-username=XXXXXX --docker-password=XXXXX --docker-email=XXXX --namespace=payments


  kubectl apply -f kubernetes/payments-dpl.yaml
  kubectl apply -f kubernetes/payments-svc.yaml
  #kubectl apply -f kubernetes/payments-ing.yaml

