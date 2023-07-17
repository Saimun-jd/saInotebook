const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');

connectToMongo();
const app = express();
const port = 5000;
app.use(express.json());
// allow requests from specific origins
const corsOptions = {
    origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
//app.use('/api/user', require('./routes/user'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
