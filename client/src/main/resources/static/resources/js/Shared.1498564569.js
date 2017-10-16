/**
 * Created by tino on 2/18/16.
 */


(function () {
    var cx = '005510514605330969585:pp7v-idmeyu';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
})();


var cookiePolicy = readCookie("acceptedCookiePolicy");
$(document).ready(function () {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
        $(".youtubePlayer").YouTubeModal({autoplay: 0, width: 640, height: 480});
    });

    // Share you opinion - open form
    $('.triggerOpinion').on('click', function (e) {
        e.preventDefault();
        $('.form.form-content').toggleClass('hidden');
    });

    if (cookiePolicy == null) {
        ///Show popup
        $(".cookiesAccept").show("slow");
    }

    $("#cookieAccept").click(function () {
        createCookie("acceptedCookiePolicy", 1, 999);
        $(".cookiesAccept").hide("slow");
    });


    //fit modal in screen
    function checkModalHeight(panelHeightPercent) {
        var modalBodyHeight = $('#genericModal .modal-body').height();
        var windowHeight = $(window).height();

        if (panelHeightPercent && panelHeightPercent > 0) {
            var style = "height:" + windowHeight * panelHeightPercent + "px;overflow-y: scroll;";
            $('#genericModal .modal-body').attr("style", style);
        }
        else {
            $('#genericModal .modal-body').attr("style", '');
        }
    }

    //BNB explainer popup
    $("div[data-href='#bnbExplainer']").click(function () {
        $("#genericModalBody").html("<img src='/frontend/images/home/bnb-m9849.png' class='img-responsive'>");
        $("#genericModal").modal("toggle");
        checkModalHeight(0.8);
    });
    //No1 explainer popup
    $("div[data-href='#no1Explainer']").click(function () {
        $("#genericModalBody").html("<img src='/frontend/images/home/n1_2016.png' class='img-responsive'>");
        $("#genericModal").modal("toggle");
        checkModalHeight(0.8);
    });
    //Personal data explainer popup
    $("a[href='#personalDataExplainer']").click(function () {
        $("#genericModalBody").html("<img src='/frontend/images/home/pers_data.png' class='img-responsive'>");
        $("#genericModal").modal("toggle");
        checkModalHeight(0.8);
    });

    //Custom Validators

    //regex for address
    $.validator.addMethod(
        "regexAddress",
        function (value, element) {
            var pattern = /^[_а-яА-Я\s\-\.\,"\'\d\№]+$/;

            var re = new RegExp(pattern);
            return this.optional(element) || re.test(value);
        },
        t("%%Not a valid address%%")
    );

    //regex for village
    $.validator.addMethod(
        "regexVillage",
        function (value, element) {
            var pattern = /^[_а-яА-Я\s\-]+$/;

            var re = new RegExp(pattern);
            return this.optional(element) || re.test(value);
        },
        t("%%Not a valid village%%")
    );

    //custom regex for email
    $.validator.addMethod(
        "regexEmail",
        function (value, element) {
            var pattern = /^[_a-zA-Z0-9-]+((\.){0,1}[_a-zA-Z0-9-]+){1,}@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

            var re = new RegExp(pattern);
            return this.optional(element) || re.test(value);
        },
        t("%%Not a valid email address%%")
    );

    //custom regex for names
    $.validator.addMethod(
        "regexName",
        function (value, element) {
            var pattern = /^[а-я]*\s?-?\s?[а-я]*$/i;

            var re = new RegExp(pattern);
            return this.optional(element) || re.test(value);
        },
        t("%%Check your name%%")
    );

    //custom regex for FULL names
    $.validator.addMethod(
        "regexFullName",
        function (value, element) {
            var pattern = /^[а-я]{2,}\s?-*\s?[а-я]*\s?[а-я]*\s?-*\s?[а-я]*\s?[а-я]*\s?-*\s?[а-я]*$/i;

            var re = new RegExp(pattern);
            return this.optional(element) || re.test(value);
        },
        t("%%Check your name%%")
    );

    jQuery.validator.addMethod("lettersonly", function (value, element) {
        return this.optional(element) || /^[а-яА-Я- ]+$/i.test(value);
    }, t("%%Only Letters Please%%"));

    //This is custom method to check if the ID data matches current location data. It can be used in other scenarios also
    $.validator.addMethod("dependentOn", function (value, element, params) {
        var matches = $("#" + params.element).val() == params.value;
        return matches;
    }, jQuery.validator.format(t("%%You must enter this field%%")));

    //validate dropdown e.g. if selected value is -1 is not valid
    $.validator.addMethod(
        "valueNotEquals",
        function (value, element, arg) {
            return arg != value;
        },
        t("%%Please select correct option%%")
    );

    //validate if another field is valid
    $.validator.addMethod(
        "otherValid",
        function (value, element, arg) {
            otherIsValid = $("#" + arg.element).val() != '' && $("#" + arg.element).hasClass('valid');
            return otherIsValid;
        },
        t("%%Please enter EGN%%")
    );

    $.validator.addMethod(
        "fileSize",
        function (value, element, arg) {
            size = 0;
            //this.files[0].size gets the size of your file.
            if (element.files.length > 0) {
                size = ((element.files[0].size / 1000000).toFixed(1));
            }

            id = element.id;
            if (size > arg) {
                var errors = {};
                errors[id] = t("%%Please select a file with size less than 2MB%%");
                //!* Show errors on the form *!/

                validatorCareer.showErrors(errors);
            }
            return arg != value;
        },
        t("%%File size is over limit%%")
    );

    $.validator.addMethod(
        "fileType",
        function (value, element, arg) {
            //this.files[0].size gets the size of your file.
            var types = arg.split(",");
            id = element.id;

            if (element.files.length > 0 && (types.indexOf(element.files[0].type) == -1)) {
                var errors = {};
                errors[id] = t("%%Please select a supported file type%%");
                //!* Show errors on the form *!/

                validatorCareer.showErrors(errors);
            }
            return arg != value;
        }
    );

    $.validator.addMethod("notEqual", function (value, element, param) {
        return this.optional(element) || value != $("#" + param).val();
    }, t("%%Please specify a different  value%%"));

    /**
     * IBAN is the international bank account number.
     * It has a country - specific format, that is checked here too
     */
    $.validator.addMethod("iban", function (value, element) {
        // some quick simple tests to prevent needless work
        if (this.optional(element)) {
            return true;
        }

        // remove spaces and to upper case
        var iban = value.replace(/ /g, "").toUpperCase(),
            ibancheckdigits = "",
            leadingZeroes = true,
            cRest = "",
            cOperator = "",
            countrycode, ibancheck, charAt, cChar, bbanpattern, bbancountrypatterns, ibanregexp, i, p;

        if (iban.slice(0, 2) != "BG") {
            return false;
        }

        // check the country code and find the country specific format
        countrycode = iban.substring(0, 2);
        bbancountrypatterns = {
            "AL": "\\d{8}[\\dA-Z]{16}",
            "AD": "\\d{8}[\\dA-Z]{12}",
            "AT": "\\d{16}",
            "AZ": "[\\dA-Z]{4}\\d{20}",
            "BE": "\\d{12}",
            "BH": "[A-Z]{4}[\\dA-Z]{14}",
            "BA": "\\d{16}",
            "BR": "\\d{23}[A-Z][\\dA-Z]",
            "BG": "[A-Z]{4}\\d{6}[\\dA-Z]{8}",
            "CR": "\\d{17}",
            "HR": "\\d{17}",
            "CY": "\\d{8}[\\dA-Z]{16}",
            "CZ": "\\d{20}",
            "DK": "\\d{14}",
            "DO": "[A-Z]{4}\\d{20}",
            "EE": "\\d{16}",
            "FO": "\\d{14}",
            "FI": "\\d{14}",
            "FR": "\\d{10}[\\dA-Z]{11}\\d{2}",
            "GE": "[\\dA-Z]{2}\\d{16}",
            "DE": "\\d{18}",
            "GI": "[A-Z]{4}[\\dA-Z]{15}",
            "GR": "\\d{7}[\\dA-Z]{16}",
            "GL": "\\d{14}",
            "GT": "[\\dA-Z]{4}[\\dA-Z]{20}",
            "HU": "\\d{24}",
            "IS": "\\d{22}",
            "IE": "[\\dA-Z]{4}\\d{14}",
            "IL": "\\d{19}",
            "IT": "[A-Z]\\d{10}[\\dA-Z]{12}",
            "KZ": "\\d{3}[\\dA-Z]{13}",
            "KW": "[A-Z]{4}[\\dA-Z]{22}",
            "LV": "[A-Z]{4}[\\dA-Z]{13}",
            "LB": "\\d{4}[\\dA-Z]{20}",
            "LI": "\\d{5}[\\dA-Z]{12}",
            "LT": "\\d{16}",
            "LU": "\\d{3}[\\dA-Z]{13}",
            "MK": "\\d{3}[\\dA-Z]{10}\\d{2}",
            "MT": "[A-Z]{4}\\d{5}[\\dA-Z]{18}",
            "MR": "\\d{23}",
            "MU": "[A-Z]{4}\\d{19}[A-Z]{3}",
            "MC": "\\d{10}[\\dA-Z]{11}\\d{2}",
            "MD": "[\\dA-Z]{2}\\d{18}",
            "ME": "\\d{18}",
            "NL": "[A-Z]{4}\\d{10}",
            "NO": "\\d{11}",
            "PK": "[\\dA-Z]{4}\\d{16}",
            "PS": "[\\dA-Z]{4}\\d{21}",
            "PL": "\\d{24}",
            "PT": "\\d{21}",
            "RO": "[A-Z]{4}[\\dA-Z]{16}",
            "SM": "[A-Z]\\d{10}[\\dA-Z]{12}",
            "SA": "\\d{2}[\\dA-Z]{18}",
            "RS": "\\d{18}",
            "SK": "\\d{20}",
            "SI": "\\d{15}",
            "ES": "\\d{20}",
            "SE": "\\d{20}",
            "CH": "\\d{5}[\\dA-Z]{12}",
            "TN": "\\d{20}",
            "TR": "\\d{5}[\\dA-Z]{17}",
            "AE": "\\d{3}\\d{16}",
            "GB": "[A-Z]{4}\\d{14}",
            "VG": "[\\dA-Z]{4}\\d{16}"
        };

        bbanpattern = bbancountrypatterns[countrycode];
        // As new countries will start using IBAN in the
        // future, we only check if the countrycode is known.
        // This prevents false negatives, while almost all
        // false positives introduced by this, will be caught
        // by the checksum validation below anyway.
        // Strict checking should return FALSE for unknown
        // countries.
        if (typeof bbanpattern !== "undefined") {
            ibanregexp = new RegExp("^[A-Z]{2}\\d{2}" + bbanpattern + "$", "");
            if (!(ibanregexp.test(iban))) {
                return false; // invalid country specific format
            }
        }

        // now check the checksum, first convert to digits
        ibancheck = iban.substring(4, iban.length) + iban.substring(0, 4);
        for (i = 0; i < ibancheck.length; i++) {
            charAt = ibancheck.charAt(i);
            if (charAt !== "0") {
                leadingZeroes = false;
            }
            if (!leadingZeroes) {
                ibancheckdigits += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(charAt);
            }
        }

        // calculate the result of: ibancheckdigits % 97
        for (p = 0; p < ibancheckdigits.length; p++) {
            cChar = ibancheckdigits.charAt(p);
            cOperator = "" + cRest + "" + cChar;
            cRest = cOperator % 97;
        }

        return cRest === 1;
    }, t("%%Please specify a valid IBAN%%"));


    window.nlsubmissionblock = false;
    //validate newsletter form
    $("#newsletterForm").validate({
        rules: {
            email: {
                required: true,
                email: true,
                regexEmail: true,
                remote: {
                    data: {
                        email: function () {
                            window.nlsubmissionblock = true;
                            return $("#email").val();
                        }
                    },
                    url: "/api/validator/email",
                    type: "post",
                    complete: function () {
                        window.nlsubmissionblock = false;
                        $("#email").removeClass("distant");
                    }
                }
            },
            name: {
                required: false
            }
        },
        messages: {
            email: {
                required: t("%%Please enter your email address%%"),
                email: t("%%The email format is not recognized%%"),
                remote: t("%%Please check your email address for errors%%")
            },
            name: {
                required: t("%%Your name is required%%")

            }
        }
    });

    $('.container.faq .panel-group.col-md-6').on('shown.bs.collapse', function (e) {
        var winHeight = $(window).height();
        var bott = $(this).offset().top + $(this).height() - $(document).scrollTop();
        var scrTop = $(document).scrollTop() + bott - winHeight;

        if (winHeight - scrTop < 0) {
            scrTop = $(this).offset().top;
        }
        if (bott > winHeight) {
            $('html, body').animate({
                scrollTop: scrTop
            }, 500);
        }
    });
    $(document).on(
        'keyup',
        "#name, #prezime, #family, #body, #contractPartnerName, #contractSecondPartnerName, #currentAddress, #idAddress, #villageName, #idVillageName, #additionalNotes, #callmeName, #callmeFamily",
        function (e) {
            var match = /[a-zA-Z-\`\[\]\\\}\{\|]/.exec($(this).val());
            if (match) {
                var val = transcribe($(this));
            } else {

            }
        }
    );
    $(document).on(
        'change',
        "#name, #prezime, #family, #body, #contractPartnerName, #contractSecondPartnerName, #currentAddress, #idAddress, #villageName, #idVillageName, #additionalNotes, #callmeName, #callmeFamily",
        function () {
            var match = /[a-zA-Z-\`\[\]\\\}\{\|]/.exec($(this).val());
            if (match) {
                var val = transcribe($(this));
            }
        }
    );


    // Name like fields
    /*$('#name, #family, #callmeName, #callmeFamily').keypress(function (e) {
        var ret;
        if ((e.metaKey || e.ctrlKey) && (e.charCode == 99 || e.charCode == 118)) {
            ret = true;
        }
        else {
            ret = (e.charCode > 64 && e.charCode != 94 && e.charCode != 95 && e.charCode != 126 && e.charCode != 167) //letters
                || e.charCode == 32 //space
                || e.charCode == 45 // -
                || e.keyCode == 8 //backspace
                || e.keyCode == 9 //tab
                || (e.keyCode == 37 && e.charCode != 37) //left
                || (e.keyCode == 39 && e.charCode != 39) //right
                || (e.keyCode == 46 && e.charCode != 46); //del
        }
        return ret;
    });*/
    $('.filter-chars-only').keypress(function (e) {
        var ret;
        if ((e.metaKey || e.ctrlKey) && (e.charCode == 99 || e.charCode == 118)) {
            ret = true;
        }
        else {
            ret = (e.charCode > 64 && e.charCode != 94 && e.charCode != 95 && e.charCode != 126 && e.charCode != 167) //letters
                || e.charCode == 32 //space
                || e.charCode == 45 // -
                || e.keyCode == 8 //backspace
                || e.keyCode == 9 //tab
                || (e.keyCode == 37 && e.charCode != 37) //left
                || (e.keyCode == 39 && e.charCode != 39) //right
                || (e.keyCode == 46 && e.charCode != 46); //del
        }
        return ret;
    });

    // Numeric
    $('.filter-only-numeric').keypress(function (e) {
        var ret;
        if ((e.metaKey || e.ctrlKey) && (e.charCode == 99 || e.charCode == 118)) {
            ret = true;
        }
        else {
            ret = (e.charCode >= 48 && e.charCode <= 57)
                || e.keyCode == 8 //backspace
                || e.keyCode == 9 //tab
                || (e.keyCode == 37 && e.charCode != 37) //left
                || (e.keyCode == 39 && e.charCode != 39) //right
                || (e.keyCode == 46 && e.charCode != 46); //del
        }
        return ret;
    });

    // Trim white spaces in a field
    $('.no-spaces-field').bind('input', function () {
        $(this).val(function (_, v) {
            return v.replace(/\s+/g, '');
        });
    });

});

//Newsletter subscribing
$(document).ready(function () {
    //var cookie = readCookie("newsletter");
    var successMsg = "<h3 class='newsletterSuccess'>" + t('%%You are subscribed to our newsletter%%') + "</h3>";
    var alreadyHereMsg = "<h3 class='newsletterSuccess'>" + t('%%This mail is already subscribed%%') + "</h3>";
    var failMsg = "<h3 class='newsletterFail'>" + t('%%There was a problem subscribing. Please contact our agent if you would like to report a problem%%') + "</h3>";
    var accept = "<label class='text-center error'>" + t('%%You need to accept the terms%%') + "</label>";
    var elementNews = $("#newsletterHolder");
    //if(cookie != null) {
    //    elementNews.html(successMsg);
    //}


    $("#newsletterForm").submit(function (e) {
        e.preventDefault();

        if (window.nlsubmissionblock) {
            return;
        }

        if (!$('#email').valid()) {
            return;
        }

        if (!$('#name').valid()) {
            return;
        }
        /*if(!$('#agreedToNLTerms').prop('checked')){
         if(elementNews.find('label.error').length == 0) {
         elementNews.append(accept);
         return;
         }
         return;
         }*/

        $.ajax({
            url: "/users/newsletter",
            method: "post",
            dataType: 'json',
            data: $('form#newsletterForm').serialize(),
            success: function (data) {
                if (data.success == true) {
                    if (data.alreadySubscribed == true) {
                        elementNews.html(alreadyHereMsg);
                    } else {
                        elementNews.html(successMsg);
                    }

                    createCookie("newsletter", true, 999);
                } else {
                    elementNews.html(failMsg);
                }
            },
            error: function () {
                elementNews.html(failMsg);
            }

        })
    });

    $('.send-button').prop('disabled', true);
    $('#input-value').keyup(function () {
        $('.send-button').prop('disabled', this.value == "" ? true : false);
    })

});

$('.number').unbind('keyup change input paste').bind('keyup change input paste', function (e) {
    var $this = $(this);
    var val = $this.val();
    var valLength = val.length;
    var maxCount = $this.attr('maxlength');
    if (valLength > maxCount) {
        $this.val($this.val().substring(0, maxCount));
    }
});

$('.form-control').on('change blur', function (e) {
    var el = $('#' + e.target.id);
    if (el.val() == '') {
        el.removeClass('valid');

        // remove promo code explain text
        if (e.target.id == 'promoCode') {
            promocodeInvalid();
        }
    }

});

function promocodeInvalid() {
    $('#glpMessage').addClass('hidden');
    $("body").append($('#glpMessage'));

    $("#promoCodeMsg").html('');
}

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

var sliced;
function t(key) {
    sliced = key.slice(2, key.length - 2);
    return decodeURIComponent(translations[encodeURIComponent(sliced).replaceAll("'", "%27")]);

}


function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}


window.jscd = {};
(function (window) {
    {
        var unknown = '-';

        // screen
        var screenSize = '';
        if (screen.width) {
            width = (screen.width) ? screen.width : '';
            height = (screen.height) ? screen.height : '';
            screenSize += '' + width + " x " + height;
        }

        // browser
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browser = navigator.appName;
        var version = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;

        // Opera
        if ((verOffset = nAgt.indexOf('Opera')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Opera Next
        if ((verOffset = nAgt.indexOf('OPR')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 4);
        }
        // MSIE
        else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(verOffset + 5);
        }
        // Chrome
        else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
            browser = 'Chrome';
            version = nAgt.substring(verOffset + 7);
        }
        // Safari
        else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
            browser = 'Safari';
            version = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Firefox
        else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
            browser = 'Firefox';
            version = nAgt.substring(verOffset + 8);
        }
        // MSIE 11+
        else if (nAgt.indexOf('Trident/') != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(nAgt.indexOf('rv:') + 3);
        }
        // Other browsers
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
            browser = nAgt.substring(nameOffset, verOffset);
            version = nAgt.substring(verOffset + 1);
            if (browser.toLowerCase() == browser.toUpperCase()) {
                browser = navigator.appName;
            }
        }
        // trim the version string
        if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

        majorVersion = parseInt('' + version, 10);
        if (isNaN(majorVersion)) {
            version = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        // mobile version
        var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

        // cookie
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;

        if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
            document.cookie = 'testcookie';
            cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
        }

        // system
        var os = unknown;
        var clientStrings = [
            {s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/},
            {s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/},
            {s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/},
            {s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/},
            {s: 'Windows Vista', r: /Windows NT 6.0/},
            {s: 'Windows Server 2003', r: /Windows NT 5.2/},
            {s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/},
            {s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/},
            {s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/},
            {s: 'Windows 98', r: /(Windows 98|Win98)/},
            {s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/},
            {s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
            {s: 'Windows CE', r: /Windows CE/},
            {s: 'Windows 3.11', r: /Win16/},
            {s: 'Android', r: /Android/},
            {s: 'Open BSD', r: /OpenBSD/},
            {s: 'Sun OS', r: /SunOS/},
            {s: 'Linux', r: /(Linux|X11)/},
            {s: 'iOS', r: /(iPhone|iPad|iPod)/},
            {s: 'Mac OS X', r: /Mac OS X/},
            {s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
            {s: 'QNX', r: /QNX/},
            {s: 'UNIX', r: /UNIX/},
            {s: 'BeOS', r: /BeOS/},
            {s: 'OS/2', r: /OS\/2/},
            {s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
        ];
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }

        var osVersion = unknown;

        if (/Windows/.test(os)) {
            osVersion = /Windows (.*)/.exec(os)[1];
            os = 'Windows';
        }

        switch (os) {
            case 'Mac OS X':
                osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'Android':
                osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'iOS':
                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                break;
        }

        // flash (you'll need to include swfobject)
        /* script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js" */
        var flashVersion = 'no check';
        if (typeof swfobject != 'undefined') {
            var fv = swfobject.getFlashPlayerVersion();
            if (fv.major > 0) {
                flashVersion = fv.major + '.' + fv.minor + ' r' + fv.release;
            }
            else {
                flashVersion = unknown;
            }
        }
    }

    window.jscd = {
        screen: screenSize,
        browser: browser,
        browserVersion: version,
        browserMajorVersion: majorVersion,
        mobile: mobile,
        os: os,
        osVersion: osVersion,
        cookies: cookieEnabled,
        flashVersion: flashVersion
    };
}(this));

sendErrorOnError = function () {

    var data = arguments;
    data['url'] = window.location.href;

    var ua = navigator.userAgent, tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    data['browser'] = M.join(' ');
    data['user'] = window.jscd;

    var s = document.createElement("script");
    s.src = '/errorlog.php?line=' + JSON.stringify(data);
    document.body.appendChild(s);
};

if (!window.onerror) {
    window.onerror = function () {
    };
}
var originalFunction = window.onerror;
window.onerror = function () {
    console.log('error detected');
    sendErrorOnError.apply(this, arguments);
    originalFunction.apply(this, arguments);
};

//Trim all fields before validation
(function ($) {

    $.each($.validator.methods, function (key, value) {
        $.validator.methods[key] = function () {
            if (arguments.length > 0) {
                arguments[0] = $.trim(arguments[0]);
            }

            return value.apply(this, arguments);
        };
    });
}(jQuery));

