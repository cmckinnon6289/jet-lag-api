const mongoose = require("mongoose")
const enviro = require("dotenv")

enviro.config()
const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.rnwupgu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(connectionString, {}).then(() => console.log('Connected to MongoDB.')).catch((err)=>console.log(err));