app.controller('HomeController', function ($scope, homeService) {
	
}

app.controller('UserController', function ($scope, userService) { // angular performs DI: denominator usersService equals denominator registered in userService.js

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

app.controller('StoreController', function ($scope, storeService) {
	
}

app.controller('StoreOffersController', function ($scope, storeOffersService) {
	
}

app.controller('ProductsController', function ($scope, productService) {
	
}

app.controller('MyOmozonController', function ($scope, myOmozonService) {
	
}