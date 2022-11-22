const mongoose =require("mongoose")

const dbURI= "mongodb://localhost:27017/TodoListv01";

mongoose.connect(dbURI);

// Examation

const db = mongoose.connection;
db.on("error",(err)=>{
    console.log("Erorr in mongoDBBBB...");
});


db.on("connected",(err)=>{
    console.log("MongoDB is Connecteddd ..");
});

