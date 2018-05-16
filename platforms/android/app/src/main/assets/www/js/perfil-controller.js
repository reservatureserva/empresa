var perfilCo = (function() {
	var ini = ()=>{
		var user = cookies.getJsonFromCookie(utils.businessCookieName);
		createPerfil(user);
		//Cambia los datos de un usuario
		$('#btn-guardar').click(function() {
			procesarUpdate(user);
		});
		//Borra un usuario
		$('#btn-borrar').click(function() {
			peticionesAJAX.borrarUsuario(user.id, businessCo.deleteUser);
		});

		$("form[name='updateFormu'] input[name='fotoPer']").change(function() {
			var image = document.querySelector("form[name='updateFormu'] input[name='fotoPer']");
			utils.imgToBase64(image);
		});


		utils.efectoInputs();
		$("form[name='updateFormu'] div").addClass("is-dirty");
	};
	var createJSON = (name, tlf, id, picture)=>{
		var json = {
			id 		: 	id,
			nombre	: 	name,
			tlf 	: 	tlf
		}

		if(utils.dataOK(json)){
			if(picture){
				json.foto_perfil = cookies.getCookie(utils.imageCookieName);
				cookies.deleteCookie(utils.imageCookieName);
			}

			peticionesAJAX.updateBusiness(json, contenido.perfil);			
		}
	};

	var createPerfil = (json)=>{
		var form = $("form[name='updateFormu']");
		$(form).find("input[name='nombre']").val(json.nombre);
		$(form).find("input[name='email']").val(json.email);
		$(form).find("input[name='cif']").val(json.cif);
		$(form).find("input[name='tlfn']").val(json.tlf);
		$(form).find("input[name='nreservas']").val(json.nReservas);
		if(json.foto_perfil != undefined && json.foto_perfil != ""){
			$('.profilePicture').css('background-image','url('+utils.servidorURL + json.foto_perfil + ')');			
		}

	};
	var procesarUpdate = (user)=>{
		var name = $("form[name='updateFormu'] input[name='nombre']").val();

		var tlf = $("form[name='updateFormu'] input[name='tlfn']").val();


		var password = $("form[name='updateFormu'] input[name='pass']").val();
		var repassword = $("form[name='updateFormu'] input[name='repass']").val();

		if (password !== repassword) {
			contenido.feedBack("Contraseña no coincide");
			return;
		}
		if (password !== undefined && password !== "") {
			businessCo.changePassword(password);
		}
		var picture = cookies.getCookie(utils.imageCookieName);
		if(name !== user.nombre || tlf !== user.tlf || picture){
			createJSON(name, tlf, user.id, picture);
		}

	};

	return{
		ini						: 			ini
	}

})();