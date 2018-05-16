$(document).ready(function(){
  var config = {
   apiKey: "AIzaSyBoylqLp2f2ZO7afv-cso52PhCCncoOgbY",
   authDomain: "login-f6988.firebaseapp.com",
   databaseURL: "https://login-f6988.firebaseio.com",
   projectId: "login-f6988",
   storageBucket: "",
   messagingSenderId: "18277841873"
 };
 firebase.initializeApp(config);

 firebase.auth().onAuthStateChanged(function(user) {
  app.ini();
});
});

var businessCo = (function() {
  var login = (email, password)=>{
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      contenido.feedBack(errorMessage);
    });
  };

  var registro = (user)=>{
    //guardar en cookie 
    cookies.setJsonInCookie(utils.businessCookieName, user);
    var password = $("form[name='registroFormu'] input[name='password']").val();

    firebase.auth().createUserWithEmailAndPassword(user.email, password).catch(function(error) {
     var errorCode = error.code;
     var errorMessage = error.message;
     contenido.feedBack(error.message);
     peticionesAJAX.borrarUsuario(user.id, app.ini);
   });
  };

  var google = ()=>{
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().getRedirectResult().then(function(result) {
     if (result.credential) {
       var token = result.credential.accessToken;
     }
     var user = result.user;
   });

    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithRedirect(provider);


    /* firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      alert("Bienvenido "+user.email);
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      var email = error.email;

      var credential = error.credential;
      console.log(errorMessage);

    });*/
  };

  var logOut = ()=>{
    firebase.auth().signOut().then(function() {
      cookies.deleteCookie(utils.businessCookieName);
      location.reload();
    }, function(error) {
      alert('Sign Out Error'+ error);
    });
  };

  var rememberPassword = (emailAddress)=>{
    firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
      contenido.login();
    }).catch(function(error) {
      contenido.feedBack("Error, vuelva a intentarlo");
    });
  };

  var changePassword = (newPassword)=>{
    firebase.auth().currentUser.updatePassword(newPassword).then(function() {
    }).catch(function(error) {
      contenido.feedBack("Error al cambiar la contraseña, vuelva a intentarlo");
    });

  };

  var deleteUser = ()=>{
    firebase.auth().currentUser.delete().then(function() {
      cookies.deleteCookie(businessCookieName);
      location.reload(); 
    }).catch(function(error) {
      contenido.feedBack("Error al borrar Usuario");
      logOut();
    });   
  }

  return{
    login     :     login,
    registro  :     registro,
    google    :     google,
    logOut    :     logOut,
    rememberPassword  :   rememberPassword,
    changePassword    :   changePassword,
    deleteUser        :   deleteUser
  }
})();
