const jwt = require("jsonwebtoken");
const JWT_SECRET = "fata$$nigga";

const getUser = (req, res, next) => {
    //get user from jwt token and append id to req obj
    const token = req.header("auth-token"); // getting token, set by auth-token header in postman
    if (!token) {
        res.status(401).send({
            error: "Please authenticate using a valid token.",
        });
    }
    // fetching id from token(id is present in first portion of the token)
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({
            error: "Please authenticate using a valid token.",
        });
    }
};

module.exports = getUser;
