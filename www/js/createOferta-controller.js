var createOfertaCo = (function() {
	var ini = ()=>{
		eventButtons();
		utils.efectoInputs();
	};
	var crearOferta = ()=>{
		var json = {
			titulo 		: $("form[name='createOferta'] input[name='nombre-oferta']").val(),
			categoria	: $("form[name='createOferta'] input[name='categoria-oferta'][type='hidden']").val(),
			precio_base	: $("form[name='createOferta'] input[name='precio-oferta']").val(),
			descripcion : $("form[name='createOferta'] textarea[name='descripcion-oferta']").val(),
			
		};
		if(utils.dataOK(json)){
			json.condiciones = getConditions();
			cookies.setJsonInCookie(utils.ofertaTmp, json);
			contenido.createCalendarView();
		}
	};

	var getConditions = ()=>{
		var condiciones = [];
		var length = $(".js-condiciones").find("input").length;
		for (var i = 0; i < length; i++) {
			condiciones[i] = $("form[name='createOferta'] input[name='condicion"+(i+1)+"']").val();
		}
		return condiciones.length > 0 ? condiciones : "";

	};

	var eventButtons = ()=>{
		$(".js-addCondicion").click(function() {
			var condiciones = $(".js-condiciones")[0].cloneNode(true);
			var nCondi = ++$(condiciones).find("input").length;
			var newCondition = condiciones.firstElementChild.cloneNode(true);
			$(newCondition).find(".mdl-textfield--floating-label").addClass("is-focused");

			$(newCondition).find("input").attr("name", "condicion"+nCondi);
			$(newCondition).find("input").attr("id", "condicion"+nCondi);
			$(newCondition).find("input").val("");
			$(newCondition).find("label").attr("for", "condicion"+nCondi);
			$(newCondition).find("label").text("Condición "+nCondi);
			$(".js-condiciones").append(newCondition);
			utils.efectoInputs();
		});

		$("form[name='createOferta'] input[type='file']").change(function() {
				utils.imgToBase64(this, utils.ofertaImg+"_"+this.name);
		});


		$('#btn-crear').click(function() {
			crearOferta();
		});
	};

	return{
		ini						: 			ini
	}

})();