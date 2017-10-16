/**
 * Created by tino on 4/18/16.
 */

$(document).on(
    'keyup',
    "#name",
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
    "#name",
    function () {
        var match = /[a-zA-Z-\`\[\]\\\}\{\|]/.exec($(this).val());
        if (match) {
            var val = transcribe($(this));
        }
    }
);

$(document).on(
    'focusout',
    "#name",
    function () {
        try {
            var words = $(this).val().split(" ");
            for (i = 0; words.length; i += 1) {
                if (i == 0) {
                    $(this).val(words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase());
                } else {
                    $(this).val($(this).val() + " " + words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase());
                }
            }
        } catch (e) {
        }
    }
);

/*$(document).ready(function(){

    //Newsletter subscribing
    //var cookie = readCookie("newsletter");
    var successMsg = "<h3 class='newsletterSuccess'>" + t('%%You are subscribed to our newsletter%%') + "</h3>";
    var alreadyHereMsg = "<h3 class='newsletterSuccess'>" + t('%%This mail is already subscribed%%') + "</h3>";
    var failMsg = "<h3 class='newsletterFail'>"+t('%%There was a problem subscribing. Please contact our agent if you would like to report a problem%%')+"</h3>";
    var accept = "<label class='text-center error'>" + t('%%You need to accept the terms%%') + "</label>";
    var elementNews = $("#newsletterHolder");
    //if(cookie != null) {
    //    elementNews.html(successMsg);
    //}


    $("#newsletterForm").submit(function(e){
        e.preventDefault();
        if(!$('#email').valid()){
            return;
        }

        $.ajax({
            url: "/users/newsletter",
            method : "post",
            dataType: 'json',
            data: $('form#newsletterForm').serialize(),
            success: function(data){
                if(data.success == true){
                    if(data.alreadySubscribed == true){
                        elementNews.html(alreadyHereMsg);
                    } else {
                        elementNews.html(successMsg);
                    }

                    createCookie("newsletter", true, 999);
                }else{
                    elementNews.html(failMsg);
                }
            },
            error : function(){
                elementNews.html(failMsg);
            }

        })
    });
});*/
