var cookies = (function() {
	var getJsonFromCookie = (cookieName)=>{
		var cookie = getCookie(cookieName)
		if(cookie){
			return JSON.parse(decodeURIComponent(utils.decode64(window.localStorage.getItem(cookieName))));			
		}
		return undefined;
	};

	var setJsonInCookie = (cookieName, json)=>{
		window.localStorage.setItem(cookieName, utils.encode64(encodeURIComponent(JSON.stringify(json))));
	};

	var getCookie = (cookieName)=>{
		return window.localStorage.getItem(cookieName);
	};

	var setCookie = (cookieName, object)=>{
		window.localStorage.setItem(cookieName, object);
	};

	var deleteCookie = (cookieName)=>{
		window.localStorage.removeItem(cookieName);
	};

	return{
		getCookie				: 	getCookie,
		setCookie				: 	setCookie,
		setJsonInCookie 		: 	setJsonInCookie,
		getJsonFromCookie 		: 	getJsonFromCookie,
		deleteCookie 			: 	deleteCookie
	};
})();