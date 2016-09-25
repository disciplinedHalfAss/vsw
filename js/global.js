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
	$('.bet-qs.q2 .bet-options').append("<input class='q2-options' type='text' id='Option"+ option_number +"' placeholder='Option "+ option_number +"'>");
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
var hash = window.location.hash;
var admin = null;
var rules = null;
var reward = null;
var punishments = null;
var answer = null;
var invited = null;
var first_option = null;
var second_option = null;
var money = null;
bets.once("value", function(snapshot) {
	snapshot.forEach(function(childSnapshot) {
		$('#user-name').text(firebase.auth().currentUser.displayName);
		var participants = childSnapshot.val().first_option.length+childSnapshot.val().second_option.length;
		if(childSnapshot.key()==hash.substring(1)){
			admin = childSnapshot.val().admin_user;
			rules = childSnapshot.val().rules;
			reward = childSnapshot.val().reward;
			punishments = childSnapshot.val().punishments;
			$('.creator').text("Creator: " + admin);
			$('.rules').text("Bet Rules: " + rules);
			$('.reward').text("Rewards: " + reward);
			$('.punishment').text("Punishments: " + punishments);
		}
		if(childSnapshot.val().admin_user==firebase.auth().currentUser.email){
			if(childSnapshot.val().answer=="not answered"){
				$('#current').append("<div class='bet-wrapper'><div class='bet-title'><p class='rules'>"+ childSnapshot.val().rules +"</p><p class='admin'><img src='image/admin.png' class='admin-icon'> Created by: "+ childSnapshot.val().admin_user +"</p><p class='user-number'>"+ participants +" people have betted on this one!</p></div><div class='bet-action'><a href='resultPage.html#" + childSnapshot.key() + "' class='view-result-btn'><img src='image/clock.png'>Participated</a></div></div>");
			}else{
				$('#expired').append("<div class='bet-wrapper'><div class='bet-title'><p class='rules'>"+ childSnapshot.val().rules +"</p><p class='admin'><img src='image/admin.png' class='admin-icon'> Created by: "+ childSnapshot.val().admin_user +"</p><p class='user-number'>"+ participants +" people have betted on this one!</p></div><div class='bet-action'><a href='resultPage.html#" + childSnapshot.key() + "' class='view-result-btn'><img src='image/clock.png'>Participated</a></div></div>");
			}
		}else if(check_include(childSnapshot.val().invited,firebase.auth().currentUser.email)){
			if(childSnapshot.val().answer=="not answered"){
				$('#current').append("<div class='bet-wrapper'><div class='bet-title'><p class='rules'>"+ childSnapshot.val().rules +"</p><p class='admin'><img src='image/admin.png' class='admin-icon'> Created by: "+ childSnapshot.val().admin_user +"</p><p class='user-number'>"+ participants +" people have betted on this one!</p></div><div class='bet-action'><a href='resultPage.html#" + childSnapshot.key() + "' class='go-betting-btn'><img src='image/fencing.png'>Place Your Bet</a></div></div>");
			}else{
				$('#expired').append("<div class='bet-wrapper'><div class='bet-title'><p class='rules'>"+ childSnapshot.val().rules +"</p><p class='admin'><img src='image/admin.png' class='admin-icon'> Created by: "+ childSnapshot.val().admin_user +"</p><p class='user-number'>"+ participants +" people have betted on this one!</p></div><div class='bet-action'><a href='resultPage.html#" + childSnapshot.key() + "' class='go-betting-btn'><img src='image/fencing.png'>Place Your Bet</a></div></div>");
			}
		}else if(check_include(childSnapshot.val().first_option,firebase.auth().currentUser.email)){
			if(childSnapshot.val().answer=="not answered"){
				$('#current').append("<div class='bet-wrapper'><div class='bet-title'><p class='rules'>"+ childSnapshot.val().rules +"</p><p class='admin'><img src='image/admin.png' class='admin-icon'> Created by: "+ childSnapshot.val().admin_user +"</p><p class='user-number'>"+ participants +" people have betted on this one!</p></div><div class='bet-action'><a href='resultPage.html#" + childSnapshot.key() + "' class='view-result-btn'><img src='image/clock.png'>Participated</a></div></div>");
			}else{
				$('#expired').append("<div class='bet-wrapper'><div class='bet-title'><p class='rules'>"+ childSnapshot.val().rules +"</p><p class='admin'><img src='image/admin.png' class='admin-icon'> Created by: "+ childSnapshot.val().admin_user +"</p><p class='user-number'>"+ participants +" people have betted on this one!</p></div><div class='bet-action'><a href='resultPage.html#" + childSnapshot.key() + "' class='view-result-btn'><img src='image/clock.png'>Participated</a></div></div>");
			}
		}else if(check_include(childSnapshot.val().second_option,firebase.auth().currentUser.email)){
			if(childSnapshot.val().answer=="not answered"){
				$('#current').append("<div class='bet-wrapper'><div class='bet-title'><p class='rules'>"+ childSnapshot.val().rules +"</p><p class='admin'><img src='image/admin.png' class='admin-icon'> Created by: "+ childSnapshot.val().admin_user +"</p><p class='user-number'>"+ participants +" people have betted on this one!</p></div><div class='bet-action'><a href='resultPage.html#" + childSnapshot.key() + "' class='view-result-btn'><img src='image/clock.png'>Participated</a></div></div>");
			}else{
				$('#expired').append("<div class='bet-wrapper'><div class='bet-title'><p class='rules'>"+ childSnapshot.val().rules +"</p><p class='admin'><img src='image/admin.png' class='admin-icon'> Created by: "+ childSnapshot.val().admin_user +"</p><p class='user-number'>"+ participants +" people have betted on this one!</p></div><div class='bet-action'><a href='resultPage.html#" + childSnapshot.key() + "' class='view-result-btn'><img src='image/clock.png'>Participated</a></div></div>");
			}
		}
	})
});
$('.vote-a').on('click',function(){
	bets.once("value", function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			if(childSnapshot.key()==hash.substring(1)){
				admin = childSnapshot.val().admin_user;
				rules = childSnapshot.val().rules;
				reward = childSnapshot.val().reward;
				punishments = childSnapshot.val().punishments;
				answer = childSnapshot.val().answer;
				invited = childSnapshot.val().invited;
				first_option = childSnapshot.val().first_option;
				second_option = childSnapshot.val().second_option;
				money = childSnapshot.val().money;
			}
		})
	})
	remove_element(invited,firebase.auth().currentUser.email);
	first_option.push(firebase.auth().currentUser.email);
	firebase.database().ref('bets/'+hash.substring(1)).set({

				admin_user:admin,
				rules:rules,
				reward:reward,
				punishments:punishments,
				answer:answer,
				invited:invited,
				first_option:first_option,
				second_option:second_option,
				money:money
	})
});
$('.vote-b').on('click',function(){
	bets.once("value", function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			if(childSnapshot.key()==hash.substring(1)){
				admin = childSnapshot.val().admin_user;
				rules = childSnapshot.val().rules;
				reward = childSnapshot.val().reward;
				punishments = childSnapshot.val().punishments;
				answer = childSnapshot.val().answer;
				invited = childSnapshot.val().invited;
				first_option = childSnapshot.val().first_option;
				second_option = childSnapshot.val().second_option;
				money = childSnapshot.val().money;
			}
		})
	})
	remove_element(invited,firebase.auth().currentUser.email);
	second_option.push(firebase.auth().currentUser.email);
	firebase.database().ref('bets/'+hash.substring(1)).set({
				admin_user:admin,
				rules:rules,
				reward:reward,
				punishments:punishments,
				answer:answer,
				invited:invited,
				first_option:first_option,
				second_option:second_option,
				money:money
	})
});
function remove_element(a,b){
	for(var i=0; i<a.length; i++){
		if(a[i]==b){
			a.splice(i,1);
		}
	}
}
function check_include(a,b){
	var flag = false;
	for(var i=0; i<a.length; i++){
		if(a[i]==b){
			flag = true;
		}
	}
	return flag;
}
