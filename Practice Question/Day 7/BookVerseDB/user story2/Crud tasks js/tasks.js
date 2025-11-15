//task 1 :  Insert new users and books

// Insert new user
db.Users.insertOne({
  _id: 4,
  name: "David Wilson",
  email: "david@email.com",
  joinDate: new Date("2024-02-01")
})

// Insert new book
db.Books.insertOne({
  _id: 6,
  title: "Fire & Blood",
  genre: "Fantasy",
  publicationYear: 2018,
  authorId: 2,
  ratings: []
})


//Task 2 : Retrieve all books of genre "Science Fiction"

db.Books.find({ genre: "Science Fiction" })

//Task 3 : Update the publicationYear of one book

db.Books.updateOne(
  { _id: 3 },
  { $set: { publicationYear: 2012 } }
)

// Verify the update
db.Books.find({ _id: 3 }, { title: 1, publicationYear: 1 })

//Task 4 : Delete one user record

db.Users.deleteOne({ _id: 2 })

// Verify deletion - should show 3 users now (1, 3, 4)
db.Users.find({}, { name: 1 })

//Task 5: Add a new rating to a book using $push operator

db.Books.updateOne(
  { _id: 1 },
  { 
    $push: { 
      ratings: { 
        user: "David Wilson", 
        score: 5, 
        comment: "Timeless classic!" 
      } 
    } 
  }
)

// Verify the rating was added
db.Books.find({ _id: 1 }, { title: 1, ratings: 1 })

