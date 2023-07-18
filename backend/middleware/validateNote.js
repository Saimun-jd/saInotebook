function validateNote(req, res, next) {
    var errors = [];
    if (req.body.title && req.body.title.length < 3) {
        errors.push("Title must be at least 3 characters long");
    }
    if (req.body.description && req.body.description.length < 5) {
        errors.push("Description must be at least 5 characters long");
    }
    if (errors.length > 0) {
        res.status(400).json({ errors: errors });
    } else {
        next();
    }
}

module.exports = validateNote