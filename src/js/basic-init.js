$(document).ready(function () {
    'use strict';

    const is_mobile = isMobile();

    if (is_mobile) {
        document.querySelector('body').classList.add('is-mobile');

        // language-switch show/hide
        let languageSwitch = $('.language-switch');

        languageSwitch.on('click', function () {
            $(this).toggleClass('language-switch--open');
        });

        $(document).click(function(event) {
            let $target = $(event.target);
            if(!$target.closest('.language-switch').length &&
                languageSwitch.is(":visible")) {
                languageSwitch.removeClass('language-switch--open');
            }
        });
    }

    // show/hide mobile menu
    $('.main-header__hamburger').on('click', function () {
        $('html').toggleClass('show-main-nav');
    });

    $('.main-header__menu a').on('click', function () {
        $('html').removeClass('show-main-nav');
    });

    // smooth page scrolling
    $('.scrollto').click(function () {
        var elementClick = '#'+$(this).attr('href').split('#')[1];
        var destination = $(elementClick).offset().top;
        jQuery('html:not(:animated),body:not(:animated)').animate({scrollTop: destination}, 800);
        return false;
    });

    if (!is_mobile) {
        // parallax bg
        let $window = $(window);

        $('[data-type="background"]').each(function() {
            let $bgobj = $(this);

            $(window).scroll(function() {
                let yPos = -($window.scrollTop() / $bgobj.data('speed'));
                let coords = '50% '+ yPos + 'px';

                $bgobj.css({ backgroundPosition: coords });
            });
        });

        // parallax astrology
        let astrology = document.querySelector('.offer-index__astrology');
        let parallaxAstrology = new Parallax(astrology, {
            limitY: 0,
            invertX: false
        });

        // parallax clouds
        let clouds = document.querySelectorAll('.clouds');
        clouds.forEach(function (cloudsItem) {
            let parallaxClouds = new Parallax(cloudsItem, {
                limitY: 0,
            });
        });

        // parallax about stars
        let aboutStars = document.querySelector('.about__stars-box');
        let parallaxAboutStars = new Parallax(aboutStars, {
            limitX: 190,
            invertX: false
        });

        // parallax contacts cloud
        let contactsCloud = document.querySelector('.contacts__cloud-box');
        let parallaxContactsCloud = new Parallax(contactsCloud, {
        });

        // parallax contacts stars
        let contactsStars = document.querySelector('.contacts__stars-box');
        let parallaxContactsStars = new Parallax(contactsStars, {
            invertX: false
        });

        // parallax contacts space
        let limitX = (window.innerWidth > 1800) ? 30 : false;
        let contactsSpace = document.querySelector('.contacts__space-box');
        let parallaxContactsSpace = new Parallax(contactsSpace, {
            limitX: limitX,
            invertX: false
        });
    }

    // modal
    let modalOrder = $('.modal-order');

    modalOrder.on('shown.bs.modal', function () {
        $(this).find('.modal-order__item:first-child .modal-order__field').trigger('focus');
    });


    ////////////////////////////////////////////////////////////////////////////
    // FORM PROCESSING

    $('[data-submit]').on('click', function(e) {
        e.preventDefault();
        $(this).parent('form').submit();
    });

    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            let re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your details"
    );

    function valEl(el) {
        let validator = el.validate({
            rules:{
                name:{
                    required:true
                },
                email:{
                    required:true
                },
                phone:{
                    required:true,
                    regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
                }
            },
            messages:{
                name:{
                    required: validationForm['form_valid_required']
                },
                email:{
                    required: validationForm['form_valid_required'],
                    email: validationForm['form_valid_wrong_email']
                },
                phone:{
                    required: validationForm['form_valid_required'],
                    regex: 'Неправильный формат телефона'
                }
            },
            submitHandler: function (form) {
                $('.modal-order').modal('hide');
                $('.loader').fadeIn();
                let $form = $(form);

                $.ajax({
                    type: 'POST',
                    url: templateUrl + '/' + $form.attr('action'),
                    data: $form.serialize(),
                })
                    .always(function (response) {
                        setTimeout(function () {
                            $('.loader').fadeOut();
                        },800);
                        setTimeout(function () {
                            $('.modal-thanks').modal('show');
                        },1100);
                    });

                return false;
            }
        });
    }

    $('.js-form').each(function() {
        valEl( $(this) );
    });

    ////////////////////////////////////////////////////////////////////////////

    function isMobile() {
        return $.browser.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    }

    function numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
}); // end ready
