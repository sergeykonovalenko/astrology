$(document).ready(function () {
    'use strict';

    const is_mobile = isMobile();

    if (is_mobile) {
        document.querySelector("body").classList.add('is-mobile');
    }

    // parallax
    let scene = document.querySelectorAll('.scene');
    scene.forEach(function (sceneItem) {
        let parallaxScene = new Parallax(sceneItem, {

        });
    });


    // masked input
    $('input[type="tel"]').mask('+44 (0) 99-9999-99-99');


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
                    required:'Required field'
                },
                email:{
                    required:'Required field',
                    email:'Wrong email format'
                },
                phone:{
                    required:'Required field',
                    regex:'Wrong phone format'
                }
            },
            submitHandler: function (form) {
                $('.modal-order').modal('hide');
                $('.loader').fadeIn();
                let $form = $(form);
                let $formId = $(form).attr('data-id');

                $.ajax({
                    type: 'POST',
                    url: $form.attr('action'),
                    data: $form.serialize(),
                })
                    .always(function (response) {
                        setTimeout(function () {
                            $('.loader').fadeOut();
                        },800);
                        setTimeout(function () {
                            $('.modal-thanks').modal('show');
                            $( 'input:not([type="hidden"]), textarea' ).val('');
                            $('.form-extra__item').removeClass('form-extra__item--should-float');
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
