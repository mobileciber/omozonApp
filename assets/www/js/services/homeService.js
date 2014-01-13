//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with 
//each doing the same thing just structuring the functions/data differently.
var homeService = angular.module('homeService', []);

homeService.service('homeService', function () {
	this.sayHello = function(name){
		return "Hello " + name;
	}
	
	this.loginDummy = function(){
		return false;
	}
});