---
layout: base
title: Mes Présentations
---

# Mes Présentations

{% for presentation in collections.presentations %}
- [{{ presentation.data.title }}]({{ presentation.url }})
  {% endfor %}
