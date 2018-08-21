

$(document).ready(function () {
    $.getJSON("vacancies.json", function(json) {
        for(let i=0; i<json.vacancies.length;i++)
            $('.vacancies-head').append(
                '<div id="'+json.vacancies[i].id+'" class="row padding-top padding-bottom vacancies-card">'
                +'<div class="col-lg-2 col-sm-3 col-12">'
                +'<img class="vacancies-img" src="'+json.vacancies[i].img +'">'
                +'</div>'
                +'<div class="col-lg-10 col-sm-9 col-12">'
                +'<div class="vacancies-title">'+json.vacancies[i].title +'</div>'
                +'<hr class="vacancies-hr">'
                +'<div class="vacancies-text">'+json.vacancies[i].shortDescription+'</div>'
                +'<div class="text-center"><div class="btn my-btn vacan-btn"  data-vacanID="'+json.vacancies[i].id+'"><strong>Read more</strong></div></div>'
                +'</div>'
                +'</div>'
            );
    });
});


$(document).on('click',".vacan-btn",function () {
    console.log($(this).attr('data-some'));
   window.location = updateQueryStringParameter(window.location.href.replace('vacancies','vacancion'), 'vacan',$(this).attr('data-vacanID'));
});


function updateQueryStringParameter(uri, key, value) {
    const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    const separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
        return uri + separator + key + "=" + value;
    }
}