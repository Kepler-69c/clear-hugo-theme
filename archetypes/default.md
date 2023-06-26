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

# hide?
draft: true

---

