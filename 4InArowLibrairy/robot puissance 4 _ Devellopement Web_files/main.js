
require.config({
    baseUrl: path3+"js/",
    
    paths: {
        angular: 			'http://ajax.googleapis.com/ajax/libs/angularjs/1.2.7/angular',
        'angular-route': 	'http://ajax.googleapis.com/ajax/libs/angularjs/1.2.7/angular-route',
        angularAMD: 		'angularAMD',
		jquery: 			'http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min',
		ia:'ia',
		modele:'modele',
		tableauDeModele:'tableauDeModele',
		myRules:'myRules',
		slider:'slider',
		ngcookies:'ngcookies'
    },
    
    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
		'jquery':['myRules'],
		'angular': ['jquery'],
        'angular-route': ['angular'],
    },
    
    // kick start application
    deps: ['app']
});
    