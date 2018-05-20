/* CurrencyFormatted was delivered in paycheckEstimator.js */
function CurrencyFormatted(num, no_cent) {
  if(isNaN(num)) { num = "0"; }
  num = num.toString().replace(/\$|\,/g,'');
  if(isNaN(num)) { num = "0"; }
  sign = (num == (num = Math.abs(num)));
  num = Math.floor(num*100+0.50000000001);
  cents = num%100;
  num = Math.floor(num/100).toString();
  if(cents<10) {
    cents = "0" + cents;
  }
  for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++) {
    num = num.substring(0,num.length-(4*i+3))+','+num.substring(num.length-(4*i+3));
  }

  if (no_cent != null && no_cent == 'no_cent') {
    return (((sign)?'':'-') + '$' + num);
  } else {
    return (((sign)?'':'-') + '$' + num + '.' + cents);
  }
}

var leftGrowth = new Array();
var rightGrowth = new Array();

function get_pay_freq(paySchedule) {
  if (paySchedule == 'Biweekly')      return 26.0;
  if (paySchedule == 'Weekly')        return 52.0;
  if (paySchedule == 'Semimonthly')  return 24.0;
  if (paySchedule == 'Monthly')       return 12.0;
  return 1.0;
}

// Calculate how much FERS will match users contrib
function FERSmatch(matchPercent) {
  if (matchPercent <= 0.00) { return 0.01; }

  if (matchPercent >= 0.05) { return matchPercent + 0.05; }

  if (matchPercent <= 0.03) { return matchPercent * 2 + 0.01; }

  // all that's left is between 3% and 5%
  return (matchPercent - 0.03) * 1.5 + 0.07;
}

// Calculate how much USBRS will match users contrib
function USBRSmatch(years, months, matchPercent) {
  if (years > 26) { return matchPercent; }
  if ((years <= 1) && (months <= 2)) { return matchPercent; }
  if (years <= 2) { return FERSmatch(0.0) + matchPercent; }
  return FERSmatch(matchPercent);
}

function openclose(id) {
       var e = document.getElementById(id);
       if(e.style.display == 'block')
          e.style.display = 'none';
       else
          e.style.display = 'block';
}


