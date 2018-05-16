var modalCondicionesCo = (function() {
	var ini = (fechas)=>{
		var oferta = cookies.getJsonFromCookie(utils.offerSelected);
		var arrayCondiciones = oferta.condiciones;
		eventButtons();
		var ul = $(contenido.getModalCondiciones()).find(".js-listaCondiciones");
		ul.html("");
		for (var c = 0; c < arrayCondiciones.length; c++) {
			ul.append("<li>".concat(arrayCondiciones[c]).concat("</li>"));
		}
		confirmText(oferta, fechas);
		modal();
	};

	var eventButtons = ()=>{
		$(".js-cancelarCondiciones").click(function() {
			contenido.getModalCondiciones()[0].close();
		});

		$(".js-aceptar").click(function() {
			contenido.getModalCondiciones()[0].close();
			peticionesAJAX.createBooking(cookies.getJsonFromCookie(utils.bookingTmp));			
		});
	};

	var modal = ()=>{
		var dialog = contenido.getModalCondiciones()[0];
		if (!dialog.showModal) {
			dialogPolyfill.registerDialog(dialog);
		}
		dialog.showModal();	
	}

	var confirmText = (oferta, hora)=>{
		$(".js-confirmReserva").html("Reserva para el día "+hora[0]);
		$(".js-confirmReserva2").html("Al confirmar acepta que cumple con los siguientes requisitos de "+oferta.titulo);
		var epoc = hora[1];
		var json = {
			titulo 			: 	oferta.titulo,
			descripcion 	: 	oferta.descripcion,
			fecha_inicio 	: 	hora[1],
			fecha_fin		: 	hora[1] + (3600000),
			fecha_cancelacion : 0,
			oferta 			: 	oferta.id,
			agencia 		: 	oferta.agencia,
			cliente			: 	cookies.getJsonFromCookie(utils.userCookieName).id,
			costo 			: 	oferta.precio_base
		}

		cookies.setJsonInCookie(utils.bookingTmp, json);
	};

	return{
		ini 	: 		ini
	};
})();