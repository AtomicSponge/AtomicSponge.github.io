---
layout: main
---

<div style="text-align:center;"><img src="img/my_pic.png" width="280px"/></div>

<hr style="width:65%"/>

<div style="text-align:center;">
<table style="width:75%;margin-left:auto;margin-right:auto;border:3px double;">
<tr>
<td style="text-align:left">
    Hi I'm a multifaceted developer experienced in multiple fields of engineering.  While I may lack on appearance my knowledge of data structures makes up for it a lot.  I started my interest in computers back when I was a child and have fostered this passion all of my life.  In the past I've worked on many software projects aimed at analytics.  This has also helped my understanding of mathematics quite well.  I'm very confident in my abilities and enjoy any challenging work I can find.
    <br/><br/>
    I'm currently open to part time work and contract positions.  Contact me at the email address above if interested in my services.
</td>
</tr>
</table>
</div>

<hr style="width:65%"/>

<div style="text-align:center;">Check out my
<a href="https://www.npmjs.com/~spongex" target="_blank">NPM</a>
for scripts I've written</div>

<hr style="width:65%"/>
<div style="text-align:center;">My working
<a href="https://github.com/wtfsystems" target="_blank">C++ game engine</a>
with example game

<hr style="width:65%"/>

<div style="text-align:center;">
<h3>Fun Web Examples</h3>
{% for item in site.data.effects %}
<div><a href="{{ item.link }}" target="_blank">{{ item.name }}</a> - {{ item.desc }}</div>
{% endfor %}
</div>