/**
 * Created by et-asus on 24/09/16.
 */
$(function(){
    /*
    * loginSignUp()
    * used when clicking sign up / log in in homepage
    * if login is clicked, the pop up will show the login
    * if sign up is clicked the pop up will show sign up form
    * @param selector         class selector
    * */
    function loginSignUp(selector){
        selector.on('click', function(){
            var whichClass = $(this).attr('class');
            switch(whichClass){
                case 'nav-login':
                    $('.login-tab').addClass('active').siblings().removeClass('active');
                    $('.login-content').show().siblings().hide();
                    break;
                case 'nav-signUp':
                    $('.signUp-tab').addClass('active').siblings().removeClass('active');
                    $('.reg-content').show().siblings().hide();
                    break;
            }
            $('.login-reg-popup').show();
            $('.wrapper').addClass('cover');
        });
    }

    /*
     * loginSignUpTabs()
     * similar to loginSignUp() but this is when clicking the tabs
     * @param selector         class selector
     * */
    function loginSignUpTabs(selector){
        selector.on('click', function(){
        $(this).addClass('active').siblings().removeClass('active');
           var whichCLass = $(this).attr('class');
            console.log(whichCLass);
            switch(whichCLass){
                case  'login-tab active':
                    $('.login-content').show().siblings().hide();
                    break;
                case 'signUp-tab active':
                    $('.reg-content').show().siblings().hide();
                    break;
            };
        });
    }

    /* Provoke the functions */
    loginSignUp($('.nav-login'));
    loginSignUp($('.nav-signUp'));
    loginSignUpTabs($('.login-tab'));
    loginSignUpTabs($('.signUp-tab'));

    /* When the X in the login pop up is clicked, the pop up will be closed */
   $('.close-popup').on('click', function(){
       $('.login-reg-popup').hide();
       $('.wrapper').removeClass('cover');
   });

});