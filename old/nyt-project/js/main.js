$(function () { 
    $('#title').css('color','red');

    $("#selector").on('change', getSelection);
   

});

function getSelection() {
    var selection = $("#selector").val();
    console.log(selection);

    $('#nyt-list').prepend('<p class="loading">Loading...</p>');
    //replace link with new york times api link
    //will need access 
    $.getJSON('https://api.github.com/users/'+selection+'/repos?client_id=a37c6077034750f953fc&client_secret=8ff75658b21aa8c5830b7efeae85f559b4d36a02')
    .done(function(data){
        $('#header').addClass('short');
        $.each(data, function(key, value){ 
            //adjust list item to contain artical info as needed
            $('#nyt-list').append('<li class="article">'+key+': '+value.name+'</li>');     
            console.log(value);
        });
    })
    .fail(function(){
        $('#nyt-list').append('<li>Sorry there was an error.</li>');
    })
    .always(function(){
        $('.loading').remove();
    });

       
    
}