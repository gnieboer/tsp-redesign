function round_cents(num) {
  num = isNaN(num) || num === '' || num === null ? 0.00 : num;
  return parseFloat(num).toFixed(2);
}

function getContributionLimit(year) {
  if (year == 2019) { return 19000; }
  if (year == 2018) { return 18500; }
  return 19000;
}

// 2019 tax values
var IRC_limit_year = 2019;
var IRC_acting_year = IRC_limit_year;
var IRC_contribution_limit = 19000.00;
var IRC_catchup_contribution_limit = 6000.00;
// Notice 1036 (Rev. December 2018) page 1
var withholding_allowance_rate = 4200.00;

// IRS Pub. 15, Table 7(a) SINGLE person, ANNUAL Payroll Period
var taxtableS = [ [3800.00, 0.00, 0.0], [13500.00, 0.10, 0.0], [43275.00, 0.12, 970.0],
                [88000.00, 0.22, 4543.0], [164525.00, 0.24, 14382.5], [207900.00, 0.32, 32748.5],
                [514100.00, 0.35, 46628.5], [-1, 0.37, 153798.5] ];

// IRS Pub. 15, Table 7(b) MARRIED person, ANNUAL Payroll Period
var taxtableM = [ [11800.00, 0.00, 0.0], [31200.00, 0.10, 0.0], [90750.00, 0.12, 1940.0],
                [180200.00, 0.22, 9086.0], [333250.00, 0.24, 28765.0], [420000.00, 0.32, 65497.0],
                [624150.0, 0.35, 93257.0], [-1, 0.37, 164709.50] ];

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
