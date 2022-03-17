// This package has to be separate from the App because WASM and native builds don't play well together.

package main

import (
	"log"
	"net/http"
)

func main() {
	distDir := http.Dir("dist")
	fileServer := http.FileServer(distDir)
	err := http.ListenAndServe(":8080", fileServer)
	if err != nil {
		log.Fatalf("Failed to start server: %+v\n", err)
	}
}
