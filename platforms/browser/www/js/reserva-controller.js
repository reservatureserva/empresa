var reservaCo = (function() {
	var ini = ()=>{

	};

	var createCard = (jsonArray)=>{
		var cardReserva = contenido.getCardReserva()[0].cloneNode(true);
		for(var i = 0; i < jsonArray.length; i++){
			var result = jsonArray[i];
			var cardTmp = cardReserva.firstElementChild.cloneNode(true);
			cardTmp.attributes.getNamedItem("data-reserva").value = result.id;
			//title 
			$(cardTmp).find("h2").text(result.titulo);

			//description
			$(cardTmp).find("p.truncate").text(result.descripcion);

			//empresa
			$(cardTmp).find(".by").text("By "+ result.agencia.nombre);

			//fecha_ini
			$(cardTmp).find("h6")[0].innerText = utils.formatSeconds(result.fecha_inicio);

			//price
			$(cardTmp).find("h6")[1].innerText = result.costo+" €";

			//capsule in cardReserva
			cardReserva.append(cardTmp);
		}
		cardReserva.firstElementChild.remove();
		console.log(cardReserva);
		contenido.reservasCards(cardReserva);
	};
	return{
		ini 			: 		ini,
		createCard 		: 		createCard
	};
})();