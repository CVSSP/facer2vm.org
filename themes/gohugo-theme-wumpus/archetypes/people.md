---
name: {{ replaceRE ".*?([^/\\\\]+).$" "$1" .Dir | humanize | title }}
prefix: ""
email: ""
profile_image: profile_image.jpg
feature_image: feature_image.jpg
bio: >-
  
website: ""
location: Guildford, UK
facebook: ""
twitter: ""
date: {{ .Date }}
groups:
  - Researchers
---
