/**
 * Created by sumeetdubey on 3/17/16.
 */

module.exports = function(app, userModel) {
    var bcrypt = require('bcrypt-nodejs');
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var auth = authorized;
    passport.use(new LocalStrategy(localStrategy));

    app.post('/api/assignment/login', passport.authenticate('local'), login);
    app.post('/api/assignment/logout', logout);
    app.post('/api/assignment/register', register);
    app.get('/api/assignment/loggedIn', loggedIn);
    app.get('/api/assignment/user', findUser);
    app.post('/api/assignment/user', createUser);
    app.get('/api/assignment/user/:id', findUserById);
    app.put('/api/assignment/user/:id', updateUser);
    app.delete('/api/assignment/user/:id', deleteUser);
    app.get('/api/assignment/users', findAllUsers);
    app.get('/api/assignment/admin/user', adminFindAllUsers);
    app.get('/api/assignment/admin/user/:userId', adminFindUserById);
    app.post('/api/assignment/admin/user', adminCreateUser);
    app.put('/api/assignment/admin/user/:userId', adminUpdateUser);
    app.delete('/api/assignment/admin/user/:userId', adminDeleteUser);

    app.getUserByCredentials = getUserByCredentials;

    function localStrategy(username, password, done){
        userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    console.log("FROM USER SERVICE");
                    console.log(user);
                    if(!user){
                        console.log("password doesnt match");
                        return done(null, false);
                    }
                    else if(user && bcrypt.compareSync(password, user.password)) {
                        console.log('user is authorized');
                        console.log(user.password);

                        console.log("alice " +bcrypt.hashSync('alice'));
                        console.log("edward " +bcrypt.hashSync('ed'));
                        console.log("bob " +bcrypt.hashSync('bob'));
                        console.log("charlie " +bcrypt.hashSync('charlie'));

                        console.log("password wrong");
                        return done(null, user);
                    }
                },
                function(err){
                    if(err){
                        return done(err);
                    }
                }
            );
    }

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function serializeUser(user, done){
        done(null, user);
    }

    function deserializeUser(user, done){
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            )
    }

    function login(req, res){
        var user = req.user;
        res.json(user);
    }

    function logout(req, res){
        req.logout();
        res.send(200);
    }

    function loggedIn(req, res){
        res.send(req.isAuthenticated()? req.user: '0');
    }

    function register(req, res){
        var user = req.body;
        var hash = bcrypt.hashSync(user.password);
        user.password = hash;
        console.log(user);

        userModel
            .findUserByUsername(user.username)
            .then(
                function(response){
                    if(response){
                        res.json(null);
                    }
                    else{
                        return userModel.createUser(user);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(response){
                    if(response){
                        req.login(user, function(err) {
                            if(err){
                                res.status(400).send(err);
                            }
                            else{
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );

    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

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
        var hash = bcrypt.hashSync(user.password);
        user.password = hash;

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
        console.log('hello');
        var userId = req.params.id;
        var user = req.body;
        var hash = bcrypt.hashSync(user.password);
        user.password = hash;

        console.log(user.password);
        userModel.updateUserById(userId, user)
            .then(
                function(doc){
                    res.json(doc);
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

    function adminFindAllUsers(req, res){
        if(isAdmin(req.user)){
            userModel.findAllUsers()
                .then(
                    function(doc){
                        res.json(doc);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
        }
    }

    function adminFindUserById(req, res){
        if(isAdmin(req.user)){
            var userId = req.params.userId;
            userModel.findUserById(userId)
                .then(
                    function(doc){
                        res.json(doc);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
        }
    }

    function adminCreateUser(req, res){
        if(isAdmin(req.user)){
            var user = req.body;
            var hash = bcrypt.hashSync(user.password);
            user.password = hash;

            userModel.createUser(user)
                .then(
                    function(doc){
                        res.json(doc);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
        }
    }

    function adminUpdateUser(req, res){
        if(isAdmin(req.user)){
            var userId = req.body;
            var user = req.body;
            var hash = bcrypt.hashSync(user.password);
            user.password = hash;

            userModel.adminUpdateUserById(userId, user)
                .then(
                    function(doc){
                        res.json(doc);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
        }
    }

    function adminDeleteUser(req, res){
        if(isAdmin(req.user)){
            var userId = req.params.userId;
            userModel.adminDeleteUserById(userId)
                .then(
                    function(doc){
                        res.json(doc);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
        }
    }

    function isAdmin(user){
        return user.roles.indexOf('admin') != -1
    }
};