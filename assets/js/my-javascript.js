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



function responsiveClass(target, cssClass, flag) {
    $(document).ready(function () {
        if (window.innerWidth < 780 === flag)
            $(target).addClass(cssClass);
        else
            $(target).removeClass(cssClass);
    });

    window.onresize = () => {
        if (window.innerWidth < 780 === flag)
            $(target).addClass(cssClass);
        else
            $(target).removeClass(cssClass);
    }
}



//share
SocialShareKit.init({
    twitter: {
        title: 'FINA LLC',
        via: 'fina2.net'
    },
    onBeforeOpen: function (targetElement, network, paramsObj) {
        console.log(arguments);
    },
    onOpen: function (targetElement, network, url, popupWindow) {
        console.log(arguments);
    },
    onClose: function (targetElement, network, url, popupWindow) {
        console.log(arguments);
    }
});


