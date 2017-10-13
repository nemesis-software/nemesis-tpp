/**
 * Created by tino on 2/29/16.
 */

/*slider dependencies*/
/* SLODER TOOLTIPS */
window.showtooltip = function (param) {

    clickCount = 0;
    maxClickCount = 2;
    var type = param.type;
    var sum = param.sum;
    var datemax = param.datemax;
    var datemin = param.datemin;
    var what = param.what;

    window.hidetooltip();
    var posOf = '';
    if (type == 'sum') {
        $('#msc-old').html('<p>Нови клиенти на Кредисимо могат да вземат заем до 1000 лева със срок на изплащане до 13 месеца.</p>');
        posOf = '#plusAmount';
    }
    else if (type == 'date') {
        posOf = '#plusPeriod';
        var msg = '';

        if (what == 'sum') {
            msg += 'Максималният срок за изплащане беше променен след намаляне на сумата.';
        } else {
            msg += 'Максималният срок за изплащане на суми до ' + sum + ' лв. е ' + datemax + ' месеца.';
        }

        msg += '';
        $('#msc-old').html(msg);
    }
    else if (type == 'datemin') {
        posOf = '#plusPeriod';
        var msg = '<p>';

        if (what == 'sum') {
            msg += 'Минималният срок за изплащане беше променен след увеличаване на сумата.';
        } else {

            if(datemin == 8 && sum >= 2050) {
                msg += 'Минималният срок за изплащане на суми от 2000 лв. до 2500 лв. е ' + datemin + ' месеца.';
            } else if(datemin == 5 && sum >= 1300) {
                msg += 'Минималният срок за изплащане на суми от 1300 лв. до 2000 лв. е ' + datemin + ' месеца.';
            } else if(datemin == 4 && sum <= 1300) {
                msg += 'Минималният срок за изплащане на суми от 1100 лв. до 1300 лв. е ' + datemin + ' месеца.';
            } else {
                msg += 'Минималният срок за изплащане на суми до ' + sum + ' лв. е ' + datemin + ' месеца.';
            }
        }

        msg += '</p>';
        $('#msc-old').html(msg);
    } else if (type == 'egn') {
        var msg = '<p>Нови клиенти на Кредисимо могат да вземат заем до 1000 лева със срок на изплащане до 13 месеца.</p>';
        msg += '<p>Сумата на кредита е променена.</p>';
        $('#msc-old').html(msg);
        posOf = '#social_id';
        maxClickCount = 1;
    }
    else {

        return;
    }

    $('#mousetooltip').addClass('mousetooltip-show');
    $('#mousetooltip').position({
        my: 'center top+6',
        at: 'center bottom',
        of: $(posOf),
        collision: "none"
    });



    var timeout = 5000;
    if (what == 'egn') {
        timeout = 5000;
    }

    if (window.plushidetooltipinterval) {
        return;
    }
    window.plushidetooltipinterval = setInterval(function () {
        if (window.plushidetooltipinterval) {
            clearInterval(window.plushidetooltipinterval);
            window.plushidetooltipinterval = undefined;
            window.hidetooltip();
        }
    }, timeout);

};
window.hidetooltip = function () {
    $('#mousetooltip').removeClass('mousetooltip-show');
}

// check whether salary tab is present on the site
var salaryTab = false;
if($('#salary').length > 0) {
    salaryTab = true;
}

