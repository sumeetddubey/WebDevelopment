/**
 * Created by sumeetdubey on 3/27/16.
 */
(function(){
    angular
        .module("codingTutorial")
        .factory("HackerRankService", HackerRankService);

//    HackerRankService.$inject = ['$http'];
    function HackerRankService($http) {
        var api = {
            sendCode: sendCode
        };
        return api;

        function sendCode(code) {
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            return $http.post("/api/project/tutorial", code.data);
            //makeCorsRequest();
            //return $http.post("http://api.hackerrank.com/checker/submission.json -d 'source=print 1&lang=5&testcases=['1']&api_key=07913d61ce2ab2fa56f514dee20af8c36a2c0cf7'");
        }
    }
})();