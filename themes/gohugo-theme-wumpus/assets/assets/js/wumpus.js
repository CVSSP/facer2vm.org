jQuery(function($) {

    var htmlClass = document.querySelector('html').classList

	/* ======================================================================
	   Colouring the nav buttons.
	   ====================================================================== */

    function buildNavButtons() {
        var cls = htmlClass;
        var lastRatio = 0

        var callback = function(entries) {
            var ratio = entries[0].intersectionRatio
            cls.toggle('cover-active', ratio > lastRatio)
            lastRatio = ratio
        }

        var options = {threshold: 0.1}
        var observer = new IntersectionObserver(callback, options)
        observer.observe(document.querySelector('#header'))
    }

    if ('IntersectionObserver' in window) {
        if (document.querySelector('body.has-cover')) {
            buildNavButtons()
        }
    }

    /* ======================================================================
       Menu open / close.
       ====================================================================== */

    function buildMenu() {
        var cls = htmlClass;
        var check = document.querySelector('#menu-switch')

        var callback = function() {
            cls.toggle('menu-active', check.checked)
        }

        check.addEventListener('change', callback)
    }

    buildMenu()

	/* ==========================================================================
	   Gallery
	   ========================================================================== */

	function gallery() {
		var images = document.querySelectorAll('.kg-gallery-image img');
		images.forEach(function (image) {
			var container = image.closest('.kg-gallery-image');
			var width = image.attributes.width.value;
			var height = image.attributes.height.value;
			var ratio = width / height;
			container.style.flex = ratio + ' 1 0%';
		});
	}
	gallery();

	/* ==========================================================================
	   Style code blocks with highlight and numbered lines
	   ========================================================================== */

	function codestyling() {
		$('pre code').each(function(i, e) {
			hljs.highlightBlock(e);

			if(!$(this).hasClass('language-text')) {
				var code = $(this);
				var lines = code.html().split(/\n/).length;
				var numbers = [];
				for (i = 1; i < lines; i++) {
					numbers += '<span class="line">' + i + '</span>';
				}
				code.parent().append('<div class="lines">' + numbers + '</div>');
			}
		});
	}
	codestyling();

	/* ==========================================================================
	   Responsive Videos with Fitvids
	   ========================================================================== */

	function video() {
		$('#wrapper').fitVids();
	}
	video();

	/* ==========================================================================
	   Initialize and load Disqus
	   ========================================================================== */

	if (typeof disqus === 'undefined') {
		$('.post-comments').css({
			'display' : 'none'
		});
	} else {
		$('#show-disqus').on('click', function() {
			$.ajax({
				type: "GET",
				url: "//" + disqus + ".disqus.com/embed.js",
				dataType: "script",
				cache: true
			});
			$(this).parent().addClass('activated');
		});
	}
});
