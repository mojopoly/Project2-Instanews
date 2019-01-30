$(function(){
    //smooth scrolling
    $("nav a").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
          // Prevent default anchor click behavior
          event.preventDefault();

          // Store hash
          var hash = this.hash;
          var off = 0;

          if(window.width > 499){
            off = 0;
          }else{
            off = 120;
          }
          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate({
            scrollTop: $(hash).offset().top - off
          }, 800, function(){

            // Add hash (#) to URL when done scrolling (default click behavior)
            //window.location.hash = hash;
          });
        } // End if
    });

    
    $('.main-carousel').flickity({
        // options
        cellAlign: 'left',
        contain: true
    });
});


function subscribe(){
    let email= document.getElementById("email");
    let emailValue= email.value;
    console.log(email);

    if (emailValue.includes("@")) {
        alert("Thanks for subscribing!");
    } else {
        alert("Please enter a valid email address.");   
    }

    email.value= "";


}

console.log('worked')