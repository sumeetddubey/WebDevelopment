/**
 * Created by sumeetdubey on 3/17/16.
 */

module.exports = function(app, userModel) {

    app.get('/api/assignment/user', findUser);
    app.post('/api/assignment/user', createUser);
    app.get('/api/assignment/user/:id', findUserById);
    app.put('/api/assignment/user/:id', updateUser);
    app.delete('/api/assignment/user/:id', deleteUser);

    app.getUserByCredentials = getUserByCredentials;

    //function getUserByCredentials(req, res){
    //    console.log("in finduserbycredentials");
    //    var credentials = {
    //        "username": req.query.username,
    //        "password": req.query.password
    //    };
    //
    //    var user = userModel.findUserByCredentials(credentials);
    //    res.json(user);
    //}

    function getUserByCredentials(req, res){
        var user;
        var credentials = {
            "username": req.query.username,
            "password": req.query.password
        };
        console.log(credentials);
        userModel.findUserByCredentials(credentials)
            .then(
                function(doc){
                    user = doc;
                    console.log("reply from service");
                    console.log(doc);
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function findUser(req, res){
        console.log("in finduser");
        if(req.query.username && req.query.password){
            getUserByCredentials(req, res);
        }
        else if(req.query.username){
            findUserByUsername(req, res);
        }
        else{
            console.log("error");
        }
    }

    //function createUser(req, res){
    //    var user = req.body;
    //
    //    var newUser = userModel.createUser(user);
    //    res.json(newUser);
    //}

    function createUser(req, res){
        var user = req.body;
        userModel.createUser(user)
            .then(
                function(doc){
                    user = doc;
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    //function findAllUsers(req, res){
    //    var users = [];
    //    users = userModel.findAllUsers();
    //    res.json(users);
    //}

    function findAllUsers(req, res){
        var users = [];
        userModel.findAllUsers()
            .then(
                function(doc){
                    users = doc;
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    //function findUserById(req, res){
    //    var userId = parseInt(req.params.id);
    //    var user;
    //
    //    user = userModel.findUserById(userId);
    //    res.json(user);
    //}

    function findUserById(req, res){
        var userId = req.params.id;
        var user;
        userModel.findUserById(userId)
            .then(
                function(doc){
                    user = doc;
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    //function findUserByUsername(req, res){
    //    var username = req.query.username;
    //    var user;
    //
    //    user = userModel.findUserByUsername(username);
    //    res.json(user);
    //}

    function findUserByUsername(req, res){
        var username = req.query.username;
        var user;
        userModel.findUserByUsername(username)
            .then(
                function(doc){
                    user = doc;
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    //function updateUser(req, res){
    //    console.log("in update");
    //    var userId = parseInt(req.params.id);
    //    var userParams = req.body;
    //
    //    user = userModel.updateUserById(userId, userParams);
    //        res.json(user);
    //}

    function updateUser(req, res){
        var userId = req.params.id;
        var userParams = req.body;
        var user;
        userModel.updateUserById(userId, userParams)
            .then(
                function(doc){
                    user = doc;
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    //function deleteUser(req, res){
    //    var userId = res.params.id;
    //    userModel.deleteUserById(userId);
    //}

    function deleteUser(req, res){
        var userId = req.params.id;
        var users;
        userModel.deleteUserById(userId)
            .then(
                function(doc){
                    users = doc;
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }
};