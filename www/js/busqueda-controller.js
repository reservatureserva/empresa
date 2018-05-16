var busquedaCo = (function() {
	var ini = ()=>{
		$(".servicioCard").click((event)=>{
			var str = dataOfertaID(event);
			console.log("recupera el json");
			var json = utils.getOfferById(str);
			contenido.ofertaView(json);
		});
	};

	var dataOfertaID = (event)=>{
		return event.target.attributes.getNamedItem('data-oferta') ? 
		event.target.attributes.getNamedItem('data-oferta').value: 
		$(event.target).parents("div[class='mdl-cell mdl-cell--4-col mdl-cell--12-col-tablet serv mdl-shadow--2dp servicioCard']:first")[0].attributes.getNamedItem("data-oferta").value;
	};

	var createCard = (jsonArray)=>{
		var cardBusqueda = contenido.getCardBusqueda()[0].cloneNode(true);
		for(var i = 0; i < jsonArray.length; i++){
			var result = jsonArray[i];
			var cardTmp = cardBusqueda.firstElementChild.cloneNode(true);
			cardTmp.attributes.getNamedItem("data-oferta").value = result.id;
			//background class cardBackground
			var img = result.imagenes ? "url('"+utils.servidorURL+result.imagenes[0]+"')" : "url('"+utils.servidorURL+"/img/offers/default.jpg')";
			$(cardTmp).find(".cardBackground").css("background-image", img);

			//image class cardImg
			$(cardTmp).find(".cardImg").css("background-image", img);

			//title 
			$(cardTmp).find("h2").text(result.titulo);

			//description
			$(cardTmp).find("p.truncate").text(result.descripcion);

			//empresa
			$(cardTmp).find(".by").text("By "+ result.agencia.nombre);

			//price
			$(cardTmp).find("h6").text(result.precio_base+" €");

			//capsule in cardBusqueda
			cardBusqueda.append(cardTmp);
		}
		cardBusqueda.firstElementChild.remove();
		console.log(cardBusqueda);
		contenido.resultCards(cardBusqueda);
	};

	return{
		ini 		: 			ini,
		createCard 	: 			createCard
	}
})();