$(document).ready(function() {

    $('#plusAmount, #plusPeriod, #salaryAmount, #salaryPeriod').keypress(function(e) {
        /*var $th = $(this);
        $th.val( $th.val().replace(/[^0-9.]/g, function(str) { return ''; } ) );*/
        var ret;
        if( (e.metaKey || e.ctrlKey) && (e.charCode == 99 || e.charCode == 118) ){
            ret = true;
        }
        else {
            ret= (e.charCode >= 48 && e.charCode <= 57)
                || e.keyCode == 8 //backspace
                || e.keyCode == 9 //tab
                || (e.keyCode == 37 && e.charCode != 37) //left
                || (e.keyCode == 39 && e.charCode != 39) //right
                || (e.keyCode == 46 && e.charCode != 46); //del
        }
        console.log(ret);
        return ret;
    });

    $('#contractFormInitTabs li a[role="tab"]').click(function (e) {
        activeTab = $(this).attr("aria-controls");
        if(activeTab == "plus" && salaryTab){
            var salaryMail = $("#creditFormSalary #email_salary").val();
            var salaryPhone = $("#creditFormSalary #phone_salary").val();

            if(salaryMail.length > 0) {
                $("#creditFormPlus #email_plus").val(salaryMail);
            }
            if(salaryPhone.length > 0) {
                $("#creditFormPlus #phone_plus").val(salaryPhone);
            }
            checkInviteConditions();
            //Update main form time, period and product ID
            $("#amount").val($("#creditFormPlus #plusAmount").val());
            $("#period").val($("#creditFormPlus #plusPeriod").val());
            //$("#productId").val(productId);

        }else{
            var plusMail = $("#creditFormPlus #email_plus").val();
            var plusPhone = $("#creditFormPlus #phone_plus").val();

            if(plusMail.length > 0) {
                $("#creditFormSalary #email_salary").val(plusMail);
            }
            if(plusPhone.length > 0) {
                $("#creditFormSalary #phone_salary").val(plusPhone);
            }

            //Update main form time, period and product ID
            $("#amount").val($("#creditFormSalary #salaryAmount").val());
            $("#period").val($("#creditFormSalary #salaryPeriod").val());

        }


        e.preventDefault()
        $(this).tab('show')
    })


    $(".quickFormOpen").click(function() {
        if(this.id == "openPlus"){
            $('.btn-open-quick-form-plus').addClass('hidden');
            $("#quickFormPlus").removeClass('hidden');
            $('.btn-small-form-plus').removeClass('col-xs-6');
        }else{
            $('.btn-open-quick-form-salary').addClass('hidden');
            $("#quickFormSalary").removeClass('hidden');
            $('.btn-small-form-salary').removeClass('col-xs-6');
        }


    })

    //List all forms needing validation here
    $(":input").change(function(){
        $("#creditFormPlus").validate();
        $("#creditFormSalary").validate();
        checkInviteConditions();
    });



    //INVITE
    function checkInviteConditions(){
        $("#inviteMsg").text("");
        if(invited == 1
            && ($("#"+activeTab+"Amount").val() < 501
            || $("#"+activeTab+"Period").val() < 6)
            && activeTab == 'plus')
        {
            $("#inviteMsg").text(t("%%invite_minimum_message%%")).addClass("error");//Just for test. Remove for production
        }
    }

    checkInviteConditions();
    if(fullForm){
        $(".productSelector ul li ").click(function(e){
            e.preventDefault();
            $.ajax({
                url: "/api/credit/saveTempUserData",
                data : {data: $("#creditForm").serialize()},
                method : "post"
            }).success(function(data){
                //What to do if call was success?
                if(data){
                    window.location = "/"+activeTab;
                }

            });

        });

            // Init InterRate
        $(".ContractPrec").text(generalInterestRate.toFixed(2));
        $(".ContractPrecSlovom").text(slovom(generalInterestRate), false);
        refreshTosNumbers();
    }
    $.validator.addMethod(
        "requiredIfQuickForm",
        function (value, element, arg) {

            if(((activeTab == "plus") && ($("#creditFormPlus").attr("action") == "/credit/init/plus"))
                || ((activeTab == "salary") && ($("#creditFormSalary").attr("action") == "/credit/init/salary")) ) {
                return true;
            }else{
                return value != ''? true : false;
            }


            /*if(activeTab == "plus"){
                console.log('NOOOOOOOOOO');
                if($("#creditFormPlus").attr("action") == "/credit/init/plus"){
                    return true;
                }else{
                    return value != ''? true : false;
                }
            }

            if(activeTab == "salary"){
                return true;
                if($("#creditFormSalary").attr("action") == "/credit/init/salary"){
                    return true;
                }else{
                    return value != ''? true : false;
                }
            }*/
        },
        t("%%Please select correct option%%")
    );

    $("#creditFormPlus").validate({
        rules: {
            email_plus: {
                required: true,
                email: true,
                regexEmail: true,
                remote: {
                    data: {
                        email: function () {
                            return $("#email_plus").val();
                        }
                    },
                    url: "/api/validator/email",
                    type: "post",
                    complete : function(){
                        $("#email_plus").removeClass("distant");
                    }
                }
            },
            phone_plus: {
                required: true,
                minlength: 8,
                remote: {
                    data: {
                        phone: function () {
                            return $("#phone_plus").val();
                        }
                    },
                    url: "/api/validator/phone",
                    type: "post",
                    complete : function(){
                        $("#phone_plus").removeClass("distant");
                    }
                }
            },
            callmeName: {
                minlength: 2,
                lettersonly: true,
                requiredIfQuickForm: true
            },
            callmeFamily: {
                minlength: 2,
                lettersonly: true,
                requiredIfQuickForm: true
            }
        },
        messages: {
            email_plus: {
                required: t("%%Please enter your email address%%"),
                email: t("%%The email format is not recognized%%"),
                remote: t("%%Please check your email address for errors%%")
            },
            phone_plus: {
                required: t("%%Please enter your contact phone%%"),
                minlength: t("%%Phone number length is to short%%"),
                remote: t("%%Phone format is not recognized%%")
            },
            callmeName: {
                required: t("%%Your name is required%%"),
                minlength: t("%%Please enter at least 2 characters.%%"),
                requiredIfQuickForm : t("%%Your name is required for the call%%")
            },
            callmeFamily: {
                required: t("%%Your family name is required%%"),
                minlength: t("%%Please enter at least 2 characters.%%"),
                requiredIfQuickForm : t("%%Your family name is required for the call%%")
            },
        }
    });
    $("#creditFormSalary").validate({
        rules: {
            email_salary: {
                required: true,
                email: true,
                regexEmail: true,
                remote: {
                    data: {
                        email: function () {
                            return $("#email_salary").val();
                        }
                    },
                    url: "/api/validator/email",
                    type: "post",
                    complete : function(){
                        $("#email_salary").removeClass("distant");
                    }
                }
            },
            phone_salary: {
                required: true,
                minlength: 8,
                remote: {
                    data: {
                        phone: function () {
                            return $("#phone_salary").val();
                        },
                    },
                    url: "/api/validator/phone",
                    type: "post",
                    complete : function(){
                        $("#phone_salary").removeClass("distant");
                    }
                }
            },
            callmeName: {
                minlength: 2,
                lettersonly: true,
                requiredIfQuickForm: true
            },
            callmeFamily: {
                minlength: 2,
                lettersonly: true,
                requiredIfQuickForm: true
            }
        },
        messages: {
            email_salary: {
                required: t("%%Please enter your email address%%"),
                email: t("%%The email format is not recognized%%"),
                remote: t("%%Please check your email address for errors%%")
            },
            phone_salary: {
                required: t("%%Please enter your contact phone%%"),
                minlength: t("%%Phone number length is to short%%"),
                remote: t("%%Phone format is not recognized%%")
            },
            callmeName: {
                required: t("%%Your name is required%%"),
                minlength: t("%%Please enter at least 2 characters.%%"),
                requiredIfQuickForm : t("%%Your name is required for the call%%")
            },
            callmeFamily: {
                required: t("%%Your family name is required%%"),
                minlength: t("%%Please enter at least 2 characters.%%"),
                requiredIfQuickForm : t("%%Your family name is required for the call%%")
            },
        }
    });


    /*PLUS amount slider*/
    var plusAmountSlider = document.getElementById("plusAmountSlider");

    if (typeof noUiSlider != 'undefined' && noUiSlider != null) {
        noUiSlider.create(plusAmountSlider, {
            start: plussettings.defaultAmount,
            range: {
                min: plussettings.minAmount,
                max: plussettings.maxAmount
            },
            step: plussettings.amountStep
        });
        /*PLUS period slider*/
        var plusPeriodSlider = document.getElementById("plusPeriodSlider");

        noUiSlider.create(plusPeriodSlider, {
            start: plussettings.defaultPeriod,
            range: {
                min: plussettings.minPeriod,
                max: plussettings.maxPeriod
            },
            step: plussettings.periodStep
        });

        plusAmountSlider.noUiSlider.on('update', function(values, handle) {
            $("#plusAmount").val(1*values[handle]);
        });

        plusPeriodSlider.noUiSlider.on('update', function(values, handle) {
            $("#plusPeriod").val(1*values[handle]);
        });

        plusAmountSlider.noUiSlider.on('set', function(values, handle) {

            //check the min period value
            var amount = values[handle];
            var period = plusPeriodSlider.noUiSlider.get();

            var minPeriod = checkMinPeriod(amount);
            if(period < minPeriod) {
                window.showtooltip({
                    type: 'datemin',
                    sum: amount,
                    datemax: 18,
                    datemin: minPeriod,
                    what: 'sum',
                });
                plusPeriodSlider.noUiSlider.set(minPeriod);
            }

            // check the max period
            var maxPeriod = checkMaxPeriod(amount);
            if(period > maxPeriod[0]) {
                window.showtooltip({
                    type: 'date',
                    sum: amount,
                    datemax: maxPeriod[0],
                    datemin: 3,
                    what: 'sum',
                });
                plusPeriodSlider.noUiSlider.set(maxPeriod[0]);
            }

            $("#plusAmount").val(1*amount);

            if(typeof activeTab != "undefined" && activeTab == "plus") {
                $("#amount").val(1 * values[handle]); //Update hidden fields in main form
            }
            createCookie("plusAmount", 1*amount, 999);
            checkInviteConditions();
            $("#amount").val(1*amount);
            createCookie("plusPeriod", 1*$("#plusPeriod").val(), 999);
            updateTos(this);
        });

        $("#plusAmount").on('change', function(){
            plusAmountSlider.noUiSlider.set( $(this).val() );
        });

        plusPeriodSlider.noUiSlider.on('set', function(values, handle) {

            //check the min period value
            var amount = plusAmountSlider.noUiSlider.get();
            var period = values[handle];

            var minPeriod = checkMinPeriod(amount);
            if(period < minPeriod) {
                //fireTooltip('min', minPeriod);
                window.showtooltip({
                    type: 'datemin',
                    sum: amount,
                    datemax: 18,
                    datemin: minPeriod,
                    what: 'time',
                });

                period = minPeriod;
                plusPeriodSlider.noUiSlider.set(period*1);

            }

            // check the max period
            var maxPeriod = checkMaxPeriod(amount);
            if(period > maxPeriod[0]) {
                //fireTooltip('max', maxPeriod);
                window.showtooltip({
                    type: 'date',
                    sum: maxPeriod[1],
                    datemax: maxPeriod[0],
                    datemin: 3,
                    what: 'time',
                });
                period = maxPeriod[0];
                plusPeriodSlider.noUiSlider.set(period*1);
            }

            $("#plusPeriod").val(1*period);

            createCookie("plusPeriod", 1*period, 999);
            checkInviteConditions();
            $("#period").val(1*period);

            createCookie("plusAmount", 1*$("#plusAmount").val(), 999);
            if(typeof activeTab != "undefined" && activeTab == "plus") {
                $("#period").val(1 * period); //Update hidden fields in main form
            }
            updateTos(this);
            // plusPeriodSlider.noUiSlider.end();
        });

    }

    /*function fireTooltip(type, period){
        if(type == 'min'){
            message = 'Минималният срок за изплащане на суми до 2000 лв. е 5 месеца.';
        }
        else if (type == 'max') {

        }
    }*/

    function checkMinPeriod(sum){
        if(sum > 2000){
            return 8;
        }
        if(sum > 1300){
            return 5;
        }
        else if(sum > 1100) {
            return 4;
        }
        return 3;
    }

    function checkMaxPeriod(sum){
        if (sum > 2000) {
            return [24,2500];
        }
        if (sum > 1500) {
            return [18,2000];
        }
        else if(sum > 1300){
            return [16,1500];
        }
        else if(sum > 1100){
            return [15,1300];
        }
        return [13,1100];
    }

    $("#plusPeriod").on('change', function(){
        plusPeriodSlider.noUiSlider.set( $(this).val() );
    })

    if(salaryTab) {
        /*Salary amount slider*/
        var salaryAmountSlider = document.getElementById("salaryAmountSlider");

        noUiSlider.create(salaryAmountSlider, {
            start: salarysettings.defaultAmount,
            range: {
                min: salarysettings.minAmount,
                max: salarysettings.maxAmount
            },
            step: salarysettings.amountStep
        });
        /*Salary period slider*/
        var salaryPeriodSlider = document.getElementById("salaryPeriodSlider");

        noUiSlider.create(salaryPeriodSlider, {
            start: salarysettings.defaultPeriod,
            range: {
                min: salarysettings.minPeriod,
                max: salarysettings.maxPeriod
            },
            step: salarysettings.periodStep
        });

        $("#salaryAmount").on('change', function () {
            salaryAmountSlider.noUiSlider.set($(this).val());
        });

        $("#salaryPeriod").on('change', function () {
            salaryPeriodSlider.noUiSlider.set($(this).val());
        });

        salaryAmountSlider.noUiSlider.on('update', function (values, handle) {
            $("#salaryAmount").val(1 * values[handle]);
        });

        salaryPeriodSlider.noUiSlider.on('update', function (values, handle) {
            $("#salaryPeriod").val(1 * values[handle]);
            $('#salaryDateOut').html(paymentDate(values[handle]));
        });


        salaryAmountSlider.noUiSlider.on('set', function (values, handle) {
            $("#salaryAmount").val(1 * values[handle]);

            createCookie("salaryAmount", 1 * values[handle], 999);
            $("#amount").val(1 * values[handle]);
            createCookie("salaryPeriod", 1 * $("#salaryPeriod").val(), 999);
            if (typeof activeTab != "undefined" && activeTab == "salary") {

                $("#amount").val(1 * values[handle]); //Update hidden fields in main form
            }
            updateTos(this);
        });

        salaryPeriodSlider.noUiSlider.on('set', function (values, handle) {
            $("#salaryPeriod").val(1 * values[handle]);

            createCookie("salaryPeriod", 1 * values[handle], 999);
            $("#period").val(1 * values[handle]);
            createCookie("salaryAmount", 1 * $("#salaryAmount").val(), 999);
            if (typeof activeTab != "undefined" && activeTab == "salary") {
                $("#period").val(1 * values[handle]);//Update hidden fields in main form
            }

            $('#salaryDateOut').html(paymentDate(values[handle]));
            updateTos(this);
        });

        $('#salaryDateOut').html(paymentDate($('#salaryPeriod').val()));
    }

    // Update Payment table if first payment date changes
    $("#paymentDueDate").on('change', function () {
        updateTos(this);
    })
});

