 jQuery(document).ready(function($) {
  jQuery('.message a').click(function(){
      <!--Temporary animation-->
   jQuery('form').animate({height: "toggle", opacity: "toggle"}, "50");
 });
});

function showLogin(){
    document.getElementById("loginPage").style.display="block";
}

function hideLogin(){
    document.getElementById("loginPage").style.display="none";
}