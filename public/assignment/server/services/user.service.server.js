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

    function getUserByCredentials(req, res){
        var user;
        var credentials = {
            "username": req.query.username,
            "password": req.query.password
        };
        userModel.findUserByCredentials(credentials)
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

    function findUser(req, res){
        if(req.query.username && req.query.password){
            getUserByCredentials(req, res);
        }
        else if(req.query.username){
            findUserByUsername(req, res);
        }
    }

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