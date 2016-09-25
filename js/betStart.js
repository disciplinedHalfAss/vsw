/**
 * Created by et-asus on 25/09/16.
 */
$(function(){
   //Only show the first question while the others hides
   $('.bet-qs').first().show();

   //Create required message if user leaves empty
   var fieldReqMsg = 'This field is required!';
   var errorMsg = fieldReqMsg;

   /*
   * q1Inputs()
   *
   * Making the inputs for Q1 able to start check inputs valid or not by using the action entered
   * For now, using either focusout or when user hit enter in keyboard
   * Making sure user enters something in the inputs in order to go into the next question else only stays in this question
   *
   * @param selector       css selector for jQuery
   * @param action         even action such as keypress, focusout
   * */
   function q1Inputs(selector, action){
      selector.on(action, function(e){
         var value = $(this).val();
         var closestBetQs = $(this).closest('.bet-qs');
         var errorMsg = closestBetQs.find('.err-msg');

         if ( action === 'focusout' || e.which === 13 ){
            if(value == ""){
               errorMsg.text(fieldReqMsg);
            }else{
               errorMsg.text("");
               closestBetQs.next().show();
               $('html, body').animate({
                  scrollTop: $(".bet-qs.q2").offset().top
               }, 2000);
            }
         }
      });
   }

   //Provoke the q1Inputs to validate the inputs
   q1Inputs($('.q1 ~ input'), 'focusout');
   q1Inputs($('.q1 ~ input'), 'keypress');

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