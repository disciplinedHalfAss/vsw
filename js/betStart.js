/**
 * Created by et-asus on 25/09/16.
 */
$(function(){
   $('.bet-qs').first().show();

   var fieldReqMsg = 'This field is required!';

   $('.q1 ~ input').on('focusout', function(){
      var value = $(this).val();
      var closestBetQs = $(this).closest('.bet-qs');
      var errorMsg = closestBetQs.find('.err-msg');

      if(value == ""){
         errorMsg.text(fieldReqMsg);
      }else{
         errorMsg.text("");
         closestBetQs.next().show();
         $('html, body').animate({
            scrollTop: $(".bet-qs.q2").offset().top
         }, 2000);
      }
   }); //end q1

   $('.bet-qs.q2').on('focusout', 'input[type=text]', function(){
      var closestBetQs = $(this).closest('.bet-qs');
      var errorMsg = closestBetQs.find('.err-msg');
      var getValues = [];
      for(var i = 1; i <= $('.q2-options').length; i++){
         getValues.push($('#Option' + [i]).val());
      }

      var anyEmpty = true;
      for(var j = 0; j < getValues.length; j++){
         if(getValues[j] == ""){
            anyEmpty = false;
         }
      }

      if(!anyEmpty){
         $('.bet-qs.q2 .err-msg').text(fieldReqMsg);
      }else{
         $('.bet-qs.q2 .err-msg').text("");
         $('.bet-qs.q2').next().show();
         $('.bet-qs.share').show();
         $('html, body').animate({
            scrollTop: $(".bet-qs.q3").offset().top
         }, 2000);
         $('.pub-bet').show();
      }
   }); //end q2

   $('.pub-bet, #saveAsDraft').on('click', function(){
      function isOneChecked() {
         var chx = $('.bet-qs.q3 input');
         for (var i=0; i<chx.length; i++) {
            if (chx[i].type == 'radio' && chx[i].checked) {
               return true;
            }
         }
         return false;
      }
      
      if(!isOneChecked()){
         $('.bet-qs.q3 .main-err-msg').text("Please bet either money / punishments");
         return false;
      }else{
         switch($('input[name=g1]:checked').val()){
            case 'moneyBet':
                if(($('#bet_amount').val() == "")){
                   $('.bet-qs.q3 .bet-money .err-msg').text("Enter An Amount Please");
                   $('.bet-qs.q3 .bet-punish .err-msg').text("");
                   $('.bet-qs.q3 .main-err-msg').text("");
                   return false;
                }else if((($('#bet_amount').val() < 0)) || (isNaN($('#bet_amount').val()))){
                   $('.bet-qs.q3 .bet-money .err-msg').text("Enter A Real Number");
                   $('.bet-qs.q3 .bet-punish .err-msg').text("");
                   $('.bet-qs.q3 .main-err-msg').text("");
                   return false;
                }else{
                   $('.bet-qs.q3 .bet-money .err-msg').text("");
                   $('.bet-qs.q3 .bet-punish .err-msg').text("");
                   $('.bet-qs.q3 .main-err-msg').text("");
                }
            break;
            case 'stakeBet':
                if(($('#punishments').val() == "") || ($('#rewards').val() == "")){
                   $('.bet-qs.q3 .bet-punish .err-msg').text("Please enter punishments & rewards");
                   $('.bet-qs.q3 .bet-money .err-msg').text("");
                   $('.bet-qs.q3 .main-err-msg').text("");
                   return false;
                }else{
                   $('.bet-qs.q3 .bet-punish .err-msg').text("");
                   $('.bet-qs.q3 .bet-money .err-msg').text("");
                   $('.bet-qs.q3 .main-err-msg').text("");
                }
            break;
         }
         $('.bet-qs.q3 .bet-punish .err-msg').text("");
         $('.bet-qs.q3 .bet-money .err-msg').text("");
         $('.bet-qs.q3 .main-err-msg').text("");
      }
   })
});