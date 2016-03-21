/**
 * Created by sumeetdubey on 3/20/16.
 */
(function(){
    var app = angular.module("FormBuilderApp");
    app.directive("formField", formFieldDirective);

    function formFieldDirective(){
        return {
            restrict: 'E',
            scope: {
                data: '='
            },

            templateUrl: "./directives/form-field.html"
        }
    }
})();