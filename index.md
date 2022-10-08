---
layout: main
---

<!--<div style="text-align:center;">
<table style="margin-left:auto;margin-right:auto;border:3px double;">
<tr>
<td>My info</td>
<td>My pic</td>
</tr>
</table>
</div>-->

<hr style="width:65%"/>

<div style="text-align:center;">Check out my
<a href="https://www.npmjs.com/~spongex">NPM</a>
for scripts I've written</div>

<hr style="width:65%"/>

<div style="text-align:center;">
<h3>Fun Web Examples</h3>
{% for item in site.data.effects %}
<div><a href="{{ item.link }}">{{ item.name }}</a> - {{ item.desc }}</div>
{% endfor %}
</div>