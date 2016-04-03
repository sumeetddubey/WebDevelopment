/**
 * Created by sumeetdubey on 3/17/16.
 */
module.exports = function(app, formModel){
    app.get('/api/assignment/user/:userId/form', getFormsByUserID);
    app.get('/api/assignment/form/:formId', findFormById);
    app.delete('/api/assignment/form/:formId', deleteFormById);
    app.post('/api/assignment/user/:userId/form', createForm);
    app.put('/api/assignment/form/:formId', updateFormById);

    function createForm(req, res){
        var userId = req.params.userId;
        var form = req.body;
        var formArray;
        formArray = formModel.createForm(userId, form);
        res.json(formArray);
    }

    function getFormsByUserID(req, res){
        var userId = req.params.userId;
        var forms = [];
        formModel.findFormsByUserId(userId)
            .then(
                function(doc){
                    forms = doc;
                    res.json(forms);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function findFormById(req, res){
        var formId = req.params.formId;
        formModel.findFormById(formId)
            .then(
                function(doc){
                    form = doc;
                    res.json(form);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function updateFormById(req, res){
        var formId = req.params.formId;
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
        var formId = req.params.formId;
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
};