package main

import (
	"backend/db"
	"backend/handlers"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
)

func main() {
	db.InitDB()
	defer db.CloseDB()

	http.HandleFunc("/user", handlers.UserHandler)
	http.HandleFunc("/user/getusername", handlers.GetUserNameByIDHandler)
	http.HandleFunc("/user/getintroduction", handlers.GetUserIntroductionByIDHandler)
	//http.HandleFunc("/user/update", handlers.UpdateUserNameHandler)
	http.HandleFunc("/user/update/name", handlers.UpdateUserNameHandler)
	http.HandleFunc("/user/update/introduction", handlers.UpdateUserIntroductionHandler)
	http.HandleFunc("/user/update/settings", handlers.UpdateUserSettingsHandler)
	http.HandleFunc("/user/get/settings", handlers.GetUserSettingsHandler)
	http.HandleFunc("/user/get/img", handlers.GetUserImgByIDHandler)
	http.HandleFunc("/user/put/img", handlers.UpdateUserImgByIDHandler)

	http.HandleFunc("/tweet", handlers.GetAllTweetHandler)
	http.HandleFunc("/tweet/new", handlers.SaveTweetHandler)
	http.HandleFunc("/tweet/id", handlers.GetTweetByIdHandler)
	http.HandleFunc("/tweet/following", handlers.GetFollowingTweetsHandler)

	http.HandleFunc("/follow/add", handlers.AddFollowHandler)
	http.HandleFunc("/follow/remove", handlers.RemoveFollowHandler)
	http.HandleFunc("/follow/following", handlers.GetFollowingHandler)
	http.HandleFunc("/follow/followed", handlers.GetFollowedHandler)

	http.HandleFunc("/reply", handlers.GetRepliesByParentIdHandler)
	http.HandleFunc("/reply/new", handlers.SaveReplyHandler)

	http.HandleFunc("/like/add", handlers.AddLikeHandler)       // いいねを追加
	http.HandleFunc("/like/remove", handlers.RemoveLikeHandler) // いいねを解除
	http.HandleFunc("/like/get", handlers.GetLikedTweetsHandler)
	http.HandleFunc("/likecount/get", handlers.GetTweetLikesHandler)

	http.HandleFunc("/gemini", handlers.GeminiSearch)
	http.HandleFunc("/gemini/generate", handlers.GenerateContentHandler)

	closeDBWithSysCall()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Listening on port %s...", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}

// シグナルを受信してDBを閉じる処理
func closeDBWithSysCall() {
	sig := make(chan os.Signal, 1)
	signal.Notify(sig, syscall.SIGTERM, syscall.SIGINT)
	go func() {
		s := <-sig
		log.Printf("received syscall, %v", s)

		if err := db.CloseDB(); err != nil {
			log.Fatal(err)
		}
		log.Printf("success: db.Close()")
		os.Exit(0)
	}()
}
