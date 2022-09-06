#!/bin/bash
#microservices..
  #payments..
  kubectl delete -f kubernetes/payments-ing.yaml
  kubectl delete -f kubernetes/payments-svc.yaml
  kubectl delete -f kubernetes/payments-dpl.yaml
  kubectl delete secret dhreg --namespace=payments
  kubectl delete namespace payments

