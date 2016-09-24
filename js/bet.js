var app = angular.module('startBet',['firebase']);
var ref = new Firebase("https://vsw.firebaseio.com");

app.controller("ibet", function($scope, $firebaseObject) {

    if($scope.question==null){
        $('#question').addClass('red-border');
    }else if($scope.description==null){
        $('#question').removeClass('red-border');
        $('#description').addClass('red-border');
    }else if($scope.option1==null){
        $('#question').removeClass('red-border');
        $('#description').removeClass('red-border');
        $('#Option1').addClass('red-border');
    }else if($scope.option2==null){
        $('#question').removeClass('red-border');
        $('#description').removeClass('red-border');
        $('#Option1').removeClass('red-border');
        $('#Option2').addClass('red-border');
    }else if($scope.bet_amount==null){
        $('#question').removeClass('red-border');
        $('#description').removeClass('red-border');
        $('#Option1').removeClass('red-border');
        $('#Option2').removeClass('red-border');
        $('#bet_amount').addClass('red-border');
    }else if($scope.start_date==null){
        $('#question').removeClass('red-border');
        $('#description').removeClass('red-border');
        $('#Option1').removeClass('red-border');
        $('#Option2').removeClass('red-border');
        $('#bet_amount').removeClass('red-border');
        $('#start_date').addClass('red-border');
    }else if($scope.start_time==null){
        $('#question').removeClass('red-border');
        $('#description').removeClass('red-border');
        $('#Option1').removeClass('red-border');
        $('#Option2').removeClass('red-border');
        $('#bet_amount').removeClass('red-border');
        $('#start_date').removeClass('red-border');
        $('#end_time').addClass('red-border');
    }else if($scope.end_date==null){
        $('#question').removeClass('red-border');
        $('#description').removeClass('red-border');
        $('#Option1').removeClass('red-border');
        $('#Option2').removeClass('red-border');
        $('#bet_amount').removeClass('red-border');
        $('#start_date').removeClass('red-border');
        $('#start_time').removeClass('red-border');
        $('#end_date').addClass('red-border');
    }else if($scope.end_time==null){
        $('#question').removeClass('red-border');
        $('#description').removeClass('red-border');
        $('#Option1').removeClass('red-border');
        $('#Option2').removeClass('red-border');
        $('#bet_amount').removeClass('red-border');
        $('#start_date').removeClass('red-border');
        $('#start_time').removeClass('red-border');
        $('#end_date').removeClass('red-border');
        $('#end_time').addClass('red-border');
    }
    else{

        var betsRef = ref.child("bets");
        var newbetsRef = betsRef.push();
        var betsID = newbetsRef.key();
        console.log(betsID);
        newbetsRef.set({
            admin_user: firebase.auth().currentUser.email,
            bet_amount: $scope.bet_amount,
            bets_user:{

                
            },
            bet_user_no: 0,
            bet_user_yes: 0,
            bet_no_content: $scope.option1,
            bet_yes_content: $scope.option2,
            description: $scope.description,
            duration: 0,
            question: $scope.question,
            start_date: $scope.start_date,
            end_date: $scope.end_date,
            end_time: $scope.end_time,
            start_time: $scope.start_time,
            rewards: 0,
            punishments: 0
        });
        window.location.replace("sharing.html");

    }


});