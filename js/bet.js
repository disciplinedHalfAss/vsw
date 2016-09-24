var app = angular.module('startBet',['firebase']);
var ref = new Firebase("https://vsw.firebaseio.com");

app.controller("ibet", function($scope, $firebaseObject) {
 

  $scope.addBets = function(){
    var betsRef = ref.child("bets");
    var newbetsRef = betsRef.push();
    var betsID = newbetsRef.key();
    console.log(betsID)
    newbetsRef.set({
        admin_user: firebase.auth().currentUser.email,
        bet_amount: $scope.bet_amount,
        bet_user_no: 0,
        bet_no_content: $scope.option1,
        bet_yes_content: $scope.option2,
        bet_user_yes: 0,
        description: $scope.description,
        duration: 0,
        question: $scope.question,
        start_date: $scope.start_date,
        end_date: $scope.end_date,
        end_time: $scope.end_time,
        start_time: $scope.start_time,
        rewards: $scope.rewards,
        punishments: $scope.punishments
    });
      
  };


});