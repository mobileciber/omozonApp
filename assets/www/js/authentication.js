var app = angular.module('login-app', []);
app.config(function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With']; // workaround for CORS bug
});

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

//here's where YOUR code is finally accessed
function TodoCtrl($scope, $http, Base64) {
	$scope.login = function(){	
//		$http.defaults.headers.common = {'Access-Control-Allow-Origin': '*'};
//		$http.defaults.headers.common = {'Access-Control-Allow-Credentials': true};
//		$http.defaults.headers.common['Access-Control-Request-Headers'] = "accept, origin, authorization"; //you probably don't need this line.  This lets me connect to my server on a different domain
//		$http.defaults.headers.common = {'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'};
//		$http.defaults.headers.common = {'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'};
		$http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode($scope.username + ':' + $scope.passwd);
        $http.defaults.headers.post = {'Content-Type': 'application/json'};
        $http({method: 'GET', url: 'http://192.168.0.101:8484/hybridmobile-backend/api/customers?username=' + $scope.username}).
	            success(function(data, status, headers, config) {
	                $scope.userdata = data;
	                // this callback will be called asynchronously
	                // when the response is available
	            }).
	            error(function(data, status, headers, config) {
//	                alert(data);
	                $scope.userdata = data;
	                // called asynchronously if an error occurs
	                // or server returns response with an error status.
	            });
		
		//alert($scope.username + " : " + $scope.passwd);
	};

	// Use this method for Angular 1.0.x.
	// Logs into a page protected by basic authentication.  Grabs
	// username and password from $scope, which would likely be bound to
	// "text" and "password" <input> tags, respectively.
//	$scope.login = function {
//		// modify the Authorization header to send the username & password
//		$http.defaults.headers.common.Authorization = 'Basic ' + Base64.encode($scope.username + ':' + $scope.password);
//		// get the Resource object.
//		$scope.res = $resource(http://localhost:8484/hybridmobile-backend/api/customers?username=' + $scope.username);
//		// need to actually execute the request; do whatever with this
//		$scope.res.get();
//		// restore old defaults
//		$http.defaults.headers.common.Authorization = 'Basic ';
//	};

}