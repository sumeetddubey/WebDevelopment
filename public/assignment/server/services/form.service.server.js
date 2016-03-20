/**
 * Created by sumeetdubey on 3/17/16.
 */
module.exports = function(app, formModel){
    app.get('/api/assignment/user/:userId/form', getFormsByUserID);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateFormById);

    function createForm(req, res){
        var userId = req.params.userId;
        var form;

        form = formModel.createForm(userId, form);
        res.json(form);
            //.then(
            //    function(doc){
            //        res.json(form);
            //    },
            //    function(err){
            //        res.status(400).send(err);
            //    }
            //)
    }

    function getFormsByUserID(req, res){
        var userId = parseInt(req.params.userId);
        var forms = [];
        forms = formModel.findFormsByUserId(userId);
        res.json(forms);
            //.then(
            //    function(doc){
            //        res.json(doc);
            //    },
            //    function(err){
            //        res.status(400).send(err);
            //    }
            //)
    }

    function findFormById(req, res){
        var formId = req.params.formId;
        var form = null;

        form = formModel.findFormById(formId);
        res.json(form);
            //.then(
            //    function(doc){
            //        res.json(form);
            //    },
            //    function(err){
            //        res.status(400).send(err);
            //    }
            //)
    }

    function updateFormById(req, res){
        var formId = req.params.id;
        var form = req.body;

        var newForm = formModel.updateFormById(formId, form);
        res.json(newForm);
            //.then(
            //    function(doc){
            //        res.json(doc);
            //    },
            //    function(err){
            //        res.status(400).send(err);
            //    }
            //)
    }

    function deleteFormById(req, res){
        var formId = parseInt(res.params.formId);

        formModel.deleteFormById(formId);
            //.then(
            //    function(doc){
            //        res.json(doc);
            //    },
            //    function(err){
            //        res.status(400).send(err);
            //    }
            //)
    }
};