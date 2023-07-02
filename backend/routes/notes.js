const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
    obj = {
        a: 'saimun',
        number: '344'
    };
    res.json(obj);
});

module.exports = router;