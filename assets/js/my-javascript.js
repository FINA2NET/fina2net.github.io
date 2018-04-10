function myFunction(){
    let x = document.getElementById("social-links-container");

    if(x.className==="social-links-class")
        x.className="social-links-class-response";
    else
        x.className="social-links-class";
}

window.onresize=()=>{
    responsiveIcons();
};

$( document ).ready(function() {
    responsiveIcons();
});


function responsiveIcons() {
    if(window.innerWidth<640)
        $("#social_side_links").addClass("responsive-class");
    else
        $("#social_side_links").removeClass("responsive-class");
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

/*
$(document).ready(function() {
    $('#lang_en').click(function() {
        $(this).addClass('lang-btn');
        $('#lang_ka').removeClass('lang-btn')
    });

    $('#lang_ka').click(function() {
        $(this).addClass('lang-btn');
        $('#lang_en').removeClass('lang-btn');
    });
});

*/