function setData(xObj, verbose) {

    var accountBalance = new Array();
    var accountGrowth = new Array();
    var contributions = new Array();
    var contributionGrowth = new Array();
    var matching = new Array();
    var matchingGrowth = new Array();
    var total = new Array();
    var salary = new Array();
    // These variables hold values used in the calculations
    var agency = 'agency';
    var isMatching = false;
    // var rs = 'FERS';
    var contributionsText = 'Contributions';
    if ((rs == 'FERS') || (rs == 'USBRS')) {
      contributionsText = 'Contributions*';
      isMatching = true;
      if (rs == 'USBRS') { agency = 'service'; }
    }
    var matchFootnoteChart = '*Includes any '+agency+'<BR>&nbsp;&nbsp;contributions';
    var matchFootnoteTable = '*Includes any '+agency+' contributions';
    var amountToUse = 0; // parseInt($('#accountBalance').val());
    var annualPay = parseInt($('#salary').val());
    var age = parseInt($('#age').val());
    var retire = parseInt($('#retire').val());
    var yearsToContribute = retire - age; // parseInt($('#yearsToContribute').val());
    var yearsToGo = yearsToContribute + 0; // parseInt($('#yearsToGo').val());
    var rs = 'FERS';
console.log(age, retire, yearsToContribute, yearsToGo, rs);

    var DIEMSdate = '';
    var matchDelay = 0;
    // if (Date.parse(DIEMSdate) < Date.parse('01/01/2018')) { matchDelay = 2; }
    var paySchedule = 'Monthly';
    var annualPayPercent = xObj['Percent'];
    var annualPayIncreasePercent = 0.0; // parseFloat($('#annualPayIncreasePercent').val());
    var yearsServed = parseInt(0);
    var catchupAmount = parseInt(0);
    var rateOfReturn = 6.0; // parseFloat($('#rateOfReturn').val());

    var growthSelector = 'bothGrowth';
    if (rs == 'BP') { growthSelector = 'balanceOnly'; }
    // if (growthSelector == 'futureOnly') { amountToUse = 0; }
    // if (growthSelector == 'balanceOnly') { yearsToContribute = 0; }
    // alert(growthSelector);

    // loop control
    var periodLength = get_pay_freq(paySchedule);
    if (rs == 'US') { periodLength = 12.0; }
    if (rs == 'USBRS') { periodLength = 12.0; }
    if (rs == 'BP') { periodLength = 1.0; }
    var period = 0;
    var year = 0;
    var returnRate = rateOfReturn / 100.0;
    // returnRate = returnRate/periodLength;
    // alert(returnRate/periodLength);
    returnRate = Math.pow(1 + returnRate, 1.0 / periodLength) - 1.0;
    // alert(returnRate);

    var annualPayRate = annualPayPercent / 100.0;
    // hack here to ignore rs and break contribution into participant and agency parts
    var origAnnualPayRate = annualPayRate;
    var newAnnualPayRate = FERSmatch(annualPayRate) - origAnnualPayRate;
    if (rs == 'FERS') { annualPayRate = FERSmatch(annualPayRate); }
    // if (rs == 'BP') { yearsToContribute = 0; }
    // annualPayRate = annualPayRate / periodLength;
    var annualPayIncreaseRate = (annualPayIncreasePercent) / 100.0 + 1.00;
    // deal with rounding of catchup
    var catchupPaycheck = parseInt(catchupAmount / periodLength * 100.0) / 100.0;
    var catchupCatchup = parseInt(100 * parseFloat(catchupAmount - parseFloat(catchupPaycheck) * periodLength).toFixed(2));

    // alert(catchupPaycheck + '  ' + catchupCatchup);

    // yearly loop
    accountBalance[year] = parseFloat(amountToUse);
    accountGrowth[year] = 0.0;
    contributions[year] = 0.0;
    contributionGrowth[year] = 0.0;
    matching[year] = 0.0;
    matchingGrowth[year] = 0.0;
    total[year] = accountBalance[year] + accountGrowth[year] + contributions[year] + contributionGrowth[year]
        + matching[year] + matchingGrowth[year];
    salary[year] = parseFloat((annualPay / periodLength).toFixed(2));
    salary[year+1] = salary[year];

    for (year = 1; year <= yearsToGo; year++) {
      accountBalance[year] = parseFloat(amountToUse);
      accountGrowth[year] = accountGrowth[year-1];
      contributions[year] = contributions[year-1];
      contributionGrowth[year] = contributionGrowth[year-1];
      matching[year] = matching[year-1];
      matchingGrowth[year] = matchingGrowth[year-1];
      if (year > 1) { salary[year] = parseFloat((salary[year-1] * annualPayIncreaseRate).toFixed(2)); }
      for (period = 1; period <= periodLength; period++) {
        contributionGrowth[year] += parseFloat(((contributions[year] + contributionGrowth[year]) * returnRate).toFixed(2));
        matchingGrowth[year] += parseFloat(((matching[year] + matchingGrowth[year]) * returnRate).toFixed(2));
        if (year <= yearsToContribute) {
    // console.log(yearsServed, year, period, yearsToContribute);
/* **** hack rs
          if (rs == 'USBRS') {
    // console.log(year, period, annualPayRate, salary[year]*annualPayRate, parseFloat(salary[year] * USBRSmatch(year+yearsServed, period, annualPayRate).toFixed(2)), catchupPaycheck);
            contributions[year] += parseFloat((salary[year] * USBRSmatch(year+yearsServed+matchDelay, period, annualPayRate)).toFixed(2));
          } else {
            contributions[year] += parseFloat((salary[year] * annualPayRate).toFixed(2));
          }
**** */
        contributions[year] += parseFloat((salary[year] * origAnnualPayRate).toFixed(2));
        matching[year] += parseFloat((salary[year] * newAnnualPayRate).toFixed(2));

          contributions[year] += parseFloat(catchupPaycheck);
          if (period <= catchupCatchup) { contributions[year] += 0.01; }
        }
      }
      accountGrowth[year] += parseFloat(((accountBalance[year-1] + accountGrowth[year-1]) * (rateOfReturn / 100.0)).toFixed(2));

      total[year] = accountBalance[year] + accountGrowth[year] + contributions[year] + contributionGrowth[year]
        + matching[year] + matchingGrowth[year];
    }
if (verbose) {
  console.log("Percent is " + xObj['Percent']);
  console.log('year, balance, growth, contribution, growth, matching, growth');
  for (year = 0; year <= yearsToGo; year++) {
    console.log(year +', ' + accountBalance[year].toFixed(2) +', ' + accountGrowth[year].toFixed(2) +', '
        + contributions[year].toFixed(2) +', ' + contributionGrowth[year].toFixed(2) +', '
        + matching[year].toFixed(2) +', ' + matchingGrowth[year].toFixed(2));
  }

}
  var maxYears = parseInt($('#retire').val()-$('#age').val()); // parseInt($('#yearsToContribute').val()) + parseInt($('#yearsToGo').val());
  xObj['accountBalance'] = accountBalance[maxYears];
  xObj['accountGrowth'] = accountGrowth[maxYears];
  xObj['contributions'] = contributions[maxYears];
  xObj['contributionGrowth'] = contributionGrowth[maxYears];
  xObj['matching'] = matching[maxYears];
  xObj['matchingGrowth'] = matchingGrowth[maxYears];
  xObj['Total'] = total[maxYears];
  xObj['salary'] = salary[maxYears];
}

