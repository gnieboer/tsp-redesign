{% comment %}
Name middle panels (2) for CALC.
{% endcomment %}
{% assign panelID = include.panelID | default: 2 %}
{% assign hide = 'display: block;' %}
{% if include.hide == 1 %} {% assign hide = 'display: none;' %} {% endif %}

<section id="panel-{{ panelID }}" class="calculator-panel contribution-election" style="{{ hide }}"  markdown="1">
<h2>TSP Contributions Per Paycheck</h2>
  <div class="usa-grid">
      <!-- Scenario 1 -->
      <div class="usa-width-one-half scenario">
        <h3>Scenario 1 (required)</h3>
        <!-- Scenario 1, 3.1 Traditional contributions -->
        <div class="panel-form-field">
        <fieldset>
        <div class="usa-input-error">
        <legend class="sr-only">Traditional contributions</legend>
        <label class="usa-input-error-label" for="growthSelector" aria-details="panel-3.1"><span data-term="Traditional Contribution" class="js-glossary-toggle term term-end">Traditional contributions</span></label>
        <span class="usa-input-error-message" id="growthSelector-error-message" role="alert">Enter either a whole percentage or a fixed dollar amount for your traditional contribution.</span>
        <ul class="usa-unstyled-list contributions">
          <li>  
            <input
              type="radio"
              id="trad_option1_a"
              name="trad_option1"
              value="percent"
              checked="checked"
              onblur="check_amounts(true, 'ok');">
            <label for="balanceOnly">Percentage of paycheck:</label>

            <span data-format="%" class="input-symbol-right">
            <input
              type="text"
              id="trad_option1Percent"
              name="trad_option1Percent"
              maxlength="2"
              onblur="check_amounts(true, 'ok');" value=""></span>

          </li>  
          <li>
            <input
              type="radio"
              id="futureOnly"
              name="growthSelector"
              value="futureOnly"
              onclick="deemphasize(1);">
            <label for="futureOnly">Fixed amount</label>

            <span data-format="$" class="input-symbol-left">
            <input
              maxlength="6"
              type="text"
              id="trad_option1Amount"
              name="trad_option1Amount"
              onblur="check_amounts(true, 'ok');"></span>
          </li>
        </ul>
        </div> <!-- end div.usa-input-error -->
        </fieldset>
        <!-- Explain this -->
        <ul class="usa-accordion explain-this">
        <li>
        <button class="usa-accordion-button"
        aria-expanded="false"
        aria-controls="panel-option1-traditional">
        Explain this
        </button>
<div id="panel-option1-traditional" class="usa-accordion-content" markdown="1">
Traditional contributions come out of your pay **before** taxes are calculated; you pay taxes on these contributions and their earnings when you withdraw them.
</div>
        </li>
        </ul>
        </div><!-- END div.panel-form-field -->
        <!-- Scenario 1, 3.2 Roth contributions -->
        <div class="panel-form-field">
          <fieldset>
          <div class="usa-input-error">
          <legend class="sr-only">Roth contributions</legend>
          <label class="usa-input-error-label" for="growthSelector" aria-details="panel-3.1"><span data-term="Roth Contribution" class="js-glossary-toggle term term-end">Roth contributions</span></label>
          <span class="usa-input-error-message" id="growthSelector-error-message" role="alert">Enter either a whole percentage or a fixed dollar amount for your Roth contribution.</span>
          <ul class="usa-unstyled-list contributions">
            <li>  
              <input
                type="radio"
                id="roth_option1_a"
                name="roth_option1"
                value="percent"
                checked="checked"
                onblur="check_amounts(true, 'ok');">
                <label for="roth_option1_a">Percentage of paycheck</label>

                <span data-format="%" class="input-symbol-right">
                <input
                  type="text"
                  id="roth_option1Percent"
                  name="roth_option1Percent"
                  maxlength="2"
                  onblur="check_amounts(true, 'ok');" value=""></span>
            </li>  
            <li>
              <input
                type="radio"
                id="roth_option1_b"
                name="roth_option1"
                value="fixed"
                onblur="check_amounts(true, 'ok');">
                <label for="roth_option1_b">Fixed amount</label>

                <span data-format="$" class="input-symbol-left">
                <input
                  maxlength="6"
                  type="text"
                  id="roth_option1Amount"
                  name="roth_option1Amount"
                  onblur="check_amounts(true, 'ok');"></span>
            </li>
          </ul>
          </div> <!-- end div.usa-input-error -->
          </fieldset>
          <!-- Explain this -->
          <ul class="usa-accordion explain-this">
          <li>
          <button class="usa-accordion-button"
          aria-expanded="false"
          aria-controls="panel-option1-roth">
          Explain this
          </button>
