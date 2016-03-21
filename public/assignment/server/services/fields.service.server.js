/**
 * Created by sumeetdubey on 3/20/16.
 */
module.exports = function (app, formModel) {

    app.get('/api/assignment/form/:formId/field', getFormFields);
    app.get('/api/assignment/form/:formId/field/:fieldId', getFieldById);
    app.delete('/api/assignment/form/:formId/field/:fieldId', deleteFormField);
    app.post('/api/assignment/form/:formId/field', createFormField);
    app.put('/api/assignment/form/:formId/field/:fieldId', updateFormField);
    app.put('/api/assignment/form/:formId/field', updateAllFormFields);

    function getFormFields(req, res) {
        var formId = req.params.formId;
        console.log("the form id is " +formId);
        res.json(formModel.getAllFormFields(formId));
    }

    function getFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(formModel.getFormFieldById(formId, fieldId));
    }

    function deleteFormField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(formModel.deleteFieldById(formId, fieldId));
    }

    function createFormField(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        res.json(formModel.createField(formId, field));
    }

    function updateFormField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        res.json(formModel.updateField(formId, fieldId, field));
    }

    function updateAllFormFields(req, res) {
        var formId = req.params.formId;
        var fields = req.body;
        res.json(formModel.updateAllFormFields(formId, fields));
    }

};