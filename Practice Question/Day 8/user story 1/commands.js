// 1. Create Indexes
db.books.createIndex({ "genre": 1 })
db.books.createIndex({ "authorId": 1 })
db.books.createIndex({ "ratings.score": 1 })
db.books.createIndex({ "genre": 1, "ratings.score": -1 })

// 2. View Indexes
db.books.getIndexes()

// 3. Query Performance Comparison
// Before indexing:
db.books.find({ "genre": "Fantasy" }).explain("executionStats")

// After indexing: 
db.books.find({ "genre": "Fantasy" }).explain("executionStats")

// 4. Drop an Index
db.books.dropIndex("genre_1_ratings.score_-1")