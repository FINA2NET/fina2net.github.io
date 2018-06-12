

$(document).ready(function () {
    $.getJSON("vacancies.json", function(json) {
        for(let i=0; i<json.vacancies.length;i++)
            $('.vacancies-head').append(
                '<div id="'+json.vacancies[i].id+'" class="row padding-top padding-bottom vacancies-card">'
                +'<div class="col-lg-4 col-md-4">'
                +'<img class="vacancies-img" src="'+json.vacancies[i].img +'">'
                +'</div>'
                +'<div class="col-lg-8 col-md-8">'
                +'<div class="vacancies-title">'+json.vacancies[i].title +'</div>'
                +'<hr class="vacancies-hr">'
                +'<div class="vacancies-text">'+json.vacancies[i].description+'</div>'
                +'<div class="text-center"><div class="btn my-btn"><a href="'+json.vacancies[i].formLink+'" target="_blank" style="color:white!important;"><strong>Application Form</strong></a></div></div>'
                +'</div>'
                +'</div>'
            );
    });
});