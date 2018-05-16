var modalFiltro = (function() {

	var ini = ()=>{
		var dialog = $("#modalSearch")[0];
		if (!dialog.showModal) {
			dialogPolyfill.registerDialog(dialog);
		}

		$(".search-button").click(function() {
			showModal(dialog);
		});

		$(".create-button").click(function() {
			contenido.createOfertaView();
		});

		//when enter was pressed
		$("form[name='navBarForm']").submit(function() {
			showModal(dialog);
			return false;
		});


		$('.js-cancelar').click(function() {
			dialog.close();
		});

		//lanzar la query
		$('.js-buscar').click(function() {
			/*navigator.geolocation.getCurrentPosition(procesarBusqueda, function(error) {
				contenido.feedBack(error);
				return [0, 0]; //por si llega a petar, pues estarás en el centro de la tierra :v
			});*/
			procesarBusqueda([41.3910481, 2.1550605]);
			dialog.close();
		});
		sliders();
	};

	var showModal = (dialog)=>{
		var searchHeader = $("input[name='searchBoxHeader'").val();
		if(searchHeader!== ''){
			$("input[name='busqueda'").parent().addClass("is-dirty");
		}else{
			$("input[name='busqueda'").parent().removeClass("is-dirty");
		}
		$("input[name='busqueda'").val(searchHeader);
		dialog.showModal();
	};

	var sliders = ()=>{
		$("#slider-precio").slider({
			range: true,
			min: 0,
			max: 5000,
			values: [0, 5000],
			slide: function( event, ui ) {
				var value = "Cualquier precio";
				var realValue = "";
				$(".js-precio").addClass("is-dirty");
				var min = ui.values[0] + " €";
				var max = ui.values[1] > 4999 ? " o más" : " - " + ui.values[1] + " €" ;
				if(!(ui.values[0] === 0 && ui.values[1] === 5000)){
					value = min + max;
					realValue = ui.values[0] + ", " + ui.values[1];
				}
				if(ui.values[0] === ui.values[1]){
					value = min;
					realValue = ui.values[0];
				}
				$("input[name='precio'][type='text']").val(value);
				$("input[name='precio'][type='hidden']").val(realValue);
			}
		});


		$("#slider-distancia").slider({
			range: "min",
			step: 5,
			min: 0,
			max: 100,
			slide: function(event, ui) {
				var realValue = "";
				$(".js-distancia").addClass("is-dirty");
				$("input[name='distancia'][type='text']").val(ui.value > 0 && ui.value < 99 ? "menos de "+ui.value + " Km" :"Cualquier distancia");
				$("input[name='distancia'][type='hidden']").val(ui.value > 0 && ui.value < 99 ? ui.value : realValue);
			}
		});
	};

	var procesarBusqueda = (position)=>{
		var position = utils.getPosition(position);
		var precio = utils.getPrecio($("form[name='dialog'] input[name='precio'][type='hidden']").val());
		var json = {
			busqueda 	: 		$("form[name='dialog'] input[name='busqueda']").val(),
			categoria 	: 		$("form[name='dialog'] input[name='categoria']").val(),
			precio 		: 		precio,
			distancia 	: 		$("form[name='dialog'] input[name='distancia'][type='hidden']").val(),
			orden 		: 		$("form[name='dialog'] input[name='ordenar']").val(),
			position 	: 		position
		};
		peticionesAJAX.busqueda(json, busquedaCo.createCard);
	};


	return{
		ini				: 		ini,
		sliders			: 		sliders
	}
})();