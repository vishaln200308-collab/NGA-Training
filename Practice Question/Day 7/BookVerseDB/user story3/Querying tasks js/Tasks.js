//Task 1: Retrieve all books published after 2015

db.Books.find({ 
  publicationYear: { $gt: 2015 } 
})

//Task 2: Find authors who have written books in "Fantasy" genre

db.Books.aggregate([
  { $match: { genre: "Fantasy" } },
  { $group: { _id: "$authorId" } },
  {
    $lookup: {
      from: "Authors",
      localField: "_id",
      foreignField: "_id",
      as: "author"
    }
  },
  { $unwind: "$author" },
  { $project: { "author.name": 1, "author.nationality": 1 } }
])

//Task 3: Retrieve all users who joined within the last 6 months

var sixMonthsAgo = new Date();
sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

db.Users.find({ 
  joinDate: { $gte: sixMonthsAgo } 
})

//Task 4: Find books with an average rating greater than 4

db.Books.aggregate([
  {
    $addFields: {
      avgRating: { $avg: "$ratings.score" }
    }
  },
  {
    $match: {
      avgRating: { $gt: 4 }
    }
  },
  {
    $project: {
      title: 1,
      genre: 1,
      avgRating: 1,
      ratings: 1
    }
  }
])