---
layout: main
---

<div style="text-align:center;">
<h3>Fun Web Examples</h3>
{% for item in site.data.effects %}
<a href="{{ item.link }}">{{ item.name }}</a><br/>
{% endfor %}
</div>