<div id="panel-option1-roth" class="usa-accordion-content" markdown="1">
Roth contributions come out of your pay **after** taxes are calculated;  you pay no taxes on these contributions when you withdraw them. Roth earnings are also tax-free when withdrawn, as long as you meet the IRS requirements to qualify.
</div>
          </li>
          </ul>
        </div><!-- END div.panel-form-field -->
        <!-- Scenario 1, 3.3 Catch-up contributions -->
        <div class="panel-form-field">
          <fieldset>
            <legend><span data-term="Catch-up Contributions" class="js-glossary-toggle term term-end">Catch-up contributions</span></legend>
            <label for="catch_option1Trad" aria-details="panel-3.3">Traditional:</label>
            <span data-format="$" class="input-symbol-left whole-number">
            <input
              id="catch_option1Trad"
              type="number"
              name="catch_option1Trad"
              maxlength="6"
              onblur="check_amounts(true, 'ok');"
              value="">
            </span>
            <label for="rcatch_option1Roth" aria-details="panel-3.3">Roth:</label>
            <span data-format="$" class="input-symbol-left whole-number">
            <input
              id="catch_option1Roth"
              type="number"
              name="catch_option1Roth"
              maxlength="6"
              onblur="check_amounts(true, 'ok');" value="">
            </span>
          </fieldset>
          <!-- Explain this -->
          <ul class="usa-accordion explain-this">
            <li>
            <button class="usa-accordion-button"
            aria-expanded="false"
            aria-controls="panel-option1-catch-up">
            Explain this
            </button>
            <div id="panel-option1-catch-up" class="usa-accordion-content">
            Only for participants who are age 50 or older. You must first exceed the elective deferral limit ($19,500.00 in 2020) to make catch-up contributions.
            </div>
            </li>
          </ul>
        </div><!-- END div.panel-form-field -->
      </div><!-- END div.usa-width-one-half -->

      <!-- Scenario 2 -->
      <div class="usa-width-one-half scenario">
        <h3>Scenario 2 (optional)</h3>
        <!-- Scenario 2, 3.1 Traditional contributions -->
        <div class="panel-form-field">
        <fieldset>
        <div class="usa-input-error">
        <legend class="sr-only">Traditional contributions</legend>
        <label class="usa-input-error-label" for="growthSelector" aria-details="panel-3.1"><span data-term="Traditional Contribution" class="js-glossary-toggle term term-end">Traditional contributions</span></label>
        <span class="usa-input-error-message" id="growthSelector-error-message" role="alert">Enter either a whole percentage or a fixed dollar amount for your traditional contribution.</span>
        <ul class="usa-unstyled-list contributions">
          <li>  
            <input
              type="radio"
              id="trad_option2_a"
              name="trad_option2"
              value="percent"
              checked="checked"
              onblur="check_amounts(true, 'ok');">
            <label for="balanceOnly">Percentage of paycheck:</label>

            <span data-format="%" class="input-symbol-right">
            <input
              type="text"
              id="trad_option2Percent"
              name="trad_option2Percent"
              maxlength="2"
              onblur="check_amounts(true, 'ok');" value=""></span>

          </li>  
          <li>
            <input
              type="radio"
              id="futureOnly"
              name="growthSelector"
              value="futureOnly"
              onclick="deemphasize(1);">
            <label for="futureOnly">Fixed amount</label>

            <span data-format="$" class="input-symbol-left">
            <input
              maxlength="6"
              type="text"
              id="trad_option2Amount"
              name="trad_option2Amount"
              onblur="check_amounts(true, 'ok');"></span>
          </li>
        </ul>
        </div> <!-- end div.usa-input-error -->
        </fieldset>
        <!-- Explain this -->
        <ul class="usa-accordion explain-this">
        <li>
        <button class="usa-accordion-button"
        aria-expanded="false"
        aria-controls="panel-option2-traditional">
        Explain this
        </button>
