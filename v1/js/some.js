/*!
 * jQuery i18n plugin
 * @requires jQuery v1.1 or later
 *
 * See https://github.com/recurser/jquery-i18n
 *
 * Licensed under the MIT license.
 *
 * Version: <%= pkg.version %> (<%= meta.date %>)
 */
(function($) {
    /**
     * i18n provides a mechanism for translating strings using a jscript dictionary.
     *
     */

    var __slice = Array.prototype.slice;

    /*
     * i18n property list
     */
    var i18n = {

        dict: null,
        missingPattern: null,

        /**
         * load()
         *
         * Load translations.
         *
         * @param  property_list i18nDict : The dictionary to use for translation.
         */
        load: function(i18nDict, missingPattern) {
            if (this.dict !== null) {
                $.extend(this.dict, i18nDict);
            } else {
                this.dict = i18nDict;
            }

            if (missingPattern) {
                this.missingPattern = missingPattern;
            }
        },

        /**
         * unload()
         *
         * Unloads translations and clears the dictionary.
         */
        unload: function() {
            this.dict           = null;
            this.missingPattern = null;
        },

        /**
         * _()
         *
         * Looks the given string up in the dictionary and returns the translation if
         * one exists. If a translation is not found, returns the original word.
         *
         * @param  string str           : The string to translate.
         * @param  property_list params.. : params for using printf() on the string.
         *
         * @return string               : Translated word.
         */
        _: function (str) {
            dict = this.dict;
            if (dict && dict.hasOwnProperty(str)) {
                str = dict[str];
            } else if (this.missingPattern !== null) {
                return this.printf(this.missingPattern, str);
            }
            args = __slice.call(arguments);
            args[0] = str;
            // Substitute any params.
            return this.printf.apply(this, args);
        },

        /*
         * printf()
         *
         * Substitutes %s with parameters given in list. %%s is used to escape %s.
         *
         * @param  string str    : String to perform printf on.
         * @param  string args   : Array of arguments for printf.
         *
         * @return string result : Substituted string
         */
        printf: function(str, args) {
            if (arguments.length < 2) return str;
            args = $.isArray(args) ? args : __slice.call(arguments, 1);
            return str.replace(/([^%]|^)%(?:(\d+)\$)?s/g, function(p0, p, position) {
                if (position) {
                    return p + args[parseInt(position)-1];
                }
                return p + args.shift();
            }).replace(/%%s/g, '%s');
        }

    };

    /*
     * _t()
     *
     * Allows you to translate a jQuery selector.
     *
     * eg $('h1')._t('some text')
     *
     * @param  string str           : The string to translate .
     * @param  property_list params : Params for using printf() on the string.
     *
     * @return element              : Chained and translated element(s).
    */
    $.fn._t = function(str, params) {
        return $(this).html(i18n._.apply(i18n, arguments));
    };

    $.i18n = i18n;
})(jQuery);









var messages = {
    en: {
        OurProducts:'Our Products',
        clients:'Clients',
        home:'home',
        products:'Products',
        contact:'Contact',
        finaAddress:"Shartava N40 str. Tbilisi",
        whatwedo:"What we do",
        whoweare:"Who we are",
        contactUs:"Contact us",
        fullName:'Full Name:',
        phoneNumber:"Phone Number:",
        emailAddress:"Email Address:",
        message:"Message:"

    },
    ka: {
        OurProducts:'ჩვენი პროდუქტი',
        clients:'კლიენტები',
        home:'მთავარი',
        products:'პროდუქტი',
        contact:'კონტაქტი',
        finaAddress:"შარტავას N40 თბილისი",
        whatwedo:"ჩვენი საქმიანობა",
        whoweare:"ვინ ვართ ჩვენ",
        contactUs:"დაგვიკავშირდით",
        fullName:"სრული სახელი:",
        phoneNumber:"ტელეფონის ნომერი:",
        emailAddress:"Email მისამართი:",
        message:"წერილი:"

    }
};



var host = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
var domain = host + "/fina2net.github.io/";

function openModule(module, e) {

    if (e) {
        e.preventDefault();
    }

    if (module === 'contact' || module === 'console' || module === 'biodiversity' || module === 'desertification') {
        window.location.assign(domain + module+".html");
    } else if (module === 'dc' || module === 'bi') {
        window.location.assign(host + '/' + module);
    } else if (module === 'gis') {
        window.location.assign(domain + 'climate/#gis');
    } else {
        window.alert('error');
    }
}


$(document).ready(function () {

    var cookieArray=document.cookie.split(";");
    for(var i=0;i<cookieArray.length;i++){
        var cookie=cookieArray[i].split("=");

        if(cookie[0]==="lang")
            changeLanguage(cookie[1]);
    }

    $('#Contact').on('click', function (e) {
        openModule('contact', e);
    });

    $('#biodiversity').on('click', function (e) {
        openModule('biodiversity', e);
    });

    $('#desertification').on('click', function (e) {
        openModule('desertification', e);
    });



    $('#lang_en').on('click', function (e) {
        e.preventDefault();
        changeLanguage('en');
        document.cookie="lang=en";
    });

    $('#lang_ka').on('click', function (e) {
        e.preventDefault();
        changeLanguage('ka');
        document.cookie="lang=ka";
    });

});

function changeLanguage(lang) {
    $.i18n.unload();
    $.i18n.load(messages[lang]);

    translate();
}

function translate() {
    $('#OurProducts')._t('OurProducts');
    $('.Clients')._t('clients');
    $('.Home')._t('home');
    $('.Products')._t('products');
    $('#Contact')._t('contact');
    $('#finaAddress')._t('finaAddress');
    $('#WhatWeDo')._t('whatwedo');
    $('#WhoWeAre')._t('whoweare');
    $('#FullName')._t('fullName');
    $('#PhoneNumber')._t('phoneNumber');
    $('#EmailAddress')._t('emailAddress');
    $('#Message')._t('message');
    $('#ContactUs')._t('contactUs');



}

console.log(document.cookie);