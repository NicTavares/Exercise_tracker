const router = require('express').Router();

let User = require('../models/user.model');
//for getting from the server
router.route('/').get((req, res) => {
    User.find()//gets a list of all the users from the mongoDB
        .then(users => res.json(users))//return the users from the database
        .catch(err => res.status(400).json('Error: ' + err));
});
//for sending to the server
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({username});
    //saves to the database
    newUser.save()
        .then(() => res.json('User added!'))//if it works we say it worked
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;