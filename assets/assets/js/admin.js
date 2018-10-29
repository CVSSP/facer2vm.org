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
                v.push(strings[i])
                v.push(field.toString())
            })
            v.push(strings[strings.length - 1])
            return v.join('')
        }

        static build(strings, ...fields) {
            return new Template(strings, ...fields)
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

    // class Admin {
        // constructor(template) {
            // document.body.classList.add('admin')
            // this.template = template
            
            
            // // For background-image nest a dropTarget, with onlcick file selector.
            // document.execCommand("defaultParagraphSeparator", false, "p");
        // }
    // }

/* ===========================================================================
   Normal page code
   =========================================================================== */
    // TODO: make window.Admin a Promise instead of create.

    if (window.Admin === undefined) {
        window.Admin = {}
    }

    window.Admin.create = (admin_script = '/assets/js/admin.js') => {
        const self = this

        const waitForKey = new Promise(resolve => {
            // Wait for the magic key combo.
            document.addEventListener('keydown', (event) => {
                if (event.altKey && event.key === 'e') {
                    event.preventDefault()
                    resolve()
                }
            })
        })

        const load = url => new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.setAttribute('src', url)
            script.addEventListener('load', evt => {
                resolve(self)
            })
            script.addEventListener('error', reject)
            document.head.appendChild(script)
        })

        return waitForKey.then(() => load(admin_script))
    }

/* ===========================================================================
   Single page code
   =========================================================================== */

    const admin_src = ''

    window.Admin.create(admin_src)
    .then(admin => {
        admin.setup(Template.build`---
title: "${new StringField('#header .headline')}"
feature_image: "${new BackgroundImageField('#header')}"
date: "${new DateField('#header .date')}"
people: ${new ListField('#header .authors')}
tags: ${new ListField('#main .tags')}
---

${new MarkdownField('#main .content')}`)
    })
    .catch(err => {
        console.log('Failed to load the admin.', err)
    })


})(Function('return this')())