function updateTos(el){
     if(typeof productId != 'undefined') {
        refreshTosNumbers();
    }
/*
    if(el.target.id.search("Amount") != -1){
        $(".ContractAmountTOS").text(el.get());
    }else{
        $(".ContractPeriodTOS").text(1*el.get());
    }*/
}


var lihva;
var contractPeriod;
var contractSum;
function refreshTosNumbers()
{
    // Update TOS sum and period
    $(".ContractAmountTOS").text($.number( $("#"+activeTab+"Amount").val(), 0, '.', ' ' ));
    $(".ContractAmountSlovom").text(slovom($("#"+activeTab+"Amount").val(), true));
    $(".ContractPeriodTOS").text($("#"+activeTab+"Period").val())
    $(".ContractPeriodSlovom").text(slovom($("#"+activeTab+"Period").val(), false));

    if(productId == 0){//plus
         lihva = window.pluspercent();
         contractPeriod = $("#plusPeriod").val()*1;
         contractSum = $("#plusAmount").val()*1;
         tax2 = window.EXCELPMT(lihva, contractPeriod, contractSum).toFixed(2);

        $(".ContractTotal").text($.number( tax2*contractPeriod, 2, '.', ' ' ) /*(tax2*contractPeriod).toFixed(2)*/);
        $(".ContractTotalSlovom").text(slovom((tax2*contractPeriod).toFixed(2), true));
        $(".ContractPmt").text(tax2);
        $(".ContractPmtSlovom").text(slovom(tax2, true));
        paymentTable(tax2, contractPeriod, $("#paymentDueDate").val());

    }else{
         contractPeriod = $("#salaryPeriod").val()*1;
         contractSum = $("#salaryAmount").val()*1;
        var paymentDate;

        var ContractTotal = contractSum+((((generalInterestRate*contractSum*contractPeriod)/360)/100).toFixed(2))*1;
        var PayAmount = Math.floor((((generalInterestRate*contractSum*contractPeriod)/360)));
        ContractTotal = contractSum + PayAmount/100;

        $(".ContractTotal").text(ContractTotal);
        $(".ContractTotalSlovom").text(slovom(ContractTotal, true));
        $(".ContractPmt").text(ContractTotal);
        $(".ContractPmtSlovom").text(slovom(ContractTotal, true));
        paymentDate = new Date();
        paymentDate.setDate(paymentDate.getDate() + contractPeriod * 1);
        var dd = paymentDate.getDate();
        var mm = paymentDate.getMonth() + 1;
        var y = paymentDate.getFullYear();

        var FormattedDate = twoDigitString(dd) + '.'+ twoDigitString(mm) + '.'+ y;
        $(".ContractPadej").text(FormattedDate);
        $("#pmtplan").html("1. "+ContractTotal+"   "+FormattedDate);
    }
    var contractApr = calculateApr(contractSum, contractPeriod, generalInterestRate, productId);
    // TODO: dirty hack
    if(contractApr > 50) {
        contractApr = 50.00;
    }
    $(".ContractAPR").text(contractApr);
    $(".ContractAPRSlovom").text(slovom(contractApr));

}

