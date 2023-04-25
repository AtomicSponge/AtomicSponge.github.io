---
layout: main
---

<div style="text-align:center;"><img src="img/my_pic.png" width="280px"/></div>

<hr style="width:65%"/>

<div style="text-align:center;">
<table style="width:75%;margin-left:auto;margin-right:auto;border:3px double;">
<tr>
<td style="text-align:left;padding:8px;">
    Hi I'm a software developer experienced in multiple fields of engineering, and with over 20 years of work in various positions.  I started my interest in computers back when I was a child and have fostered this passion all of my life through my work and career.  Please take a look at my personal <a href="https://github.com/AtomicSponge" target="_blank" rel="noopener noreferrer">GitHub portfolio</a> and <a href="https://www.npmjs.com/~spongex" target="_blank" rel="noopener noreferrer">NPM</a> for examples of programs I've written.
    <br/><br/>
    My working <a href="https://github.com/wtfsystems" target="_blank" rel="noopener noreferrer">C++ game engine</a> with <a href="https://github.com/wte_demo_01" target="_blank" rel="noopener noreferrer">example game</a>.
    <br/><br/>
    Please contact me for any inquiries, thank you!
</td>
</tr>
</table>
</div>

<hr style="width:65%;"/>

<div style="text-align:center;">
<h3>Fun Web Examples</h3>
{% for item in site.data.effects %}
<div><a href="{{ item.link }}" target="_blank" rel="noopener noreferrer">{{ item.name }}</a> - {{ item.desc }}</div>
{% endfor %}
</div>
