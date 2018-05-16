var createCalendarCo = (function() {
	var ini = ()=>{
		$('#btn-crearCalendario').click(function() {
			procesarCalendario();
		});
	};

	var horasOK = ()=>{
		return true;
	};

	var procesarCalendario = ()=>{
		if($("input[name='total_disponible']").val()){
			var json = {
				lunes:{
					hora_inicio: "",
					hora_fin:"",
					hora_inicio2: "",
					hora_fin2: ""
				},
				martes:{
					hora_inicio: "",
					hora_fin:"",
					hora_inicio2: "",
					hora_fin2: ""
				},
				miercoles:{
					hora_inicio: "",
					hora_fin:"",
					hora_inicio2: "",
					hora_fin2: ""
				},
				jueves:{
					hora_inicio: "",
					hora_fin:"",
					hora_inicio2: "",
					hora_fin2: ""
				},
				viernes:{
					hora_inicio: "",
					hora_fin:"",
					hora_inicio2: "",
					hora_fin2: ""
				},
				sabado:{
					hora_inicio: "",
					hora_fin:"",
					hora_inicio2: "",
					hora_fin2: ""
				},
				domingo:{
					hora_inicio: "",
					hora_fin:"",
					hora_inicio2: "",
					hora_fin2: ""
				},
				total_disponible : ""
			};
			var inputs = $('form[name="createCalendar"] input[type="time"]');
			var error = false;
			for (var hour = 0; hour < inputs.length; hour++) {
				var inputName = inputs[hour].name;
				var value = inputs[hour].value;
				var dia = inputName.substr(0, inputName.length-1);
				var numero = inputName.substr(inputName.length-1);


				if (numero == 1) {
					json[dia]["hora_inicio"] = value;
				} else if (numero == 2) {
					json[dia]["hora_fin"] = value;
					if (json[dia]["hora_fin"] <= json[dia]["hora_inicio"]) {
						error = true;
					}
				} else if (numero == 3) {
					json[dia]["hora_inicio2"] = value;
					if (json[dia]["hora_inicio2"] <= json[dia]["hora_fin"]) {
						error = true;
					}
				} else if (numero == 4) {
					json[dia]["hora_fin2"] = value;
					if (json[dia]["hora_fin2"] <= json[dia]["hora_inicio2"]) {
						error = true;
					}
				}
			}

			if (error) {
				contenido.feedBack("Los horarios son erroneos");
			} else {
				json.total_disponible = $("input[name='total_disponible']").val();

				cookies.setJsonInCookie(utils.calendarTmp, json);
				//var bussiness = cookies.getJsonFromCookie(utils.bussinessCookieName);
				var bussiness = {cif: "123456F", nombre : "Empresa fake"};
				var json = cookies.getJsonFromCookie(utils.ofertaTmp);

				json.imagenes = [];
				for(var i = 0; i < 3; i++){
					var img = cookies.getCookie(utils.ofertaImg+"_"+i);
					if(img){
						json.imagenes.push(cookies.getCookie(utils.ofertaImg+"_"+i)); 					
					}
				}
				json.imagenes = json.imagenes.length > 0 ? json.imagenes : "";
				
				json.agencia = {
					cif : bussiness.cif,
					nombre : bussiness.nombre
				}
				peticionesAJAX.insertOferta(json);
			}
		}else{
			contenido.feedBack("Debes poner un stock mínimo");
		}
	};
	return{
		ini		: 		ini
	};
})();	