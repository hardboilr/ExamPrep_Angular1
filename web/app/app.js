var app = angular.module('PersonDemo', ['ngRoute']);

app.controller("UserController", function ($scope, $http, $routeParams) {
    var self = this;
    
    $scope.detailId = $routeParams.requestId;
    
    self.title = "Angular Route Demo";

    self.getUsers = function () {
        $http.get("app/data/data.json").success(function (data) {
            users = data.users;
            self.users = users;
        });
    };
});

app.config(function ($routeProvider) {
    $routeProvider
            .when("/persons", {
                templateUrl: "app/views/persons.html",
                controller: "UserController"
            })
            .when("/details/:requestId", {
                templateUrl: "app/views/details.html",
                controller: "UserController"
            })
            .otherwise({
                redirectTo: "/persons"
            });
});
