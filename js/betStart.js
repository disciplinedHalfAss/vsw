/**
 * Created by et-asus on 25/09/16.
 */
$(function(){
   $('.bet-qs').show();

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
      }
   }); //end q2

   $('.pub-bet').on('click', function(){
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
         $('.bet-qs.q3 .err-msg').text("Select either bet money / stake");
         return false;
      }else{
         switch($('input[name=g1]:checked').val()){
            case 'moneyBet':
                if(($('#bet_amount').val() == "")){
                   $('.bet-qs.q3 .err-msg').text("Enter Amount");
                   return false;
                }else if((($('#bet_amount').val() < 0)) || (isNaN($('#bet_amount').val()))){
                   $('.bet-qs.q3 .err-msg').text("Enter A Real Number");
                   return false;
                }else{
                   $('.bet-qs.q3 .err-msg').text("");
                }
            break;
            case 'stakeBet':
               (($('#punishments').val() == "")) ? $('.bet-qs.q3 .err-msg').text("Enter Stake") : $('.bet-qs.q3 .err-msg').text("");
                return false;
            break;
         }
         $('.bet-qs.q3 .err-msg').text("");
      }
      
      if($('#rewards').val() == ""){
         $('.bet-qs.q3 .err-msg').text("Reward must be entered!");
         return false;
      }else{
         $('.bet-qs.q3 .err-msg').text("");
      }
   })
});