package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"os"
	"os/signal"

	hellopb "main/pkg/grpc"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

type Server struct {
	hellopb.UnimplementedGreetingServiceServer
}

func (s *Server) Hello(ctx context.Context, req *hellopb.HelloRequest) (*hellopb.HelloResponse, error) {
	return &hellopb.HelloResponse{
		Message: fmt.Sprintln("Hello World!"),
	}, nil
}

func NewServer() *Server {
	return &Server{}
}

func main() {
	port := 50051
	listener, err := net.Listen("tcp", fmt.Sprintf(":%d", port))

	if err != nil {
		panic(err)
	}

	s := grpc.NewServer()
	hellopb.RegisterGreetingServiceServer(s, NewServer())

	reflection.Register(s)

	go func() {
		log.Printf("Start gRPC server port: %v", port)
		s.Serve(listener)
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	<-quit
	log.Println("Stopping gRPC server...")
	s.GracefulStop()
}
