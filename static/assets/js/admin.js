'use strict';

import {Template} from './template.js'

export * from './template.js'

export const admin = {
    template: null,


    build(template) {
        this.template = template
        // install buttons
        console.log('TODO: install buttons.')
        template.activate()
    }
}
