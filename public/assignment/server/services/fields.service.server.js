/**
 * Created by sumeetdubey on 3/20/16.
 */
module.exports = function (app, fieldModel) {

    app.get('/api/assignment/form/:formId/field', getFormFields);
    app.get('/api/assignment/form/:formId/field/:fieldId', getFieldById);
    app.delete('/api/assignment/form/:formId/field/:fieldId', deleteFormField);
    app.post('/api/assignment/form/:formId/field', createFormField);
    app.put('/api/assignment/form/:formId/field/:fieldId', updateFormField);
    app.put('/api/assignment/form/:formId/field', reorderFields);

    //function getFormFields(req, res) {
    //    var formId = req.params.formId;
    //    console.log("the form id is " +formId);
    //    res.json(fieldModel.getAllFormFields(formId));
    //}

    function getFormFields(req, res){
        var formId = req.params.formId;
        console.log(formId);
        fieldModel.getAllFormFields(formId)
            .then(
                function(doc){
                    console.log("reply in allformfields is " +doc);
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    //function getFieldById(req, res) {
    //    var formId = req.params.formId;
    //    var fieldId = req.params.fieldId;
    //    res.json(fieldModel.getFormFieldById(formId, fieldId));
    //}

    function getFieldById(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.getFormFieldById(formId, fieldId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    //function deleteFormField(req, res) {
    //    var formId = req.params.formId;
    //    var fieldId = req.params.fieldId;
    //    res.json(fieldModel.deleteFieldById(formId, fieldId));
    //}

    function deleteFormField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.deleteFieldById(formId, fieldId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    //function createFormField(req, res) {
    //    var formId = req.params.formId;
    //    var field = req.body;
    //    res.json(fieldModel.createField(formId, field));
    //}

    function createFormField(req, res){
        var formId = req.params.formId;
        var field = req.body;
        fieldModel.createField(formId, field)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    //function updateFormField(req, res) {
    //    var formId = req.params.formId;
    //    var fieldId = req.params.fieldId;
    //    var field = req.body;
    //    res.json(fieldModel.updateField(formId, fieldId, field));
    //}

    function updateFormField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        fieldModel.updateField(formId, fieldId, field)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    //function reorderFields(req, res) {
    //    var formId = req.params.formId;
    //    var fields = req.body;
    //    res.json(fieldModel.reorderFormFields(formId, fields));
    //}

    function reorderFields(req, res){
        var formId = req.params.formId;
        var fields = req.body;
        fieldModel.reorderFormFields(formId, fields)
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