<div id="panel-option2-traditional" class="usa-accordion-content" markdown="1">
Traditional contributions come out of your pay **before** taxes are calculated; you pay taxes on these contributions and their earnings when you withdraw them.
</div>
        </li>
        </ul>
        </div><!-- END div.panel-form-field -->
        <!-- Scenario 2, 3.2 Roth contributions -->
        <div class="panel-form-field">
          <fieldset>
          <div class="usa-input-error">
          <legend class="sr-only">Roth contributions</legend>
          <label class="usa-input-error-label" for="growthSelector" aria-details="panel-3.1"><span data-term="Roth Contribution" class="js-glossary-toggle term term-end">Roth contributions</span></label>
          <span class="usa-input-error-message" id="growthSelector-error-message" role="alert">Enter either a whole percentage or a fixed dollar amount for your Roth contribution.</span>
          <ul class="usa-unstyled-list contributions">
            <li>  
              <input
                type="radio"
                id="roth_option2_a"
                name="roth_option2"
                value="percent"
                checked="checked"
                onblur="check_amounts(true, 'ok');">
                <label for="roth_option2_a">Percentage of paycheck</label>

                <span data-format="%" class="input-symbol-right">
                <input
                  type="text"
                  id="roth_option2Percent"
                  name="roth_option2Percent"
                  maxlength="2"
                  onblur="check_amounts(true, 'ok');" value=""></span>
            </li>  
            <li>
              <input
                type="radio"
                id="roth_option2_b"
                name="roth_option2"
                value="fixed"
                onblur="check_amounts(true, 'ok');">
                <label for="roth_option2_b">Fixed amount</label>

                <span data-format="$" class="input-symbol-left">
                <input
                  maxlength="6"
                  type="text"
                  id="roth_option2Amount"
                  name="roth_option2Amount"
                  onblur="check_amounts(true, 'ok');"></span>
            </li>
          </ul>
          </div> <!-- end div.usa-input-error -->
          </fieldset>
          <!-- Explain this -->
          <ul class="usa-accordion explain-this">
          <li>
          <button class="usa-accordion-button"
          aria-expanded="false"
          aria-controls="panel-option2-roth">
          Explain this
          </button>
<div id="panel-option2-roth" class="usa-accordion-content" markdown="1">
Roth contributions come out of your pay **after** taxes are calculated;  you pay no taxes on these contributions when you withdraw them. Roth earnings are also tax-free when withdrawn, as long as you meet the IRS requirements to qualify.
</div>
          </li>
          </ul>
        </div><!-- END div.panel-form-field -->
        <!-- Scenario 2, 3.3 Catch-up contributions -->
        <div class="panel-form-field">
          <fieldset>
            <legend><span data-term="Catch-up Contributions" class="js-glossary-toggle term term-end">Catch-up contributions</span></legend>
            <label for="catch_option2Trad" aria-details="panel-3.3">Traditional:</label>
            <span data-format="$" class="input-symbol-left whole-number">
            <input
              id="catch_option2Trad"
              type="number"
              name="catch_option2Trad"
              maxlength="6"
              onblur="check_amounts(true, 'ok');"
              value="">
            </span>
            <label for="rcatch_option2Roth" aria-details="panel-3.3">Roth:</label>
            <span data-format="$" class="input-symbol-left whole-number">
            <input
              id="catch_option2Roth"
              type="number"
              name="catch_option2Roth"
              maxlength="6"
              onblur="check_amounts(true, 'ok');" value="">
            </span>
          </fieldset>
          <!-- Explain this -->
          <ul class="usa-accordion explain-this">
            <li>
            <button class="usa-accordion-button"
            aria-expanded="false"
            aria-controls="panel-option2-catch-up">
            Explain this
            </button>
            <div id="panel-option2-catch-up" class="usa-accordion-content">
            Only for participants who are age 50 or older. You must first exceed the elective deferral limit ($19,500.00 in 2020) to make catch-up contributions.
            </div>
            </li>
          </ul>
        </div><!-- END div.panel-form-field -->
      </div><!-- END div.usa-width-one-half -->
  </div><!-- END div.usa-grid -->
<div class="usa-grid expected-annual-return">
  <div class="usa-width-one-whole">
    <div class="panel-form-field">
    <ul class="inline-input">
      <li>
      <label class="" for="annualReturn" aria-details="expected-annual-return">Expected annual return:</label>
      <span data-format="%" class="input-symbol-right">
      <input
        id="annualReturn"
        name="annualReturn"
        type="text"
        value=""
        maxlength="7"
        onblur="annualReturnGood();">
      </span>
      </li>
    </ul>
    <!-- Explain this -->
    <ul id="auto" class="usa-accordion explain-this">
    <li>
    <button class="usa-accordion-button"
    aria-expanded="false"
    aria-controls="expected-annual-return">
    Explain this
    </button>
<div id="expected-annual-return" class="usa-accordion-content" markdown="1">
View the [Rates of return]({{ site.baseurl }}/fund-performance/). Past performance is not a guarantee or a predictor of future returns.
</div>
    </li>
    </ul>
    </div><!-- END div.panel-form-field -->
  </div><!-- END div.usa-width-one-whole -->
</div><!-- END div.usa-grid -->

  <ul class="navigation-buttons">
  <li>
  <button class="usa-button " href="javascript:void(0);" onclick="showPanel(2); return false;">Previous</button>
  </li>
  <li>
  <button class="usa-button" href="javascript:void(0);" onclick="doReport(); return false;">Submit</button>
  </li>
  </ul>
</section>
