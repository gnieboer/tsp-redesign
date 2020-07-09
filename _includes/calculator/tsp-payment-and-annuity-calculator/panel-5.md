{% comment %}
Name middle panels (2) for CALC.
{% endcomment %}
{% assign panelID = include.panelID | default: 2 %}
{% assign hide = 'display: block;' %}
{% if include.hide == 1 %} {% assign hide = 'display: none;' %} {% endif %}

<section id="panel-{{ panelID }}" class="calculator-panel" style="{{ hide }}"  markdown="1">

{% include calculator/div-panel-form-field.html
  fieldID="panel-5.1" id="haveDependent"  anchor="panel5"
  inputType="radio" radioIDs="haveDependentYes, haveDependentNo" radioLabels="Yes, No"
  inputClass="usa-unstyled-list"   onBlur="haveDependentGood(false);"
  prompt="In the event of your death, is there someone who will be dependent on your TSP monthly income?"
  explanation=""
%}

<div id="has-a-dependent" class="hide">
{% capture explanation_other %}
**Dependent Qualifications**

A joint annuitant other than your spouse must be either a former spouse or someone with an &#8220;insurable interest&#8221; in you; that is, someone who is financially dependent on you and would derive financial benefit if you lived. (Generally, this is a blood relative or an adopted relative closer than a first cousin.) If this joint annuitant is more than 10 years younger than you, you will only be eligible for joint life annuity options with a 50% (not 100%) survivor benefit.
{% endcapture %}
{% include calculator/div-panel-form-field.html
  fieldID="panel-5.2" id="dependent"
  inputType="radio" radioIDs="dependentSpouse, dependentOther" radioLabels="Spouse, Other"
  inputClass="usa-unstyled-list"   onBlur="dependentGood(false);"
  prompt="In the event of your death, is there someone who will be dependent on your TSP monthly income?"
  explanation=explanation_other
%}

{% include calculator/div-panel-form-field.html
  fieldID="panel-3.2" id="dependentAge"
  inputClass=""  min="1" value="" max="99" maxLength=2 step="1"
  placeholder="" onBlur="dependentAgeGood(false);"
  prompt="What is your joint annuitant's (spouse or other survivor) current age?"
  explanation=""  
%}
</div>

{% include calculator/button-block.html panelID=panelID prev=4 showResults=6 %}

</section>
