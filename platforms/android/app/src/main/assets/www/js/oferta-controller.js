var ofertaCo = (function() {
	var ini = (json)=>{
		cookies.setJsonInCookie(utils.offerSelected, json);
		printView(json);
	};



	var printView = (json)=>{
		$(".js-titol").text(json.titulo);
		$(".js-empresa").text(json.agencia.nombre);
		$(".js-precio-base").text(json.precio_base + " €");
		$(".js-descripcion").text(json.descripcion);
		var html = "";
		if (json.imagenes) {
			for (var i = 0; i < json.imagenes.length; i++) {
				if (i == 0) {
					html += '<div class="item active"><img src="' +utils.servidorURL + json.imagenes[i] +'"/></div>';
				} else {
					html += '<div class="item"><img src="'+utils.servidorURL + json.imagenes[i] +'"/></div>';
				}
			}
		} else {
			html += '<div class="item active"><img src="' +utils.servidorURL +'/img/offers/default.jpg"/></div>';
		}
		$(".oferta-carousel").html(html);
	};

	return{
		ini 		: 		ini
	};
})();