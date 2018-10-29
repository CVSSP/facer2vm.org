(function (window, undefined) {
    'use strict';

/*

A Field, sits on an element and emits its value.

A Template, creates a specific .md file by filling in values.

A TemplateBuilder, defines a Template and offers configuration to bind its
                   fields to specified HTML elements.

*/

    class Template {
        constructor(strings, ...fields) {
            this.strings = strings
            this.fields = fields
        }

        toString() {
            return this.value.toString()
        }

        get value() {
            const strings = this.strings.raw
            let v = []

            this.fields.forEach(function(field, i) {
                v.push(strings[i] + field.toString())
            })
            v.push(strings[strings.length - 1])
            return v.join('')
        }
    }

    Template.Field = class Field {
        constructor(selector) {
            this.element = document.querySelector(selector)
            this.initialize()
        }

        initialize() {
            this.element.setAttribute('contenteditable', 'true')
        }

        isValid() {
            return true
        }

        toString() {
            return this.value.toString()
        }

        get value() {
            return this.element.innerHTML
        }
    }

    class BackgroundImageField extends Template.Field {
    }

    class DateField extends Template.Field {
        constructor(selector, format = 'D MMM Y h:s:s a', invalidValue = '') {
            super(selector)
            this.format = format
            this.invalidValue = invalidValue
        }

        isValid() {
            return this.value.isValid()
        }

        toString() {
            let value = this.value
            return value.isValid() ? value.format() : this.invalidValue
        }

        get value() {
            return moment(this.element.textContent, this.format)
        }
    }

    class ListField extends Template.Field {
    }

    class MarkdownField extends Template.Field {
        constructor(selector) {
            super(selector)
            this.turndownService = new TurndownService()
        }

        get value() {
            const markdown = this.turndownService.turndown(this.element)
            return markdown
        }
    }

    class StringField extends Template.Field {
        get value() {
            return this.element.textContent.replace(/\s+/g, ' ').trim()
        }
    }

    class TemplateBuilder {
        build(strings, ...fields) {
            return new Template(strings, ...fields)
        }
    }

    class PageTemplate extends TemplateBuilder {
        constructor(config = {}) {
            super()
            const default_config = {
                title: '#header .headline',
                feature_image: '#header',
                date: '#header .date',
                people: '#header .authors',
                tags: '#main .tags',
                body: '#main .content',
            }
            this.config = {...default_config, ...config}
        }

        build() {
            const c = this.config
            return super.build`---
title: "${new StringField(c.title)}"
feature_image: "${new BackgroundImageField(c.feature_image)}"
date: "${new DateField(c.date)}"
people: ${new ListField(c.people)}
tags: ${new ListField(c.tags)}
---

${new MarkdownField(c.body)}`
        }
    }

    const templates = {
        'posts': new PageTemplate(),
        'people': new PageTemplate(),
        'companies': new PageTemplate(),
        'groups': new PageTemplate(),
        'tags': new PageTemplate(),
    }
    templates.posts.build()


    //setInterval(function(){ console.log(page.toString()) }, 10000)

// For background-image nest a dropTarget, with onlcick file selector.
document.execCommand("defaultParagraphSeparator", false, "p");


})(Function('return this')())
