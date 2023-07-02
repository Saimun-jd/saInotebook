const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://saimun:sd12@cluster0.lozkhqs.mongodb.net/iNotebook?retryWrites=true&w=majority";

const connectToMongo = () => {
    mongoose
        .connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(()=> {console.log('DataBase Connected')})
        .catch(error => console.log(error))
}

module.exports = connectToMongo;