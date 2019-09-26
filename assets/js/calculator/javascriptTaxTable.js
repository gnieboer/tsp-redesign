function round_cents(num) {
  num = isNaN(num) || num === '' || num === null ? 0.00 : num;
  return parseFloat(num).toFixed(2);
}

var taxMinYear = 2018;
var taxMaxYear = 2019;
var IRC_acting_year = taxMaxYear;

var taxValues = {
    2019: { contribution_limit: 19000.00, catchup_limit: 6000.00,
      withholding_allowance: 4200.00, annual_addition: 56000 },
    2018: { contribution_limit: 18500.00, catchup_limit: 6000.00,
      withholding_allowance: 4150.00, annual_addition: 56000 }
}

// IRS Pub. 15, Table 7(a) SINGLE person, ANNUAL Payroll Period
var taxtableS = [ [3800.00, 0.00, 0.0], [13500.00, 0.10, 0.0], [43275.00, 0.12, 970.0],
                [88000.00, 0.22, 4543.0], [164525.00, 0.24, 14382.5], [207900.00, 0.32, 32748.5],
                [514100.00, 0.35, 46628.5], [-1, 0.37, 153798.5] ];

// IRS Pub. 15, Table 7(b) MARRIED person, ANNUAL Payroll Period
var taxtableM = [ [11800.00, 0.00, 0.0], [31200.00, 0.10, 0.0], [90750.00, 0.12, 1940.0],
                [180200.00, 0.22, 9086.0], [333250.00, 0.24, 28765.0], [420000.00, 0.32, 65497.0],
                [624150.0, 0.35, 93257.0], [-1, 0.37, 164709.50] ];

// default tax values
var acting_year = determineActingYear();
var IRC_limit_year = acting_year;
var IRC_acting_year = acting_year;
var IRC_contribution_limit = taxValues[acting_year]['contribution_limit'];
var IRC_catchup_contribution_limit = taxValues[acting_year]['catchup_limit'];
var withholding_allowance_rate = taxValues[acting_year]['withholding_allowance'];
var annual_addition = taxValues[acting_year]['annual_addition'];
// console.log(IRC_limit_year, IRC_acting_year, IRC_contribution_limit, IRC_catchup_contribution_limit, withholding_allowance_rate);

function determineActingYear() {
  var today = new Date();
  var curYear = String(today.getFullYear());
  var curDate = curYear + String(today.getMonth()+1).padStart(2, '0') + String(today.getDate()).padStart(2, '0');
  // early in year, before taxes due, use last year
  var earlyTest = curYear + '0415';
  if (curDate <= earlyTest) return today.getFullYear()-1;
  // late in year, use next year 'cause taxes
  var lateTest = curYear + '1101';
  if (curDate > lateTest) return today.getFullYear()+1;
  // otherwise return current year
  return today.getFullYear();
}

function getContributionLimit(year) {
  if (year < taxMinYear) return taxValues[taxMinYear]['contribution_limit'];
  if (year > taxMaxYear) return taxValues[taxMaxYear]['contribution_limit'];
  return taxValues[year]['contribution_limit'];
}

function getTaxValues(yearIn) {
  var year = yearIn;
  if (year < taxMinYear) { year = taxMinYear; }
  if (year > taxMaxYear) { year = taxMaxYear; }
  return [
    year,
    taxValues[year]['contribution_limit'],
    taxValues[year]['catchup_limit'],
    taxValues[year]['withholding_allowance'],
    taxValues[year]['annual_addition'],
  ];
}

// Calculate annual income tax for a S (single) or MS (married filing single) person
function annualTax (income, taxarray) {
  // handle minimal case
  if (income < taxarray[0][0]) { return 0.0; }

  // handle other cases
  // note there is always a lower bracket because lowest is handled above
  var i = 1;
  while (i < taxarray.length) {
    if (income < taxarray[i][0]) {
      // bracket found
      return round_cents(taxarray[i][2] + (taxarray[i][1] * (income - taxarray[i-1][0])));
    }
    i++;
  }

  // we didn't find bracket so we must be in highest bracket
  i = taxarray.length - 1;
  return round_cents(taxarray[i][2] + (taxarray[i][1] * (income - taxarray[i-1][0])));
}
