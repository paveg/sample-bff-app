package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	hellopb "main/pkg/grpc"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

var (
	client hellopb.GreetingServiceClient
)

const FRONTEND_URL = "http://localhost:5173"
const GRPC_SERVER = "host.docker.internal:50051"

func main() {
	r := gin.Default()
	r.Use(gin.Logger())
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{FRONTEND_URL},
		AllowMethods:     []string{"GET"},
		AllowHeaders:     []string{"Origin"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	r.Use(gin.Recovery())

	conn, err := grpc.Dial(
		GRPC_SERVER,

		grpc.WithTransportCredentials(insecure.NewCredentials()),
		grpc.WithBlock(),
	)
	if err != nil {
		log.Fatal("gRPC server connection failed.")
		return
	}
	defer conn.Close()

	client = hellopb.NewGreetingServiceClient(conn)

	r.GET("/api/p/message", func(c *gin.Context) {
		name := c.Query("name")
		req := &hellopb.HelloRequest{
			Name: name,
		}
		res, err := client.Hello(context.Background(), req)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": fmt.Sprintf("Internal Server Error: %v", err),
			})
		} else {
			c.JSON(http.StatusOK, gin.H{
				"message": res.GetMessage(),
			})
		}
	})
	r.GET("/ready", func(c *gin.Context) {
		c.Status(http.StatusOK)
	})
	r.Run()
}
