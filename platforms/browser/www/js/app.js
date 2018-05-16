var app = (function() {
	var ini = ()=>{
		contenido.ini();
		auth();
	};

	var auth = ()=>{
		var user = firebase.auth().currentUser;
		if (user) {
			var cookieUser = cookies.getJsonFromCookie(utils.userCookieName);
			if(cookieUser){
				contenido.home(cookieUser);				
			}else{
				peticionesAJAX.login(user.email, contenido.home);
			}
		} else {
			contenido.login();
		}
	};
	return{
		ini : ini,
		auth : auth
	};
})();