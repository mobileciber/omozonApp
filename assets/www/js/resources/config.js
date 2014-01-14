var globalOptions = {
	protocol: 'http'
	domain	: '10.49.33.215',
	port	: '8484',
	context	: 'hybridmobile-backend',
	baseurl : function(){
		return this.protocol + '://' + this.domain + ':' + this.port + '/' + this.context + '/';
	},
	auth	: {user : 'freddy', passwd : 'krueger'} // This user is needed to authorize all backend calls from outside an authenticated context.
}