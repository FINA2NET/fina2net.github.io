$(function () {
    $('.module-slider').slick({
        slidesToShow: 3,
        infinite: true,
        autoplay:true,
        autoplaySpeed:2000,
        slidesToScroll: 1,
        mobileFirst:true,
        responsive: [
            {
                breakpoint: 824,
                settings: 'slick'
            },
            {
                breakpoint: 120,
                settings: 'unslick'
            }
        ],
        prevArrow:'<i class="fa fa-angle-left" id="left-arrow"></i>',
        nextArrow:'<i class="fa fa-angle-right" id="right-arrow"></i>'

    });
});