function paymentTable(amount, period, firstPaymentDate) {
    $('#pmtplan').empty();
    if(firstPaymentDate == "-1"){
        $("#pmtplan").html(t('%%Please select first payment date for the plan%%'));
        return;
    }
    var tbl = $('<table></table>').attr({style: 'width: 200px; white-space: nowrap; border: 0px; border-spacing: 5px; border-collapse: separate;'});
    var row = $('<tr></tr>').appendTo(tbl);
    $('<td></td>').text("#").appendTo(row);
    $('<td></td>').text("Падеж").appendTo(row);
    $('<td></td>').text("Вноска").appendTo(row);

    var d = new Date(firstPaymentDate);
    period = 1 * period;

    var date = new Date(d);
    var dd = parseInt(date.getDate());
    var mm = parseInt(date.getMonth());
    var y = parseInt(date.getFullYear());
    var periodDate;

    // not a good idea to init vars in loops, and working with properties (especially for repeated data)
    // mostly math shit for dates, that is not totally OK, but better as performance
    for (var i = 1; i < period + 1; i++) {
       // br = br + 1;
         row = $('<tr></tr>').appendTo(tbl);
        $('<td></td>').text(i).appendTo(row);
         mm += 1;
        // if month goes over 12 - go to next year
        if(mm > '12') {
            mm = 1;
            y += 1;
        }

        var FormattedDate = twoDigitString(dd) + '.'+ twoDigitString(mm) + '.'+ y;
        if(dd >= 28) {
            periodDate = new Date(y, mm, 0);
            FormattedDate = twoDigitString(periodDate.getDate()) + '.'+ twoDigitString(mm) + '.'+ y;
        }

        $('<td></td>').text(FormattedDate).appendTo(row);
        $('<td></td>')/*.attr({style: 'text-align: right'})*/.text(amount + ' лв.').appendTo(row);
    }

    $("#pmtplan").html(tbl);
}

