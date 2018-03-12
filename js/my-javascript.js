function myFunction(){
    var x = document.getElementById("social-links-container");

    if(x.className==="social-links-class")
        x.className="social-links-class-response";
    else
        x.className="social-links-class";
}

//acordian

var createAccordian = function(accordianElem) {
    if(accordianElem.is( ":hidden" ))
        accordianElem.slideDown();
    else
        accordianElem.hide("slow");
};

$(document).ready(function(){
    $(".accordian-element").hide();
    $(".accordian-title").click(function(){
        createAccordian($(this).next());
    });
});



//Smooth scroll
$(document).ready(function(){

$("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 1800, function () {

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });
    } // End if
});
});
