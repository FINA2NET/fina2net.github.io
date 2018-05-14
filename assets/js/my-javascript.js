window.onresize=()=>{
    responsiveFooter();
};

$( document ).ready(function() {
    responsiveFooter();
});

/*
responsive footer
=========================================================
 */

function responsiveFooter() {
    if(window.innerWidth<780) {
        $("#footer-main-content").addClass("responsive-class");
        $('#copyright').addClass('responsive-copyright');
    }
    else{
        $("#footer-main-content").removeClass("responsive-class");
        $('#copyright').removeClass('responsive-copyright');
    }
}


//acordian

let createAccordian = (accordianElem)=>{
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
