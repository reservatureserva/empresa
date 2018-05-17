var peticionesAJAX = (function() {
	var login = (email, next)=>{
		$.ajax({
			type: "POST",
			dataType: "json",
			data: {email : email},
			url: "http://reservatureserva.ddns.net:8000/api/business/profile",
			async: false
		}).done(function(business) {
			if(business.message){
				contenido.feedBack(business.message);
				return next();
			}else{
				cookies.setJsonInCookie(utils.businessCookieName, business);
				return next(business);
			}
		}).fail(function(error) {
			contenido.feedBack(JSON.stringify(error));
		});
	};

	var registro = (json, callback)=>{
		$.ajax({
			type: "POST",
			dataType: "json",
			data: json,
			url: "http://reservatureserva.ddns.net:8000/api/business/register",
			async: false
		}).done(function(business) {
			if(business.message){
				contenido.feedBack(business.message);
				return;
			}
			callback(business);
		}).fail(function(error) {
			contenido.feedBack(JSON.stringify(error));
		});
	};

	var updateBusiness = (json, callback)=>{
		$.ajax({
			type: "PUT",
			dataType: "json",
			data: json,
			url: "http://reservatureserva.ddns.net:8000/api/business/update",
			async: false
		}).done(function(business) {
			if(business.message){
				contenido.feedBack(business.message);
				app.ini();
			}else{
				cookies.setJsonInCookie(utils.businessCookieName, business);
				location.reload();
			}
		}).fail(function(error) {
			contenido.feedBack(JSON.stringify(error));
		});
	}

	var borrarUsuario = (id, callback)=>{
		$.ajax({
			type: "DELETE",
			dataType: "json",
			data: {id: id},
			url: "http://reservatureserva.ddns.net:8000/api/business/delete"
		}).done(function(id) {
			callback(id);
		}).fail(function(error) {
			contenido.feedBack(JSON.stringify(error));
		});
	}

	var busqueda = (query, callback)=>{
		$.ajax({
			type: "POST",
			dataType: "json",
			data: query,
			url: "http://reservatureserva.ddns.net:8000/api/search"
		}).done(function(jsonArray) {
			cookies.setCookie(utils.lastSearch, JSON.stringify(jsonArray));
			return callback(jsonArray);
		}).fail(function(error) {
			contenido.feedBack(JSON.stringify(error));
		});
	};

	var reservas = (identificador, callback)=>{
		$.ajax({
			type: "POST",
			dataType: "json",
			data: {id: identificador},
			url: "http://reservatureserva.ddns.net:8000/api/business/booking"
		}).done(function(jsonArray) {
			var business = cookies.getJsonFromCookie(utils.businessCookieName);
			business.nReservas = jsonArray.length;
			cookies.setJsonInCookie(utils.businessCookieName, business);
			callback(jsonArray);
		}).fail(function(error) {
			contenido.feedBack(JSON.stringify(error));
		});
	};

	/************ Usuario **********/
	var getAvailable = (json, callback)=>{
		$.ajax({
			type: "POST",
			dataType: "json",
			data: json,
			url: "http://reservatureserva.ddns.net:8000/api/business/availability",
			async: false
		}).done(function(oferta) {
			return callback(oferta);
		}).fail(function(error) {
			contenido.feedBack(JSON.stringify(error));
		});
	};

	var createBooking = (booking)=>{
		$.ajax({
			type: "POST",
			dataType: "json",
			data: booking,
			url: "http://reservatureserva.ddns.net:8000/api/business/createBooking",
			async: false
		}).done(function(ok) {
			return contenido.home();
		}).fail(function(error) {
			contenido.feedBack(JSON.stringify(error));
		}).always(function() {
			contenido.home();
		});
	};



	/**************** EMPRESA **************/
	var insertOferta = (json, next)=>{
		$.ajax({
			type: "POST",
			dataType: "json",
			data: json,
			url: "http://reservatureserva.ddns.net:8000/api/business/createOffer",
			async: false
		}).done(function(oferta) {
			var json = cookies.getJsonFromCookie(utils.calendarTmp);
			cookies.deleteCookie(utils.ofertaTmp);
			cookies.deleteCookie(utils.calendarTmp);
			json.oferta =  oferta.id;
			createCalendar(json);
		}).fail(function(error) {
			contenido.feedBack(JSON.stringify(error));
		});
	};

	var createCalendar = (json)=>{
		$.ajax({
			type: "POST",
			dataType: "json",
			data: json,
			url: "http://reservatureserva.ddns.net:8000/api/business/createCalendar",
			async: false
		}).done(function(oferta) {
			contenido.feedBack("Oferta creada con exito", true);
			contenido.home();
		}).fail(function(error) {
			contenido.feedBack(JSON.stringify(error));
		});
	};

	/*********** Shared ***********/
	var getCategorias = () => {
		$.ajax({
			type: "GET",
			dataType: "json",
			url: "http://reservatureserva.ddns.net:8000/api/categorias"
		}).done(function(jsonArray) { 
			utils.cargarCategorias(jsonArray);
		}).fail(function(error) { 
			contenido.feedBack(JSON.stringify(error)); 
		}); 
	};

	return{
		login			: 		login,
		registro		: 		registro,
		borrarUsuario	:		borrarUsuario,
		busqueda		: 		busqueda,
		reservas		: 		reservas,
		insertOferta	: 		insertOferta,
		updateBusiness	: 		updateBusiness,
		createCalendar 	: 		createCalendar,
		getCategorias 	: 		getCategorias,
		getAvailable	: 		getAvailable,
		createBooking 	: 		createBooking
	};
})();
