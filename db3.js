const { MongoClient } = require('mongodb');

// Connection URL (Replace with your MongoDB connection URI)
const uri = 'mongodb://localhost:27017'; // Replace with MongoDB Atlas URI if using the cloud

// Database and Collection names
const dbName = 'bookStore'; // Replace with your database name
const collectionName = 'books'; // Replace with your collection name

// Create a MongoDB client instance
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectAndInsert() {
  try {
    // Connect to MongoDB server
    await client.connect();
    console.log('Connected to MongoDB successfully!');
    
    // Access the database
    const database = client.db(bookStore);
    
    // Access the collection
    const collection = database.collection(books);
    
    // Insert a document into the collection
    const result = await collection.insertOne({ name: 'John Doe', email: 'john.doe@example.com', age: 29 });
    console.log('Document inserted with _id:', result.insertedId);
    
    // Insert multiple documents (optional)
    const multipleDocs = [
      { name: 'Jane Doe', email: 'jane.doe@example.com', age: 25 },
      { name: 'Mike Smith', email: 'mike.smith@example.com', age: 32 },
    ];
    const insertManyResult = await collection.insertMany(multipleDocs);
    console.log(`${insertManyResult.insertedCount} documents inserted`);
    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    // Close the connection when done
    await client.close();
  }
}

// Run the function
connectAndInsert().catch(console.error);
