var homeCo = (function() {
	var menu = false;
	var ini = (json)=>{
		json = json ? json : cookies.getJsonFromCookie(utils.businessCookieName);
		printNav(json);
		empresaAction();
		perfilEvents();
	};

	var empresaAction = ()=>{
		$("#menu-empresa").click(function(event){
			event.preventDefault();
			if(!menu){
				menu = !menu;
				$(".botonEmp ul").css("visibility", "visible");
				$(".botonEmp ul").css("opacity", "1");
				$(".botonEmp a#menu-empresa + ul").css("visibility", "visible");
				$(".botonEmp a#menu-empresa + ul").css("animation", "scale-in 0.5s");
				$("#plus").html("clear");
			}else{
				menu = !menu; 
				$(".botonEmp ul").css("visibility", "hidden");
				$(".botonEmp ul").css("opacity", "0");
				$(".botonEmp a#menu-empresa + ul").css("visibility", "hidden");
				$("#plus").html("add");
			}
		});
	};


	var printNav = (json)=>{
		if(json.foto_perfil != undefined && json.foto_perfil != ""){
			$('.img').css('background-image','url('+utils.servidorURL + json.foto_perfil + ')');
		}
		$("#navBar").css("display", "block");
	};

	var perfilEvents = ()=>{
		$("#home").click(function(e) {	
			e.preventDefault();
			e.stopPropagation();
			contenido.backHome();
		});

		$("#verPerfil").click(function() {
			/** #### Node #### **/
			contenido.perfil();
		});

		$("#logout").click(function() {
			businessCo.logOut();			
		});
	};

	return{
		ini:ini
	};

})();