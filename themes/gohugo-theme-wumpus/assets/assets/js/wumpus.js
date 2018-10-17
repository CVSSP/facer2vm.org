(function() {

    var htmlClass = document.querySelector('html').classList

	/* ======================================================================
	   Colouring the nav buttons.
	   ====================================================================== */

    function buildNavButtons() {
        var cls = htmlClass;
        var lastRatio = 0
		var squealer = document.querySelector('#squealer')

        var callback = function(entries) {
            var ratio = entries[0].intersectionRatio
            cls.toggle('cover-active', ratio > lastRatio)
            lastRatio = ratio
        }

		if (squealer) {
			var observer = new IntersectionObserver(callback)
			observer.observe(squealer)
		}
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

})();
