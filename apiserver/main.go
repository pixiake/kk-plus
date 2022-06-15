package main

import (
	"github.com/gin-gonic/gin"
	"github.com/kubesphere/kk-plus/apiserver/handler"
)

func main() {
	r := gin.Default()

	// group: v1alpha1
	v1alpha1 := r.Group("/api/v1alpha1")

	v1alpha1.GET("/clusters", handler.FetchCluster)

	_ = r.Run()

}
