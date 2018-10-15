---
title: {{ replaceRE ".*?([^/\\\\]+).$" "$1" .Dir | humanize | title }}
url: /the/{{ replaceRE ".*?([^/\\\\]+).$" "$1" .Dir }}
feature_image: "{{ .Site.Params.feature_image }}"
---
