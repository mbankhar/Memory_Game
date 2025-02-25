package main

import (
    "fmt"
    "net/http"
)

func homeHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Welcome at a Memory Game!")
}

func aboutHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "This is the About Page!")
}
func handleUpload(w http.ResponseWriter, r *http.Request) {
	
}

func main() {

    http.HandleFunc("/", homeHandler)
    http.HandleFunc("/about", aboutHandler)
	http.HandleFunc("/upload", handleUpload)
    fmt.Println("Server is running on http://localhost:5001")

    http.ListenAndServe(":5001", nil)
}