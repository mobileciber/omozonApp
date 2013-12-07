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

var app = angular.module('omozonHTML5App', [ 'ngRoute' ]);

//This configures the routes and associates each route with a view and a controller
app.config( [ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		controller : 'HomeController',
		templateUrl : 'partials/home.html'
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
		templateUrl : 'partials/store.html'
	}).when('/stores/list', {
		controller : 'StoreController',
		templateUrl : 'partials/storeList.html'
	}).when('/stores/detail/:storeId', {
		controller : 'StoreController',
		templateUrl : 'partials/storeDetail.html'
	}).when('/storeOffers', {
		controller : 'StoreOffersController',
		templateUrl : 'partials/storeOffers.html'
	}).when('/storeOffers/list/:storeId', {
		controller : 'StoreOffersController',
		templateUrl : 'partials/storeOffersList.html'
	}).when('/storeOffers/detail/:productId', {
		controller : 'StoreOffersController',
		templateUrl : 'partials/productDetail.html'
	}).when('/storeOffers/detail/qr/:productId', {
		controller : 'StoreOffersController',
		templateUrl : 'partials/storeOffersDetailQr.html'
	}).when('/productSearch', {
		controller : 'ProductsController',
		templateUrl : 'partials/productSearch.html'
	}).when('/productSearch/list', {
		controller : 'ProductsController',
		templateUrl : 'partials/productSearchResultList.html'
	}).when('/productSearch/detail/:productId', {
		controller : 'ProductsController',
		templateUrl : 'partials/productDetail.html'
	}).when('/myOmozon', {
		controller : 'MyOmozonController',
		templateUrl : 'partials/myOmozon.html'
	}).when('/myOmozon/stores', {
		controller : 'MyOmozonController',
		templateUrl : 'partials/myOmozonStores.html'
	}).when('/myOmozon/profile', {
		controller : 'MyOmozonController',
		templateUrl : 'partials/myOmozonProfile.html'
	}).when('/myOmozon/purchases', {
		controller : 'MyOmozonController',
		templateUrl : 'partials/myOmozonPurchases.html'
	}).when('/myOmozon/wishlist', {
		controller : 'MyOmozonController',
		templateUrl : 'partials/myOmozonWishlist.html'
	}).when('/myOmozon/wallet', {
		controller : 'MyOmozonController',
		templateUrl : 'partials/myOmozonWallet.html'
	}).when('/myOmozon/wallet/vouchers', {
		controller : 'MyOmozonController',
		templateUrl : 'partials/myOmozonVouchers.html'
	}).when('/myOmozon/wallet/coins', {
		controller : 'MyOmozonController',
		templateUrl : 'partials/myOmozonCoins.html'
	}).when('/shop', {
		controller : 'HomeController',
		templateUrl : 'partials/shopRedirect.html'
	}).otherwise( {
		redirectTo : '/'
	});
} ]);
//app.config(function ($routeProvider) {
//    
//});