var color3c = 'lightgreen';
var color3m = 'seagreen';
var color5c = 'lightblue';
var color5m = 'skyblue';

function make2Bar(side, leftObj, rightObj) {

  return  new Highcharts.Chart({
            credits: { enabled: false },
            chart: {
                renderTo: side,
                type: 'column'
            },
            title: { text: '' },
            xAxis: { categories: ['Default contribution (3%)', 'Matching Funds (5%)'],
            },
            yAxis: {
                min: 0,
                max: rightObj['Total']*1.15,
                title: { text: '' },
                startOnTick: false, endOnTick: false, alignTicks: false,
                gridLineWidth: 0, labels: { enabled: false },
                stackLabels: {
                    enabled: true,
                    y: -17,
                    formatter: function() {
                        // return ''; // uncomment this to hide the total at the top
                        return 'TSP balance:<br/>' + '<strong>' + CurrencyFormatted(this.total, 'no_cent') + '</strong>';
                    },
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                    }
                }
            },
            legend: {
                itemStyle: { fontSize: "10px" },
                // width: 380,
                itemWidth: 150,
                enabled: true
            },
            tooltip: { enabled: false },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            if (this.y == null) return '';
                            // return ''; // uncomment this to hide the value in each box
                            return '<strong>' + CurrencyFormatted(this.y, 'no_cent') + '</strong>'; },
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                        style: {
                            textShadow: '0 0 3px black, 0 0 3px black'
                        }
                    },
                    events: {
                        legendItemClick: function () {
                            return false; // <== returning false will cancel the
                            }
                    },
                    // pointWidth: 120,
                    borderWidth: 0,
                    borderColor: 'black',
                },
                allowPointSelect: false
            },
            series: [{
                name: '3% contributions',
                color: color3c,
                legendIndex: 3,
                data: [{y: leftObj['matching']+leftObj['matchingGrowth'], color: color3m},
                    {y: rightObj['matching']+rightObj['matchingGrowth'], color: color5m}]
            }, {
                name: '3% matching',
                color: color3m,
                legendIndex: 1,
                data: [{y: null},
                    {y: null}]
            }, {
                name: '5% contributions',
                color: color5c,
                legendIndex: 4,
                data: [{y: leftObj['contributions']+leftObj['contributionGrowth'], color: color3c},
                    {y: rightObj['contributions']+rightObj['contributionGrowth'], color: color5c}]
            }, {
                name: '5% matching',
                color: color5m,
                legendIndex: 2,
                data: [{y: null},
                    {y: null}]
            }]
   });
}

function reDraw() {
  var leftObj = {};
  var rightObj = {};
  leftObj['Percent'] = 3; // parseInt($('#leftPercent').val());
  rightObj['Percent'] = 5; // parseInt($('#rightPercent').val());
  if ((leftObj['Percent'] < 5) || (rightObj['Percent'] < 5)) { $('#bonusWarning').show(); } else { $('#bonusWarning').hide(); }
  setData(leftObj, 1);
  setData(rightObj, 1);
console.log(leftObj['Total'], rightObj['Total']);
  make2Bar('bar', leftObj, rightObj);

  // now lets set the text
  var salary = parseInt($('#salary').val());
  var perpay = (salary/12.0) * 0.02;
  // var newText = "<h2>" + CurrencyFormatted(rightObj['Total'], 'no_cent') + "* earned with as little as "
  //   + CurrencyFormatted(perpay) + " per paycheck.</h2>"
  //   + "Don't leave " + CurrencyFormatted(rightObj['Total']-leftObj['Total'], 'no_cent') + " on the table.";
  var newText = "An extra 2% reduces your paycheck by only " + CurrencyFormatted(perpay) + "."
  + "<br/>But that increases your balance at retirement by " + CurrencyFormatted(rightObj['Total'], 'no_cent') + "*."
  + "<br/><br/>Don't leave " + CurrencyFormatted(rightObj['Total']-leftObj['Total'], 'no_cent') + " on the table.";
  $('#message').html("<small>"+newText+"</small>");
}
