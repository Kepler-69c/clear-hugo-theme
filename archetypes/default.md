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
thumbnail: /example.png
caption "caption for the thumbnail"

# hide?
draft: true

---

