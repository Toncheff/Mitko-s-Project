 jQuery(document).ready(function($) {
  jQuery('.message a').click(function(){
      <!--Temporary animation-->
   jQuery('form').animate({height: "toggle", opacity: "toggle"}, "50");
 });
});


function home2(){
      document.getElementById("seeHome").style.display="block";
      document.getElementById("seeRecent").style.display="none";
     document.getElementById("CreatePosts").style.display="none";
    document.getElementById("loginPage").style.display="none";
}
function showLogin(){
      document.getElementById("seeHome").style.display="none";
      document.getElementById("seeRecent").style.display="none";
     document.getElementById("CreatePosts").style.display="none";
    document.getElementById("loginPage").style.display="block";
}

function hideLogin(){
      document.getElementById("seeHome").style.display="block";
      document.getElementById("seeRecent").style.display="none";
     document.getElementById("CreatePosts").style.display="none";
    document.getElementById("loginPage").style.display="none";
}

function recentposts2(){
  
       document.getElementById("seeHome").style.display="none";
      document.getElementById("seeRecent").style.display="block";
     document.getElementById("CreatePosts").style.display="none";
    document.getElementById("loginPage").style.display="none";
      
}

function postnow2(){
  
       document.getElementById("seeHome").style.display="none";
      document.getElementById("seeRecent").style.display="none";
     document.getElementById("CreatePosts").style.display="block";
    document.getElementById("loginPage").style.display="none";
      
}



const kinveyBaseUrl = "https://baas.kinvey.com/";
const kinveyAppKey = "kid_B1Vekw7j";
const kinveyAppSecret = "5e93a0efbede4706b676ffe92176eee7";
$(function(){
    showHideMenuLinks();
    showView('seeHome')
})
function showView(viewName) {
    $('main > section').hide();
    $('#' + viewName).show();
}


function showHideMenuLinks(){
  
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



/*$("#home").click(showHome);
$("#recentposts").click(showRecent);
$("#postnow").click(showPost);*/


$('#login-form').submit(function(e) { e.preventDefault(); login();});
$('#register-form').submit(function(e) { e.preventDefault(); register();});
/*

function showHome(){
    showView('seeHome');
}
function showRecent(){
    showView("seeRecent");
}
function showPost(){
    showView('seePost');
}
*/


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
            hideLogin()
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
        let userAuth = response._kmd.authtoken;
        sessionStorage.setItem('authToken', userAuth);
        showHideMenuLinks();
        //showInfo('User registration successful.');
    }
    
    
}

function listPosts(){
    $('#seeRecent').empty();
    showView('seeRecent');
    
    const kinveypostssUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/postss";
    const kinveyAuthHeaders = {
        'Authorization': "Kinvey " + sessionStorage.getItem('authToken'),
    
    };
    $.ajax({
        method: "GET",
        url: kinveypostssUrl,
        headers: kinveyAuthHeaders,
        success: loadPostsSuccess,
        error: handleAjaxError
    });
}
function loadPostsSuccess(posts){
 
    if (posts.length == 0) {
        $('#seeRecent').text('No posts available.')
    } else{
        
        
  /*      let postsTable = $('<table>')
        .append($('<ctr>').append(
        '<th>Title</th>',
        '<th>Description</th>')
        );
        */
        for (let post of posts) {
            $('#seeRecent').append(
            $('<h1>').text(post.title),
            $('<h5>').text(post.description));
        
            
        }
        
             /*   for (let post of posts) {
            $('#seeRecent').append($('').append(
            $('<h1>').text(post.title),
            $('<h2>').text(post.description))
            
            );
        }*/
     /*   $('#postss').append(postsTable);*/
    
}
    
    
            }
function createPost(){
            const kinveypostssUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/postss";
            const kinveyAuthHeaders = {
                'Authorization': "Kinvey " + sessionStorage.getItem('authToken'),
            };
            let postData = {
                title: $('#titlepost').val(),
                 description: $('#postcontent').val(),
            };
            
            $.ajax({
                method: "POST",
                url: kinveypostssUrl,
                headers: kinveyAuthHeaders,
                data: postData,
                success: createPostSuccess,
                error: handleAjaxError
            });
            function createPostSuccess(response) {
                listPosts();
             
            }
        }
                
function logout() {
    sessionStorage.clear();
    showHideMenuLinks();
    showView('seeHome')

}

