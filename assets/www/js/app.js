'use strict';

/*#######################################################################

 Normally like to break AngularJS apps into the following folder structure
 at a minimum:

 /js
 /controllers      
 /directives
 /services
 /partials
 /views

 #######################################################################*/

var app = angular.module('omozonHTML5App', [ 'ngRoute', 'omozonControllers' ]);

//This configures the routes and associates each route with a view and a controller
app.config( [ '$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
	$routeProvider.when('/', {
		controller : 'HomeController',
		templateUrl : 'partials/home.html',
		resolve: {
            factory: checkRouting
        }
	}).when('/login', {
		controller : 'UserController',
		templateUrl : 'partials/login.html'
	}).when('/register', {
		controller : 'UserController',
		templateUrl : 'partials/register.html'
	}).when('/passwdForgotten', {
		controller : 'UserController',
		templateUrl : 'partials/passwdForgotten.html'
	}).when('/stores', {
		controller : 'StoreController',
		templateUrl : 'partials/store.html',
		resolve: {
            factory: checkRouting
        }
	}).when('/stores/list', {
		controller : 'StoreController',
		templateUrl : 'partials/storeList.html',
		resolve: {
            factory: checkRouting
        }
	}).when('/stores/detail/:storeId', {
		controller : 'StoreController',
		templateUrl : 'partials/storeDetail.html',
		resolve: {
            factory: checkRouting
        }
	}).when('/storeOffers', {
		controller : 'StoreOffersController',
		templateUrl : 'partials/storeOffers.html',
		resolve: {
            factory: checkRouting
        }
	}).when('/storeOffers/list/:storeId', {
		controller : 'StoreOffersController',
		templateUrl : 'partials/storeOffersList.html',
		resolve: {
            factory: checkRouting
        }
	}).when('/storeOffers/detail/:productId', {
		controller : 'StoreOffersController',
		templateUrl : 'partials/productDetail.html',
		resolve: {
            factory: checkRouting
        }
	}).when('/storeOffers/detail/qr/:productId', {
		controller : 'StoreOffersController',
		templateUrl : 'partials/storeOffersDetailQr.html',
		resolve: {
            factory: checkRouting
        }
	}).when('/productSearch', {
		controller : 'ProductsController',
		templateUrl : 'partials/productSearch.html',
		resolve: {
            factory: checkRouting
        }
	}).when('/productSearch/list', {
		controller : 'ProductsController',
		templateUrl : 'partials/productSearchResultList.html',
		resolve: {
            factory: checkRouting
        }
	}).when('/productSearch/detail/:productId', {
		controller : 'ProductsController',
		templateUrl : 'partials/productDetail.html',
		resolve: {
            factory: checkRouting
        }
	}).when('/myOmozon', {
		controller : 'MyOmozonController',
		templateUrl : 'partials/myOmozon.html',
		resolve: {
            factory: checkRouting
        }
	}).when('/myOmozon/stores', {
		controller : 'MyOmozonController',
		templateUrl : 'partials/myOmozonStores.html',
		resolve: {
            factory: checkRouting
        }
	}).when('/myOmozon/profile', {
		controller : 'MyOmozonController',
		templateUrl : 'partials/myOmozonProfile.html',
		resolve: {
            factory: checkRouting
        }
	}).when('/myOmozon/purchases', {
		controller : 'MyOmozonController',
		templateUrl : 'partials/myOmozonPurchases.html',
		resolve: {
            factory: checkRouting
        }
	}).when('/myOmozon/wishlist', {
		controller : 'MyOmozonController',
		templateUrl : 'partials/myOmozonWishlist.html',
		resolve: {
            factory: checkRouting
        }
	}).when('/myOmozon/wallet', {
		controller : 'MyOmozonController',
		templateUrl : 'partials/myOmozonWallet.html',
		resolve: {
            factory: checkRouting
        }
	}).when('/myOmozon/wallet/vouchers', {
		controller : 'MyOmozonController',
		templateUrl : 'partials/myOmozonVouchers.html',
		resolve: {
            factory: checkRouting
        }
	}).when('/myOmozon/wallet/coins', {
		controller : 'MyOmozonController',
		templateUrl : 'partials/myOmozonCoins.html',
		resolve: {
            factory: checkRouting
        }
	}).when('/shop', {
		controller : 'HomeController',
		templateUrl : 'partials/shopRedirect.html',
		resolve: {
            factory: checkRouting
        }
	}).otherwise( {
		redirectTo : '/'
	});
	
//	$httpProvider.defaults.useXDomain = true;
//	delete $httpProvider.defaults.headers.common['X-Requested-With']; // workaround for CORS bug
} ]);

//var checkRouting = function ($q, $http, $rootScope, $location) {
//    if ($rootScope.userProfile) {
//        return true;
//    } else {
//        var defered = $q.defer();
//        $http.post("/myOmozon", { userToken: "blah" })
//            .success(function (response) {
//                $rootScope.userProfile = response.userProfile;
//                defered.resolve(true);
//            })
//            .error(function () {
//                defered.reject();
//                $location.path("/login");
//             });
//        return defered.promise;
//    }
//};

var checkRouting = function ($rootScope, $location) {
	if($rootScope.userdata){
		return true;
	} else{
		$location.path("/login");
	}
};

app.factory('Base64', function() {
    var keyStr = 'ABCDEFGHIJKLMNOP' +
            'QRSTUVWXYZabcdef' +
            'ghijklmnopqrstuv' +
            'wxyz0123456789+/' +
            '=';
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                        keyStr.charAt(enc1) +
                        keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) +
                        keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                alert("There were invalid base64 characters in the input text.\n" +
                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                        "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };
});

