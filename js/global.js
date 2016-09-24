/**
 * Created by et-asus on 24/09/16. and modified by Randy
 */
var ref = new Firebase("https://vsw.firebaseio.com");

$(function(){
   $('.nav-login').on('click', function(){
       $('.login-popup ').show();
       $('.wrapper').addClass('cover');
   });
   $('.nav-register').on('click', function(){
       $('.register-popup ').show();
       $('.wrapper').addClass('cover');
   });

   $('.close-popup').on('click', function(){
       $('.login-popup ').hide();
       $('.register-popup ').hide();
       $('.wrapper').removeClass('cover');
   });
});
$('.test').on('click',function(event){
});
$('.register-btn').on('click',function(event){
	var email = $('#register-email-input').val();
	var password = $('#register-password-input').val();
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorCode);
		console.log(errorMessage);
	}).then(
		function(){
			firebase.auth().currentUser.updateProfile({
				displayName:$('#register-name-input').val()
			})
			.then(function() {
				// Update successful.
				window.location.replace("dashboard.html");
				console.log("user profile updated successfully");
			}, function(error) {
				// An error happened.
				console.log(error);
			});
		}
	)
});
$('.login-btn').on('click',function(event){
	var email = $('#login-email-input').val();
	var password = $('#login-password-input').val();
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorCode);
		console.log(errorMessage);
	}).then(
		function(){
			window.location.replace("dashboard.html");
		}
	)
});
$('.nav-logout').on('click',function(event){
	firebase.auth().signOut().then(function() {
	// Sign-out successful.
	}, function(error) {
	// An error happened.
	});
});