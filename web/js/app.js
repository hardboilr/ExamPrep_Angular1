var app = angular.module('PersonDemo', ['ngRoute']);

var users = [];

app.controller("DetailsController", function ($scope, $routeParams) {
    $scope.detailId = $routeParams.requestId;
});

app.controller("UserController", function ($http, $routeParams) {
    var self = this;

    self.title = "Angular Route Demo";

    if (users.length === 0) {
        console.log("getting data from json");
        $http.get("data/data.json").success(function (data) {
            users = data.users;
            self.users = users;
        });
    } else { //We used the cache property on the http request instead 
        console.log("using cached property");
        self.users = users;
    }
    /*
     * Can't get self.user to work. user is properly pointing to the 
     * specified user (at given index), but get an error when trying to read 
     * the properties of the object. Can't figure out what i'm doing wrong...
     * 
     * An alternative solution is to use the id-parameter to create a filter, 
     * so only the chosen person is shown in the ng-repeat. 
     * Refer to details.html for implementation
     */
    if (users != null) {
        console.log("users not null");
        console.log("Adding user: " + $routeParams.requestId);
        self.user = users[$routeParams.requestId];
    }
    ;
});

app.config(function ($routeProvider) {
    $routeProvider
            .when("/persons", {
                templateUrl: "persons.html",
                controller: "UserController"
            })
            .when("/details/:requestId", {
                templateUrl: "details.html",
                controller: "DetailsController"
            })
            .otherwise({
                redirectTo: "/persons"
            });
});
