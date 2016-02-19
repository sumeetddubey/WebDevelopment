/**
 * Created by sumeetdubey on 2/15/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .config(function ($routeProvider) {
            $routeProvider
                .when("/formfields", {
                    templateUrl: "views/forms/form-fields.view.html",
                    controller: "FormFieldsController"
                })
        })
})();
