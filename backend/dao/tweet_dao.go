package dao

import (
	"backend/db"
	"backend/models"
	_ "github.com/go-sql-driver/mysql"
	"log"
	"time"
)

// 投稿データを保存
func SavePost(userID, content, createdAt string) error {
	query := `INSERT INTO tweets (user_id, content, created_at) VALUES (?, ?, ?)`

	// デフォルトで現在時刻を使用する場合
	if createdAt == "" {
		createdAt = time.Now().Format("2006-01-02 15:04:05")
	}

	_, err := db.DB.Exec(query, userID, content, createdAt)
	if err != nil {
		log.Printf("Error executing SavePost: %v", err)
		return err
	}

	log.Printf("Post saved: user_id=%s, content=%s", userID, content)
	return nil
}

func GetAllPost() ([]models.Post, error) {
	query := `SELECT id, user_id, content, created_at FROM tweets`

	// クエリを実行
	rows, err := db.DB.Query(query)
	if err != nil {
		log.Printf("Error executing query in GetAllPost: %v", err)
		return nil, err
	}
	defer rows.Close()

	// 結果を格納するスライス
	var posts []models.Post

	// データベースの行をループしながら読み取る
	for rows.Next() {
		var post models.Post
		if err := rows.Scan(&post.ID, &post.UserID, &post.Content, &post.CreatedAt); err != nil {
			log.Printf("Error scanning row in GetAllPost: %v", err)
			return nil, err
		}
		posts = append(posts, post)
	}

	// rows.Next() 後のエラーチェック
	if err := rows.Err(); err != nil {
		log.Printf("Rows iteration error in GetAllPost: %v", err)
		return nil, err
	}

	return posts, nil
}

func GetAllTweetsWithUserName() ([]models.TweetWithUserName, error) {
	// SQLクエリ: tweetsとusersを結合してデータを取得
	query := `SELECT tweets.id, tweets.user_id, users.user_name, tweets.content, tweets.created_at FROM tweets INNER JOIN users ON tweets.user_id = users.user_id`

	// クエリを実行
	rows, err := db.DB.Query(query)
	if err != nil {
		log.Printf("Error executing query in GetAllTweetsWithUserName: %v", err)
		return nil, err
	}
	defer rows.Close()

	// 結果を格納するスライス
	var posts []models.TweetWithUserName

	// データベースの行をループしながら読み取る
	for rows.Next() {
		var post models.TweetWithUserName
		if err := rows.Scan(&post.ID, &post.UserID, &post.UserName, &post.Content, &post.CreatedAt); err != nil {
			log.Printf("Error scanning row in GetAllTweetsWithUserName: %v", err)
			return nil, err
		}
		posts = append(posts, post)
	}

	// rows.Next() 後のエラーチェック
	if err := rows.Err(); err != nil {
		log.Printf("Rows iteration error in GetAllTweetsWithUserName: %v", err)
		return nil, err
	}

	return posts, nil
}

func GetTweetById(tweetId int) (*models.TweetWithLikes, error) {
	// tweetsとusersをJOINしてuser_nameといいね数を取得するSQLクエリ
	query := `SELECT tweets.id, tweets.user_id, users.user_name, tweets.content, tweets.created_at, IFNULL(COUNT(likes.id), 0) AS likes_count FROM tweets INNER JOIN users ON tweets.user_id = users.user_id LEFT JOIN likes ON tweets.id = likes.tweet_id WHERE tweets.id = ? GROUP BY tweets.id, tweets.user_id, users.user_name, tweets.content, tweets.created_at`

	// クエリを実行してデータを取得
	var tweet models.TweetWithLikes
	err := db.DB.QueryRow(query, tweetId).Scan(&tweet.ID, &tweet.UserID, &tweet.UserName, &tweet.Content, &tweet.CreatedAt, &tweet.LikesCount)
	if err != nil {
		log.Printf("Error retrieving tweet with ID %d: %v", tweetId, err)
		return nil, err
	}

	return &tweet, nil
}

// GetFollowingTweets はフォローしているユーザーのツイートを取得します
func GetFollowingTweets(userID string) ([]models.Tweet, error) {
	query := `SELECT t.id, t.user_id, u.user_name, t.content, t.created_at FROM tweets t INNER JOIN follows f ON t.user_id = f.followed_id INNER JOIN users u ON t.user_id = u.user_id WHERE f.follower_id = ? ORDER BY t.created_at DESC`
	rows, err := db.DB.Query(query, userID)
	if err != nil {
		log.Printf("Failed to execute query: %v\n", err)
		return nil, err
	}
	defer rows.Close()

	var tweets []models.Tweet
	for rows.Next() {
		var tweet models.Tweet
		if err := rows.Scan(&tweet.ID, &tweet.UserID, &tweet.UserName, &tweet.Content, &tweet.CreatedAt); err != nil {
			log.Printf("Failed to scan row: %v\n", err)
			return nil, err
		}
		tweets = append(tweets, tweet)
	}

	return tweets, nil
}
