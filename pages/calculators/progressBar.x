% # Generic Progress bar for Calculators
% #
% # with clickable steps
%
% # Usage:
%
% # <& progressBar.pl, step => 1, numsteps => 3, stages => ["Introduction", "Retirement Profile", "Results"] &>
%
% #############################################################################################
%
%
<%args>
$step => 1
$numsteps => 3
$stages => ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6", "Step 7", "Step 8", "Step 9", "Step 10", "Step 11", "Step 12"];
$clickableSteps => 0
</%args>
% my $nsteps = $numsteps;
% if ($numsteps < 2) { $nsteps = 2; }
% # if ($numsteps > 6) { $nsteps = 6; }
% if ($numsteps > 12) { $nsteps = 12; }
% my $progstep = 'progstep' . $nsteps;
% my $progtrckr = 'progtrckr' . $nsteps;
% my $onClick = '';
% my $i;
          <div id="parent">
            <div id="step">
              <ol class="<% $progstep %> progstep">
% if ($clickableSteps) { $onClick = " onClick='progressStepClick(1);'"; }
                <li id="progressStep1" class="progstep-active" <% $onClick %>>1</li>
% for ($i = 2; $i <= $numsteps; $i++) {
% if ($clickableSteps) { $onClick = " onClick='progressStepClick($i);'"; }
                <li id="progressStep<% $i %>" class="progstep" <% $onClick %>><% $i %></li>
% }
              </ol>
            </div>
            <div id="track" class="progtrckr2">
              <ol class="<% $progtrckr %> progtrckr">
% if ($clickableSteps) { $onClick = " onClick='progressStepClick(1);'"; }
                <li id="progressTrack1" class="progtrckr-active"><% $stages->[0] %></li>
% for ($i = 2; $i <= $numsteps; $i++) {
% if ($clickableSteps) { $onClick = " onClick='progressStepClick($i);'"; }
                <li id="progressTrack<% $i %>" class="progtrckr"><% $stages->[$i-1] %></li>
% }
              </ol>
            </div>
          </div>

<script type="text/javascript">
<!--
var progressDone = '-done';
var progressActive = '-active';
var progressError = '-error';
var progressDisabled = '-disabled';
var progressBarDisabledAt = -1;
var progressState = new Array(<% $numsteps+1 %>);
var progressError = new Array(<% $numsteps+1 %>);
for (p=0; p <= <% $numsteps %>; p++) {
  progressState[p] = '';
  progressError[p] = 0;
}
//  progressError[4] = 1;

// disable bar, step will be marked with an error
function disableProgressBar(step) {
  if (step >= 0) { progressBarDisabledAt = step;  return true; }
  return false;
}
function enableProgressBar() {
  progressBarDisabledAt = -1;
  return true;
}
function progressStepClick(step) {
  var rung = 'progressStep'+step;
  // if (($('#'+rung).hasClass('progstep-done')) || ($('#'+rung).hasClass('progstep-active'))) {
  if ($('#'+rung).hasClass('progstep-done')) {
    // alert(rung);
    showPanel(step); // user must define
    return;
  }
  return;
}

function setProgressStateClass(xclass, xstate, xnode, error) {
    $('#progress' + xnode).removeClass(xclass);
    $('#progress' + xnode).removeClass(xclass + progressDone);
    $('#progress' + xnode).removeClass(xclass + progressActive);
    $('#progress' + xnode).removeClass(xclass + progressError);
    $('#progress' + xnode).removeClass(xclass + progressDisabled);
    $('#progress' + xnode).addClass(xclass+xstate);
    if (error) {
      $('#progress' + xnode).addClass(xclass+progressError);
    } else {
    }
}

function setProgressState(step, state) {
    var error = progressError[step];
    if (progressBarDisabledAt >= 0) {
      if (progressBarDisabledAt == step) { error = 1; } else { error = 0; }
    }

    if (progressBarDisabledAt < 0) { progressState[step] = state; }
    setProgressStateClass('progstep', state, 'Step'+step, error);
    setProgressStateClass('progtrckr', state, 'Track'+step, error);
}

function getProgressState(step) {
  if ($('#progressStep'+step).hasClass('progstep-done')) { return progressDone; }
  if ($('#progressStep'+step).hasClass('progstep-active')) { return progressActive; }
  return '';
}

// move the highest visited step to a lower value
function lowerHighwater(step) {
    var p;

    if ((step <= 0) || (step > <% $numsteps %>)) { return; }
    for (p=0; p <= <% $numsteps %>; p++) {
        if ((progressState[p] == progressDone) && (p <= step)) { progressState[p] = progressDone; } else { progressState[p] = ''; }
    }
}
function setHighwater(step) {
    var p;

    if ((step <= 0) || (step > <% $numsteps %>)) { return; }
    for (p=1; p <= <% $numsteps %>; p++) {
        if (p <= step) { progressState[p] = progressDone; } else { progressState[p] = ''; }
    }
}
function getHighwater() {
    var p = 1;

    if ((step <= 0) || (step > <% $numsteps %>)) { return -1; }
    while ((progressState[p] == progressDone) || (progressState[p] == progressActive)) { p++; }
    if ((p <= 0) || (p > <% $numsteps %>)) { return -1; }
    return p;
}
function setProgressStateError(step) {
    if ((step <= 0) || (step > <% $numsteps %>)) { return; }
    progressError[step] = 1;
}
function unsetProgressStateError(step) {
    if ((step <= 0) || (step > <% $numsteps %>)) { return; }
    progressError[step] = 0;
}
function getProgressStateError(step) {
    if ((step <= 0) || (step > <% $numsteps %>)) { return; }
    return progressError[step];
}
function getProgressError() {
    for (p=0; p <= <% $numsteps %>; p++) {
        if(progressError[p]) { return 1; }
    }
    return 0;
}

// set the progress bar status
// default behavior
function setProgressDefault(num) {
  if (num < 1) num = 1;
  if (num > <% $numsteps %>) num = <% $numsteps %>;
  var i;
  for (i=1; i<num; i++) {
    setProgressState(i, progressDone);
  }
  setProgressState(i, progressActive);
  i++;
  for (; i<=<% $numsteps %>; i++) {
    setProgressState(i, '');
  }

  return true;
};

// clickable progressbar behavior, return true if progressBar enabled
function setProgress(num) {
  var i;

%  if ($clickableSteps == 0) {
  return setProgressDefault(num);
%  }

  // handle disabled state
  if (progressBarDisabledAt >= 0) {
    for (i=1; i<<% $numsteps %>; i++) {
      setProgressState(i, progressDisabled);
    }
    return false;
  }

  if (num < 1) num = 1;
  if (num > <% $numsteps %>) num = <% $numsteps %>;
  for (i=1; i<num; i++) {
    setProgressState(i, progressDone);
  }
  setProgressState(i, progressActive);
  i++;
  for (; i<=<% $numsteps %>; i++) {
    if (progressState[i] == progressActive) { setProgressState(i, progressDone); }
    else
      setProgressState(i, progressState[i]);
  }
  if (num != <% $numsteps %>) { setProgressState(<% $numsteps %>, ''); }

  return true;
};

% if ($step > 1) {
setProgress(<% $step %>);
% }
-->
</script>
