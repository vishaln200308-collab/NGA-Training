// 1. Calculate average rating per book
db.books.aggregate([
  {
    $unwind: "$ratings"
  },
  {
    $group: {
      _id: "$_id",
      title: { $first: "$title" },
      averageRating: { $avg: "$ratings.score" },
      totalRatings: { $sum: 1 }
    }
  },
  {
    $project: {
      title: 1,
      averageRating: { $round: ["$averageRating", 2] },
      totalRatings: 1
    }
  }
])

// 2. Top 3 highest-rated books
db.books.aggregate([
  {
    $unwind: "$ratings"
  },
  {
    $group: {
      _id: "$_id",
      title: { $first: "$title" },
      author: { $first: "$author" },
      averageRating: { $avg: "$ratings.score" }
    }
  },
  {
    $sort: { averageRating: -1 }
  },
  {
    $limit: 3
  },
  {
    $project: {
      title: 1,
      author: 1,
      averageRating: { $round: ["$averageRating", 2] }
    }
  }
])

// 3. Count books per genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      totalBooks: { $sum: 1 }
    }
  },
  {
    $sort: { totalBooks: -1 }
  }
])

// 4. Authors with more than 2 books
db.books.aggregate([
  {
    $group: {
      _id: "$authorId",
      authorName: { $first: "$author" },
      bookCount: { $sum: 1 }
    }
  },
  {
    $match: {
      bookCount: { $gt: 2 }
    }
  },
  {
    $sort: { bookCount: -1 }
  }
])

// 5. Total reward points by author
db.books.aggregate([
  {
    $unwind: "$ratings"
  },
  {
    $group: {
      _id: "$authorId",
      authorName: { $first: "$author" },
      totalRewardPoints: { $sum: "$ratings.score" },
      totalRatings: { $sum: 1 }
    }
  },
  {
    $sort: { totalRewardPoints: -1 }
  },
  {
    $project: {
      authorName: 1,
      totalRewardPoints: 1,
      totalRatings: 1,
      averagePointsPerRating: { 
        $round: [
          { $divide: ["$totalRewardPoints", "$totalRatings"] }, 
          2
        ] 
      }
    }
  }
])