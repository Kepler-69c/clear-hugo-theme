---
# title and summary
title: "{{ replace .Name "-" " " | title }}"
summary: "shouldn't be longer than ~50 words"

# "metadata"
description: ""
date: {{ .Date }}
author: ""
last_modified_at:
tags: ["", ""]

# thumbnail
icon: question.svg # should be placed in the /static/icons/ dir
thumbnail: /example.png
caption "caption for the thumbnail"

# hide / page settings
draft: true
math: false

hideComments: false
hideMeta: false
hideSummary: false
#hidePageThumbnail = false (not yet implemented)
#hideThumbnailCaption = false (not yet implemented)
#hideotherLang: false (not implemented)

---

