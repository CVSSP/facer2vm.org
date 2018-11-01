//! wumpus-admin-loader.js
{{- if .IsPage }}

import {admin} from '/assets/js/admin.js'
import {Template} from '/assets/js/template.js'
import * as tpl from '/assets/js/template.js'

const template = Template.build`{{ block "template" . }}{{ end }}`
admin.build(template)

{{- end }}