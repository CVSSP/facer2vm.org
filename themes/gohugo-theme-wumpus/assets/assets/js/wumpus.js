(function(window, undefined) {
    'use strict';

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

	/* ======================================================================
	   Social sharing buttons.
	   ====================================================================== */

    function buildShareButtons() {
        var opts = {
            '.twitter': ['twitter-share', 'width=550,height=235'],
            '.facebook': ['facebook-share','width=580,height=296'],
            '.googleplus': ['google-plus-share', 'width=490,height=530'],
        }
        var button
        var parent_node = document.querySelector('.social')

        if (parent_node) {
            for (var query in opts) {
                button = parent_node.querySelector(query)
                if (button) {
                    addListener(button, opts[query][0], opts[query][1])
                }
            }
        }

        function addListener(elm, window_name, window_features) {
            elm.addEventListener('click', function(evt) {
                var win = window.open('', window_name, window_features)
                win.opener = null
                win.location.replace(elm.href)
                evt.returnValue = false
            })
        }
    }

    buildShareButtons()

    /* ======================================================================
       Structured data (JSON-LD).
       ====================================================================== */

    function embedJsonLd() {
        var meta = document.querySelector('link[type="application/ld+json"]')
        var request

        if (meta) {
            request = new XMLHttpRequest()
            request.addEventListener('load', embedData)
            request.open('GET', meta.href)
            request.send()
        }

        function embedData() {
            var script = document.createElement('script')
            script.setAttribute('type', meta.type)
            script.appendChild(document.createTextNode(this.responseText))
            document.head.appendChild(script)
        }
    }

    embedJsonLd()

	/* ======================================================================
	   The Wumpus admin.
	   ====================================================================== */

    function enableAdminLoader() {
        var meta = document.querySelector('link[rel="admin"][type="application/javascript"]')
        var script = document.createElement('script')
        script.setAttribute('type', 'module')
        script.setAttribute('src', meta.href)
        document.head.appendChild(script)
    }

    function waitForKey(key, callback) {
        document.addEventListener('keydown', listener)

        function listener(event) {
            if (isTargetKey(event)) {
                event.preventDefault()
                callback()
                document.removeEventListener('keydown', listener)
            }
        }
        function isTargetKey(event) {
            return Object.keys(key).every(function(prop) {
                return event[prop] === key[prop]
            })
        }
    }

    waitForKey({key: 'e', altKey: true}, enableAdminLoader)

})(Function('return this')());
