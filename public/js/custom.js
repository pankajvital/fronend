(function ($) {
    "use strict";

   

    //promotional_tour_slider
    $(function() {
        // Owl Carousel
        var owl = $(".promotional_tour_slider");
        owl.owlCarousel({
          items: 4,
          margin: 10,
          loop: true,
          nav: true,
          dots: true,
          responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            }
        }
        });
      });

        
//	Header scroll Height (Background change)
$(window).scroll(function() {

	if ($(document).scrollTop() > 80	) {

		$(".navbar").addClass("customNav");
	} else {

		$(".navbar").removeClass("customNav");
	}
});


    // Slider For category pages / filter price
    if (typeof noUiSlider === 'object') {
        var priceSlider = document.getElementById('price-slider');

        // Check if #price-slider elem is exists if not return
        // to prevent error logs
        if (priceSlider == null) return;

        noUiSlider.create(priceSlider, {
            start: [0, 750],
            connect: true,
            step: 50,
            margin: 200,
            range: {
                'min': 0,
                'max': 1000
            },
            tooltips: true,
            format: wNumb({
                decimals: 0,
                prefix: '$'
            })
        });
    }

}(jQuery));

$(document).ready(function () {
    $('#dashboard_dropdowns').on('click', (function () {
        $('#show_dropdown_item').slideToggle("slow");
    })
    )
});

// OTP Input
document.querySelectorAll(".otSc").forEach(function (otpEl) {
    otpEl.addEventListener("keyup", backSp);
    otpEl.addEventListener("keypress", function () {
        var nexEl = this.nextElementSibling;
        nexEl.focus();
    });
})
function backSp(backKey) {
    if (backKey.keyCode == 8) {
        var prev = this.previousElementSibling.focus()
    }
}

// jQuery(window).on('load', function () { jQuery(".preloader").fadeOut(500); });

