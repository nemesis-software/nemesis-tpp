                   {
                      "@context": "http://schema.org",
                      "@graph": [
                            {
                                "@type": "Website",
                                "name": "Credissimo",
                                "inLanguage": "bg",
                                "url": "https://credissimo.bg/",
                                "potentialAction": {
                                    "@type": "SearchAction",
                                    "target": "https://credissimo.bg/search?q={search_term_string}",
                                    "query-input": "required name=search_term_string"
                                  }
                            },{
                        "@type": "Organization",
                        "@id" : "#Credissimo",
                        "name": "Credissimo",
                        "description" : "Кредисимо е динамична високотехнологична компания и е една от най-бързо развиващите се FinTech /ФинТек/ структури в небанковия финансов сектор. Като небанкова финансова институция предоставяме на нашите потребители бързи и лесни решения при възникнала потребност от краткосрочно финансиране. Като високотехнологична компания се стремим постоянно да разработваме и внедряваме иновативни услуги, адекватни на бързо развиващия се дигитален свят.Кредисимо е преди всичко потребителски ориентирана компания. Всички наши решения са в отговор на потребностите и желанията на нашите потребители. Водени от желанието да сме максимално полезни и удобни за всеки потребител, ние първи в България предложихме изцяло онлайн заявяване на кредит, както и одобрение в рамките на минути.Кредисимо е член основател на Асоциацията за Отговорно Небанково Кредитиране (АОНК) - обединяваща фирмите за небанково кредитиране около единни етични правила за защита на потребителите. Като член на АОНК, от 2014 г. ние активно работим за спазването на утвърдените добри практики във взаимоотношенията с потребителите и налагането им като пазарна норма.",
                        "sameAs" : [
                                    "https://www.facebook.com/credissimo.bg",
                                    "https://plus.google.com/+%D0%9A%D1%80%D0%B5%D0%B4%D0%B8%D1%81%D0%B8%D0%BC%D0%BE?rel=publisher",
                                    "https://twitter.com/credissimo",
                                    "https://www.pinterest.com/credissimo",
                                    "https://foursquare.com/p/credissimo-plc-%D0%BA%D1%80%D0%B5%D0%B4%D0%B8%D1%81%D0%B8%D0%BC%D0%BE-%D0%B0%D0%B4/347233048",
                                    "",
                                    ""
                                   ],
                        "contactPoint" :
                            [{ "@type" : "ContactPoint",
                              "telephone" : "+359 700 12 012",
                              "contactType" : "Customer service",
                              "contactOption" : "TollFree",
                              "areaServed" : "BG",
                              "productSupported" : "Credissimo плюс, Credissimo до заплата"
                            }],
                        "logo" : {
                                    "@type" : "ImageObject",
                                    "url" : "https://credissimo.bg/frontend/images/credissimoLogo.jpg",
                                    "width" : "193",
                                    "height" : "46"
                                 },
                        "url" : "https://credissimo.bg"

                    },
                          [{

                            "@type" : "LoanOrCredit",
                             "name" : "Credissimo до заплата",
                               "provider" : {
                                                "@id" : "#Credissimo"
                                              },
                            "amount" : {
                                        "@type" : "MonetaryAmount",
                                        "currency" : "BGN",
                                        "maxValue" : 600,
                                        "minValue" : 100
                                        },
                            "loanTerm" : {
                                            "@type" : "QuantitativeValue",
                                            "maxValue" : 30,
                                            "minValue" : 15,
                                            "unitText" : "дни"
                                          }
                            }
                            ,

                            {
                            "@type" : "LoanOrCredit",
                            "name" : "Credissimo плюс",
                            "provider" : {
                                "@id" : "#Credissimo"
                            },
                            "amount" : {
                                        "@type" : "MonetaryAmount",
                                        "currency" : "BGN",
                                        "maxValue" : 2000,
                                        "minValue" : 200
                                        },
                            "loanTerm" : {
                                            "@type" : "QuantitativeValue",
                                            "maxValue" : 18,
                                            "minValue" : 3,
                                            "unitText" : "месеци"
                                          }

                            }


                          ]

                          ]
                    }


    var invited = 0;
    invited = 0;
    var fullForm = '';



    var activeTab = "plus";


   /*$(function(){*/
    var plussettings = new Object();
    plussettings.minAmount = 200;
    plussettings.maxAmount = 2500;
    plussettings.defaultAmount = 200;
    plussettings.amountStep = 50;
    plussettings.minPeriod = 3;
    plussettings.maxPeriod = 24;
    plussettings.periodStep = 1;
    plussettings.defaultPeriod = 3;

    var salarysettings = new Object();
    salarysettings.minAmount = 100;
    salarysettings.maxAmount = 600;
    salarysettings.defaultAmount = 600;
    salarysettings.amountStep = 50;
    salarysettings.minPeriod = 15;
    salarysettings.maxPeriod = 30;
    salarysettings.periodStep = 1;
    salarysettings.defaultPeriod = 15;
    /*})();*/


    function scrollToSocialID(t) {

        var scrollHeight = $("#social_id").offset().top - t;
        $('html, body').animate({
            scrollTop: scrollHeight
        }, 500);
    }

if (window.location.href.indexOf("d_aid")>-1) document.write(unescape("%3Cscript id='doaffiliate' src='" + (("https:" == document.location.protocol) ? "https://" : "http://") + "tracker2.doaffiliate.net/js/doaffclick.js' type='text/javascript'%3E%3C/script%3E"));


