/**
 * Created by et-asus on 24/09/16.
 */
$(function(){
   $('.nav-login').on('click', function(){
       $('.login-popup ').show();
       $('.wrapper').addClass('cover');
   });

   $('.close-popup').on('click', function(){
       $('.login-popup ').hide();
       $('.wrapper').removeClass('cover');
   });
});