function paymentDate(period){
    var a = new Date(), b = 1 * period, c = 1 * a.getDate();
    a.setDate(c + b);
    var d = a.getDate();
    var e = a.getMonth() + 1;
    var f = a.getFullYear();
    return twoDigitString(d) + "." + twoDigitString(e) + "." + f + " г."
}

function twoDigitString(val){
    var strVal = "" + val;
    if(strVal.length < 2) return "0" + strVal;
    return strVal;
}




function scrollToSocialID(t){

    var scrollHeight = $("#social_id").offset().top - t;
    $('html, body').animate({
        scrollTop: scrollHeight
    }, 500);
};



function submitQuickForm(){

     if($('#quickFormPlus').hasClass('hidden') && $('#quickFormSalary').hasClass('hidden')) {
        return;
    }

    console.log('submitQuickForm');


    // for some reason, some time when load homepage activeTab is not initialized unless changing Tabs.
    // this is quick fix for Call me form
    if(!activeTab) {
        activeTab = 'plus';
    }

    if(activeTab == 'salary') {
        $("#creditFormSalary").attr("action", "/credit/callme");
        // disable "Call me" button
        if($("#creditFormPlus").valid()) {
            $('#creditFormSalary button').addClass('disabled');
        }
    }

    if(activeTab == 'plus') {
        $("#creditFormPlus").attr("action", "/credit/callme");
        console.log($("#creditFormPlus").valid());
        // disable "Call me" button
        if($("#creditFormPlus").valid()) {
            $('#quickFormPlus button').addClass('disabled');
        }
    }
}

function submitInitForm(){
    if(activeTab == 'salary') {
        $("#creditFormSalary").attr("action", "/credit/init/salary");

    }

    if(activeTab == 'plus') {
        $("#creditFormPlus").attr("action", "/credit/init/plus");
    }
}
