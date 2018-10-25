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

    parseTemplate(template).map(prepareField)

    function parseTemplate(template) {
        return template.match(/`[^`]+`/g).map(function (match) {
            var query = match.substr(1, match.length - 2).split('|')
            return {
                element: document.querySelector(query[0]),
                type: query[1].trim()
            }
        })
    }

    function prepareField(field) {
        if (['text', 'date', 'list', 'markdown'].indexOf(field.type) > -1) {
            field.element.setAttribute('contenteditable', 'true')
        } else if (field.type === 'background-image') {
            // nest a dropTarget, with onlcick file selector.
        }
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

})(Function('return this')())
