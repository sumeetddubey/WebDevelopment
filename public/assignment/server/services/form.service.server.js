/**
 * Created by sumeetdubey on 3/17/16.
 */
module.exports = function(app, userModel, formModel){
    app.get("/api/assignment/user/:userId/form", findAllFormByUserID);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateFormById);

    function createForm(req, res){
        var userId = req.params.userId;
        var form = null;

        form = formModel.createForm(userId, form)
            .then(
                function(doc){
                    res.json(form);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function findAllFormByUserID(req, res){
        var userId = res.params.userId;
        forms = formModel.findAllFormByUserID(userId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function findFormById(req, res){
        var formId = req.params.formId;
        var form = null;

        form = formModel.findFormById(formId)
            .then(
                function(doc){
                    res.json(form);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function updateFormById(req, res){
        var formId = req.params.id;
        var form = req.body;

        formModel.updateFormById(formId, form)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function deleteFormById(req, res){
        var formId = res.params.id;

        formModel.deleteFormById(formId)
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