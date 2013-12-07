var controllers = angular.module('omozonControllers', ['homeService',
                                                       'userService',
                                                       'storeService',
                                                       'storeOffersService',
                                                       'productService',
                                                       'myOmozonService']);

controllers.controller('HomeController', function ($scope, homeService) {
	
}

controllers.controller('UserController', function ($scope, userService) { // angular performs DI: denominator usersService equals denominator registered in userService.js

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        $scope.users = usersService.getCustomers();
    }

    $scope.insertUser = function () {
        var firstName = $scope.newUser.firstName;
        var lastName = $scope.newUser.lastName;
        var city = $scope.newUser.city;
        usersService.insertUser(firstName, lastName, city);
        $scope.newUser.firstName = '';
        $scope.newUser.lastName = '';
        $scope.newUser.city = '';
    };

    $scope.deleteCustomer = function (id) {
        customersService.deleteCustomer(id);
    };
});

controllers.controller('StoreController', function ($scope, storeService) {
	
}

controllers.controller('StoreOffersController', function ($scope, storeOffersService) {
	
}

controllers.controller('ProductsController', function ($scope, productService) {
	
}

controllers.controller('MyOmozonController', function ($scope, myOmozonService) {
	
}