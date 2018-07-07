const express = require('express');
const router = express.Router();
const { findUsersWithStands } = require('../../services/UserService');

router.get('/', (req, res) => {
    findUsersWithStands()
        .then(users => res.json(users))
        .catch(err => res.throwInternalServerError());
});

module.exports = router;