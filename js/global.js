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
$('.register-btn').on('click',function(event){
	if($('#register-name-input').val()==""){
		$('.register-input').removeClass('red-border');
		$('#register-name-input').addClass('red-border');
	}else if($('#register-email-input').val()==""){
		$('.register-input').removeClass('red-border');
		$('#register-email-input').addClass('red-border');
	}else if($('#register-password-input').val()==""){
		$('.register-input').removeClass('red-border');
		$('#register-password-input').addClass('red-border');
	}else{
		$('.register-input').removeClass('red-border');	
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
	}
});
$('.login-btn').on('click',function(event){
	if($('#login-email-input').val()==""){
		$('.login-input').removeClass('red-border');
		$('#login-email-input').addClass('red-border');
	}else if($('#login-password-input').val()==""){
		$('.login-input').removeClass('red-border');
		$('#login-password-input').addClass('red-border');
	}else{
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
	}
});
$('.nav-logout').on('click',function(event){
	firebase.auth().signOut().then(function() {
	// Sign-out successful.
	}, function(error) {
	// An error happened.
	});
});
var option_number = 3;
$('#addButton').on('click',function(){
	$('.bet-options').append("<input type='text' id='Option"+ option_number +"' placeholder='Option"+ option_number +"'><br><br>");
	option_number++;
});
$('#invite').on('click',function(){
	var betsRef = ref.child("bets");
    var newbetsRef = betsRef.push();
    var betsID = newbetsRef.key();
    newbetsRef.set({
        admin_user: firebase.auth().currentUser.email,
        rules:$('#description').val(),
        money:$('#bet_amount').val(),
        reward:$('#rewards').val(),
        punishments:$('#punishments').val(),
        invited:[firebase.auth().currentUser.email],
        first_option:[firebase.auth().currentUser.email],
        second_option:[firebase.auth().currentUser.email],
        answer: "not answered"
    });
    window.location.replace("sharing.html");
});
var bets = new Firebase("https://vsw.firebaseio.com/bets");
bets.once("value", function(snapshot) {
	snapshot.forEach(function(childSnapshot) {
		var rules = childSnapshot.val().rules;
		if(childSnapshot.val().admin_user==firebase.auth().currentUser.email){
			$('#current').append("<div class='bet-title'><p>123</p></div><div class='bet-action'><button class='go-betting-btn'>View Results</button></div>");
		}else if(check_include(childSnapshot.val().invited,firebase.auth().currentUser.email)){
			$('#current').append("<div class='bet-title'><p>123</p></div><div class='bet-action'><button class='go-betting-btn'>Start Betting</button></div>");
		}else if(check_include(childSnapshot.val().first_option,firebase.auth().currentUser.email)){
			$('#current').append("<div class='bet-title'><p>123</p></div><div class='bet-action'><button class='go-betting-btn'>Start Betting</button></div>");
		}else if(check_include(childSnapshot.val().second_option,firebase.auth().currentUser.email)){
			$('#current').append("<div class='bet-title'><p>123</p></div><div class='bet-action'><button class='go-betting-btn'>Start Betting</button></div>");
		}
	});
});
function check_include(a,b){
	var flag = false;
	for(var i=0; i<a.length; i++){
		if(a[i]==b){
			flag = true;
		}
	}
	return flag;
}