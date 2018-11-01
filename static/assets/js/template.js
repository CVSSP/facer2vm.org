import {TurndownService} from './lib/turndown.js';
import {moment} from './lib/moment.js';


export class Template {
    constructor(strings, ...fields) {
        this.strings = strings
        this.fields = fields
    }

    activate() {
        this.fields.forEach(item => item.activate())
    }

    deactivate() {
        this.fields.forEach(item => item.deactivate())
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
    }

    activate() {
        this.element.setAttribute('contenteditable', 'true')
    }

    deactivate() {
        this.element.setAttribute('contenteditable', 'false')
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

export class BackgroundImageField extends Template.Field {
    activate() {
    }

    deactivate() {
    }
}

export class DateField extends Template.Field {
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

export class ListField extends Template.Field {
    toString() {
        const items = this.value
        const separator = '\n- '
        return items.length ? items.join(separator).substr(1) : ''
    }

    get value() {
        return this.element.textContent.replace(/\s+/g, ' ').split(/\s*,\s*/g)
    }
}

export class MarkdownField extends Template.Field {
    constructor(selector) {
        super(selector)
        this.turndownService = new TurndownService()
    }

    get value() {
        const markdown = this.turndownService.turndown(this.element)
        return markdown
    }
}

export class StringField extends Template.Field {
    get value() {
        return this.element.textContent.replace(/\s+/g, ' ').trim()
    }
}
