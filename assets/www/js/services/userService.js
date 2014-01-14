//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with 
//each doing the same thing just structuring the functions/data differently.

// http://docs.angularjs.org/tutorial/step_11
// http://weblogs.asp.net/dwahlin/archive/2013/08/16/using-an-angularjs-factory-to-interact-with-a-restful-service.aspx

var userService = angular.module('userService', []);

userService.service('userService', ['$http', 'Base64', function ($http, Base64) {
	this.insertUser = function (data) {
		$http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode('freddy:krueger');
		$http.defaults.headers.post = {'Content-Type': 'application/json'};
		return $http.post('http://192.168.0.101:8484/hybridmobile-backend/api/customers', data);
	};
	
	this.getUser = function (id) {
		$http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode('freddy:krueger');
		$http.defaults.headers.post = {'Content-Type': 'application/json'};
		return $http.get('http://192.168.0.101:8484/hybridmobile-backend/api/customers?username=' + id);
	};
	
	this.deleteUser = function (id) {
		
	};
	
	this.updateUser = function (id) {
		
	};
}]);