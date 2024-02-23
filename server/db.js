const mongoose = require("mongoose")

const connectionString = `mongodb+srv://callum:7nwOqqmVPqVgroM4@jet-lag-knockoff.rnwupgu.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Database connected')).catch((err)=>console.log(err));