/**
 * Created by sumeetdubey on 3/17/16.
 */

module.exports = function(app, userModel) {

    app.get('/api/assignment/user', findUser);
    app.post('/api/assignment/user', createUser);
    app.get('/api/assignment/user/:id', findUserById);
    app.put('/api/assignment/user/:id', updateUser);
    app.delete('/api/assignment/user/:id', deleteUserById);

    app.getUserByCredentials = getUserByCredentials;

    function getUserByCredentials(req, res){
        console.log("in finduserbycredentials");
        var credentials = {
            "username": req.query.username,
            "password": req.query.password
        };

        var user = userModel.findUserByCredentials(credentials);
        res.json(user);
            //.then(
            //    function(doc){
            //        res.json(user);
            //    },
            //    function(err){
            //        res.status(400).send(err);
            //    }
            //)
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

    function createUser(req, res){
        var user = req.body;

        user = userModel.createUser(user)
            .then(
                function(doc){
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function findAllUsers(req, res){
        var users = [];
        users = userModel.findAllUsers()
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function findUserById(req, res){
        var userId = req.params.id;
        var user;

        user = userModel.findUserById(userId);
        res.json(user);
            //.then(
            //    function(doc){
            //        user = doc;
            //    },
            //    function(err){
            //        res.status(400).send(err);
            //    }
            //)
    }

    function findUserByUsername(req, res){
        var username = req.query.username;
        var user = null;

        userModel.findUserByUsername(username)
            .then(
                function(doc){
                    user = doc;
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function updateUser(req, res){
        var userId = req.params.id;
        var user = req.body;

        userModel.updateUserById(userId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function deleteUserById(req, res){
        var userId = res.params.id;
        var user = req.body;

        userModel.deleteUserById(userId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }
};