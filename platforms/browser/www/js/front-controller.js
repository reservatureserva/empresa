var contenido = (function() {
	var firstLoad = false;
	var idLogin;
	var idRemember;
	var idRegistro;
	var cardReserva;
	var cardBusqueda;
	var perfil;
	var oferta;
	var calendar;
	var faqs;
	var createOferta;
	var createCalendar;
	var modalCondiciones;
	var ini = ()=>{
		if(!firstLoad){
			idLogin = $("#login");
			idRegistro = $("#registro");
			idRemember = $("#remember");
			cardBusqueda = $("#cardBusqueda");
			cardReserva = $("#cardReserva");
			perfil = $("#perfil");
			oferta = $("#oferta");
			calendar = $("#calendario");
			faqs = $("#faqs");
			createOferta = $("#createOferta");
			createCalendar = $("#createCalendar");
			modalCondiciones = $("#modalCondiciones");
			globalListeners();
			firstLoad = true;
		}
	};

	var globalListeners = ()=>{
		$(".faqs").click(function() {
			faqsView();
		});
	};

	var login = ()=>{
		console.log("loading login");
		$("#navBar").css("display", "none");
		$(".js-contenido").html(idLogin);
		loginCo.ini();
	};

	var registro = ()=>{
		console.log("loading registro");
		$(".js-contenido").html(idRegistro);
		registroCo.ini();
	};

	//muestra el navBar e inserta en js-contenido el contenido
	var home = (user)=>{
		console.log("loading home");
		user = user == undefined ? cookies.getJsonFromCookie(utils.userCookieName) : user;
		$(".js-contenido").html("");
		homeCo.ini(user);
		filtroDialog();
		peticionesAJAX.getCategorias();
		peticionesAJAX.reservas(user.id, reservaCo.createCard);
	};

	var backHome = ()=>{
		console.log("loading home");
		$(".js-contenido").html("");
		peticionesAJAX.reservas(cookies.getJsonFromCookie(utils.userCookieName).id, reservaCo.createCard);
	};

	//generará y mostrará las reservas actuales recibidas del servidor
	var reservasCards = (cards)=>{
		console.log("loading card reserva");
		$(".js-contenido").html(cards);
		utils.truncateTexts();
	};


	var filtroDialog = ()=>{
		console.log("loading filtroDialog");
		modalFiltro.ini();

	};

	//generará y mostrará los resultados recibidos del servidor
	var resultCards = (cards)=>{
		console.log("loading card Busqueda");
		$(".js-contenido").html(cards);
		utils.truncateTexts();
		busquedaCo.ini();
	};

	var ofertaView = (json)=>{
		$(".js-contenido").html(oferta);
		ofertaCo.ini(json);
	};

	var calendarView = (json)=>{
		$(".js-contenido").html(calendar);
		calendarCo.ini(json);
	};

	//Dialogo de texto con las condiciones que tenga la oferta, un check de aceptar condiciones
	var modalCondicionesView = (fechas)=>{
		$(".js-contenido").append(modalCondiciones);
		modalCondicionesCo.ini(fechas);
	};

	var perfil = ()=>{
		console.log("loading login");
		$(".js-contenido").html(perfil);
		perfilCo.ini();
	};

	var feedBack = (mensaje, ok)=>{
		$('#feedBack').css("background-color",ok ? "#5cb700" : "#f44336");
		document.querySelector('#feedBack').MaterialSnackbar.showSnackbar({message: mensaje});

		return undefined;
	};

	var logOut = ()=>{
		/*$(".js-draft").append(idLogin);
		$(".js-draft").append(idRegistro);
		$(".js-draft").append(cardReserva);
		$(".js-draft").append(cardBusqueda);
		$(".js-draft").append(perfil);*/
	};

	var remember = ()=>{
		console.log("loading remember");
		$(".js-contenido").html(idRemember);
		rememberCo.ini();
	};

	var faqsView = ()=>{
		$(".js-contenido").html(faqs);
		faqsCo.ini();
	};

	var createOfertaView = ()=>{
		$(".js-contenido").html(createOferta);
		createOfertaCo.ini();
	};

	var createCalendarView = ()=>{
		$(".js-contenido").html(createCalendar);
		createCalendarCo.ini();
	};

	var getCardBusqueda = ()=>{
		return cardBusqueda;
	};

	var getCardReserva = ()=>{
		return cardReserva;
	};

	var getModalCondiciones = ()=>{
		return modalCondiciones;
	}

	return{
		ini 				: 		ini,
		login				:		login,
		registro			:		registro,
		home				: 		home,
		reservasCards		: 		reservasCards,
		filtroDialog		: 		filtroDialog,
		resultCards			: 		resultCards,
		ofertaView			: 		ofertaView,
		modalCondicionesView: 		modalCondicionesView,
		feedBack 			: 		feedBack,
		perfil 				: 		perfil,
		logOut 				: 		logOut,
		backHome			: 		backHome,
		remember 			: 		remember,
		faqsView 			: 		faqsView,
		createOfertaView 	: 		createOfertaView,
		createCalendarView	: 		createCalendarView,
		getCardBusqueda		: 		getCardBusqueda,
		getCardReserva 		: 		getCardReserva,
		getModalCondiciones : 		getModalCondiciones,
		calendarView 		: 		calendarView
	}
})();