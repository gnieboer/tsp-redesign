---
layout: calculator
title: How much can I contribute?
styles:
sidenav: calculators
scripts:
permalink: /calculators/how-much-can-i-contribute/
progressSteps: "Introduction,Elective Contributions,Elective Deferral Limits"
maxPanels: 3
---

{% assign panelNames = "Introduction, Contributions, Limits" | split: ", " %}
{% assign hide = 0 %}
{% for panelName in panelNames %}
  {% assign panelID = forloop.index %}
  {% assign mdFile = 'panel' | append: panelID | append: '.md' %}
  {% assign jsFile = 'panel' | append: panelID | append: '.js' %}

  {% include_relative {{ mdFile }} panelID=panelID hide=hide %}
  {% include_relative {{ jsFile }} panelID=panelID panelName=panelName %}
  {% assign hide = 1 %}
{% endfor %}

{% include_relative index.js maxPanels=page.maxPanels %}
