package handler

import (
	"k8s.io/client-go/rest"

	kubekeyclientset "github.com/kubesphere/kubekey/clients/clientset/versioned"
)

// NewKubekeyClient is used to create a kubekey cluster client.
func NewKubekeyClient() (*kubekeyclientset.Clientset, error) {
	// creates the in-cluster config
	config, err := rest.InClusterConfig()
	if err != nil {
		return nil, err
	}
	// creates the clientset
	clientset := kubekeyclientset.NewForConfigOrDie(config)

	return clientset, nil
}
