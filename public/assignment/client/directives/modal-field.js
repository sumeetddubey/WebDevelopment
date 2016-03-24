/**
 * Created by sumeetdubey on 3/20/16.
 */
(function(){
    var app = angular.module("FormBuilderApp");
    app.directive("modalField", modalFieldDirective);

    function modalFieldDirective(){
        return {
            restrict: 'E',
            scope: {
                data: '='
            },

            templateUrl: "./directives/modal-field.html"
        };

    }
})();