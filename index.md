---
layout: main
---

<h2>Fun stuff</h2>

{% for item in site.data.effects %}
<a href="{{ item.link }}">{{ item.name }}</a><br/>
{% endfor %}