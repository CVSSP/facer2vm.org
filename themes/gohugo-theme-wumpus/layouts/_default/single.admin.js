{{ define "template" -}}
---
title: "${new tpl.StringField('#header .headline')}"
feature_image: "${new tpl.BackgroundImageField('#header')}"
date: "${new tpl.DateField('#header .date')}"
people: ${new tpl.ListField('#header .authors')}
tags: ${new tpl.ListField('#main .tags')}
---

${new tpl.MarkdownField('#main .content')}
{{ end }}