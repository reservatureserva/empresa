var registroCo = (function() {
	var ini = ()=>{
		$('#date-registro').bootstrapMaterialDatePicker({format : 'DD/MM/YYYY', weekStart : 0, time: false });
		$(".dtp-btn-ok").click(function() {
			$(".js-date").addClass("is-dirty");
			$(".js-date").removeClass("is-invalid");
		});

		$(".volver").click(function() {
			app.auth();
		});
		
		utils.efectoInputs();

		//listener click del btn-registro llame a procesarRegistro
		$("form[name='registroFormu']").submit(function() {
			procesarRegistro();
			return false;
		});

		$("form[name='registroFormu'] input[name='avatar']").change(function() {
			var image = document.querySelector("form[name='registroFormu'] input[name='avatar']");
			utils.imgToBase64(image);
		});


	};
	var createJSON = (cif, name, email, tlf, password)=>{
		var json = {
			"cif":cif,
			"nombre":name,
			"email":email,
			"tlf":tlf
		}
		if(utils.dataOK(json)){
			json.foto_perfil = cookies.getCookie(utils.imageCookieName);
			cookies.deleteCookie(utils.imageCookieName);
			peticionesAJAX.registro(json, businessCo.registro);
		}
	};
	var procesarRegistro = ()=>{
		var cif = $("form[name='registroFormu'] input[name='cif']").val();
		var name = $("form[name='registroFormu'] input[name='name']").val();
		var email = $("form[name='registroFormu'] input[name='email']").val();
		var password = $("form[name='registroFormu'] input[name='password']").val();
		var repassword = $("form[name='registroFormu'] input[name='repassword']").val();
		var tlf = $("form[name='registroFormu'] input[name='tlf']").val();
		
		if (password !== repassword) {
			contenido.feedBack("Contraseña no coincide");
			return;
		}

		createJSON(cif, name, email, tlf, password);

	};

	return{
		ini						: 			ini
	}

})();