var omozonControllers = angular.module('omozonControllers', ['homeService',
                                                       'userService',
                                                       'storeService',
                                                       'storeOffersService',
                                                       'productService',
                                                       'myOmozonService']);

omozonControllers.controller('HomeController', ['$rootScope', '$scope', '$q', '$http', '$location', 'homeService',
    function ($rootScope, $scope, $q, $http, $location, homeService) {
		var name = "Anonymous";
		if($rootScope.userdata){
			user = angular.fromJson($rootScope.userdata);
			name = user.name;
		}
		$scope.hello = homeService.sayHello(name);
		
		var logout = function($q, $scope){
			$rootScope.userdata = null;
			$location.path("#/login");
		}
    }
]);

omozonControllers.controller('UserController', ['$rootScope', '$scope', '$q', '$http', '$location', 'Base64', 'userService',
	function ($rootScope, $scope, $q, $http, $location, Base64, userService) { // angular performs DI: denominator usersService equals denominator registered in userService.js
		$scope.errmsg = "";
	    
	    $scope.login = function(){
			var defered = $q.defer();        
		    $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode($scope.username + ':' + $scope.passwd);
		    $http.defaults.headers.post = {'Content-Type': 'application/json'};
		    $http({method: 'GET', url: 'http://192.168.0.101:8484/hybridmobile-backend/api/customers?username=' + $scope.username}).
		            success(function(data, status, headers, config) {
		                $rootScope.userdata = data;
		                // this callback will be called asynchronously
		                // when the response is available
		                defered.resolve(true);
		                $location.path("/");
		            }).
		            error(function(data, status, headers, config) {
		                // called asynchronously if an error occurs
		                // or server returns response with an error status.
		                $scope.userdata = null;
		                $scope.errmsg = "User or password not correct. To test try 'freddy' and passwd 'krueger'...";
		                // Handling:
		                // 1) capture 401 response,
		                if (status == 401) {
							// 2) save the request parameters, so in the future we can reconstruct original request,
							var req = {
								config : config,
								defered : defered
							}
							// 3) create and return new object representing server�s future answer (instead of returning the original failed response),
							$scope.requests401 = [];
							$scope.requests401.push(req);
							// 4) broadcast that login is required, so application can react, in particular login form can appear,
		//					$scope.$broadcast('event:loginRequired'); // How events work? => http://docs.angularjs.org/guide/scope
							$location.path("/login");
							// 5) listen to login successful events, so we can gather all the saved request parameters, resend them again and trigger all the �future� objects (returned previously).
							return defered.promise;
						}
						// otherwise
						return $q.reject(response);
		            });
	    }
	    
	    $scope.register = function(user) {
	    	$scope.master = angular.copy(user);
	    	userService.getUser(user.username).
				success(function(data, status, headers, config) {
					$scope.registerNotification = "Benutzer existiert bereits.";
				}).
				error(function(data, status, headers, config) {
					$scope.registerNotification = status;
					if(status == 404){ // 404 - user not found
						data = angular.toJson(user);
						userService.insertUser(data).
							success(function(data, status, headers, config) {
								$scope.registerNotification = "Benutzer erfolgreich angelegt.";
//								$rootScope.userdata = data;
//					    		$location.path("/");
							}).
							error(function(data, status, headers, config) {
								$scope.registerNotification = "Fehler beim Anlegen des Users. Bitter versuchen Sie es später noch einmal."; // 500 - processing error
							});
					}
				});
	    };
	    	 
    	$scope.reset = function() {
	    	$scope.user = angular.copy({});
	    };
	}
]);

omozonControllers.controller('StoreController', ['$scope', 'storeService', 
	function ($scope, storeService) {
	
	}
]);

omozonControllers.controller('StoreOffersController', ['$scope', 'storeOffersService', 
	function ($scope, storeOffersService) {
	
	}
]);

omozonControllers.controller('ProductsController', ['$scope', 'productService', 
	function ($scope, productService) {
	
	}
]);

omozonControllers.controller('MyOmozonController', ['$scope', 'myOmozonService', 
	function ($scope, myOmozonService) {
	
	}
]);