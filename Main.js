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



const kinveyBaseUrl = "https://baas.kinvey.com/";
const kinveyAppKey = "kid_B1Vekw7j";
const kinveyAppSecret = "5e93a0efbede4706b676ffe92176eee7";

function showView(viewName) {
    $('main > section').hide();
    $('#' + viewName).show();
}


function showHideMenuLinks(){
   $("#home").show();
    if (sessionStorage.getItem('authToken') == null){

        $("#postnow").hide();
        $("#loginbutton").show();
        $("#logoutbutton").hide();
       /* $("#loginpage").hide();*/
    } else {
        $("#loginbutton").hide();
        $("#logoutbutton").show();
         $("#postnow").show();
        /*  $("#loginpage").hide();*/
    }
    }

$(function(){
    showHideMenuLinks();
    showView('seeHome')
})

$("#home").click(showshowHome);
$("#recent").click(showshowRecent);
$("#postnow").click(showshowPost);


$('#login-form').submit(function(e) { e.preventDefault(); login();});
$('#register-form').submit(function(e) { e.preventDefault(); register();});

function showshowHome(){
    showView('seeHome');
}
function showshowRecent(){
    showView('seeRecent');
}
function showshowPost(){
    showView('seePost');
}


function login(){
    const kinveyLoginUrl = kinveyBaseUrl + "user/" + kinveyAppKey + "/login";
    const kinveyAuthHeaders = {
        'Authorization' : "Basic " + btoa(kinveyAppKey + ":" + kinveyAppSecret),
    };
    let userData = {
        username: $('#loginUser').val(),
        password: $('#loginPass').val()
    };
    $.ajax({
        method: "POST",
        url: kinveyLoginUrl,
        headers: kinveyAuthHeaders,
        data: userData,
        success: loginSuccess,
        error: handleAjaxError
    });
        function loginSuccess(response){
        let userAuth = response._kmd.authtoken;
        sessionStorage.setItem('authToken', userAuth);
        showHideMenuLinks();
        
    /*    showInfo('Login successful.');*/
    }

}

function handleAjaxError(response){
    let errorMsg = JSON.stringify(response);
    if (response.readyState === 0)
        errorMsg = "Cannot connect due to network error.";
    if (response.responseJSON && response.responseJSON.description)
        errorMsg = response.responseJSON.description;
    //showError(errorMsg);
}

function register() {
    const kinveyRegisterUrl = kinveyBaseUrl + "user/" + kinveyAppKey + "/";
    const kinveyAuthHeaders = {
        'Authorization' : "Basic " + btoa(kinveyAppKey + ":" + kinveyAppSecret),    
    };
    let userData = {
        username: $('#registerUser').val(),
        password: $('#registerPass').val()
    };
    $.ajax({
        method: "POST",
        url: kinveyRegisterUrl,
        headers: kinveyAuthHeaders,
        data: userData,
        success: registerSuccess,
        error: handleAjaxError
    });
    
    function registerSuccess(response) {
        let userAuth = response._kmd.authToken;
        sessionStorage.setItem('authToken', userAuth);
        showHideMenuLinks();
        //showInfo('User registration successful.');
    }
    
    
}

function logout() {
    sessionStorage.clear();
    showHideMenuLinks();
    showView('seeHome')

}
