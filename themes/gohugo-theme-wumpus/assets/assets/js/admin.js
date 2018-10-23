(function (window, undefined) {
    'use strict';

    var template = '---\
title: `#header .headline | text`\
feature_image: `#header | background-image`\
date: `#header .date | date`\
people: `#header .authors | list`\
tags: `#main .tags | list`\
---\
\
`#main .content | markdown`'

    function parseTemplate() {
        
    }

    function getValue(elm, type) {
    }
    
    function getValueText(elm) {
        return elm.textContent
    }
    
    function getValueBackgrounImage(elm) {
    }
    
    function getValueDate(elm) {
    }
    
    function getValueList(elm) {
    }

    function makePageEditable(template) {
        
    }

}(Function('return this')())
