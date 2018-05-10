t = {
            symbol: 'circle'
            , radius: 0.1
        };
        var defcircle = {
            symbol: 'circle'
            , radius: 2.4
        };
        var defdiamond = {
            symbol: 'diamond'
            , radius: 2.6
        };
        var leftGrowth = new Array();
        var rightGrowth = new Array();

        function get_pay_freq(paySchedule) {
            if (paySchedule == 'Biweekly') return 26.0;
            if (paySchedule == 'Weekly') return 52.0;
            if (paySchedule == 'Semimonthly') return 24.0;
            if (paySchedule == 'Monthly') return 12.0;
            return 1.0;
        }
        // Calculate how much FERS will match users contrib
        function FERSmatch(matchPercent) {
            if (matchPercent <= 0.00) {
                return 0.01;
            }
            if (matchPercent >= 0.05) {
                return matchPercent + 0.05;
            }
            if (matchPercent <= 0.03) {
                return matchPercent * 2 + 0.01;
            }
            // all that's left is between 3% and 5%
            return (matchPercent - 0.03) * 1.5 + 0.07;
        }
        // Calculate how much USBRS will match users contrib
        function USBRSmatch(years, months, matchPercent) {
            if (years > 26) {
                return matchPercent;
            }
            if ((years <= 1) && (months <= 2)) {
                return matchPercent;
            }
            if (years <= 2) {
                return FERSmatch(0.0) + matchPercent;
            }
            return FERSmatch(matchPercent);
        }

        function openclose(id) {
            var e = document.getElementById(id);
            if (e.style.display == 'block') e.style.display = 'none';
            else e.style.display = 'block';
        }
        // the color names below are not HTML defined names, just a close name to identify what is on the screen
        // var colorLeft = '#9C1B9C';
        // var colorRight = '#F4B55B';
        var colorLeft = '#00b5e2';
        var colorRight = '#004986';
        var colorTrad = '#9C1B9C';
        var colorAgency = '#58A4C3';
        var colorRoth = '#EA6A17';
        var colorGrowthTrad = '#C679DD';
        var colorGrowthRoth = '#F4B55B';
        var colors = new Array();
        colors[0] = colorGrowthTrad;
        colors[1] = colorGrowthTrad;
        colors[2] = colorGrowthRoth;
        colors[3] = colorAgency;
        colors[4] = colorRoth;
        colors[5] = colorTrad;
        var accountBalance = new Array();
        var accountGrowth = new Array();
        var contributions = new Array();
        var contributionGrowth = new Array();
        var matching;
        var matchingGrowth;
        var total = new Array();
        var salary = new Array();

        function setData(percent, verbose) {
            accountBalance = new Array();
            accountGrowth = new Array();
            contributions = new Array();
            contributionGrowth = new Array();
            matching = new Array();
            matchingGrowth = new Array();
            total = new Array();
            salary = new Array();
            // These variables hold values used in the calculations
            var agency = 'agency';
            var isMatching = false;
            // var rs = 'FERS';
            var contributionsText = 'Contributions';
            if ((rs == 'FERS') || (rs == 'USBRS')) {
                contributionsText = 'Contributions*';
                isMatching = true;
                if (rs == 'USBRS') {
                    agency = 'service';
                }
            }
            var matchFootnoteChart = '*Includes any ' + agency + '<BR>&nbsp;&nbsp;contributions';
            var matchFootnoteTable = '*Includes any ' + agency + ' contributions';
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
            var annualPayPercent = percent;
            var annualPayIncreasePercent = 0.0; // parseFloat($('#annualPayIncreasePercent').val());
            var yearsServed = parseInt(0);
            var catchupAmount = parseInt(0);
            var rateOfReturn = 6.0; // parseFloat($('#rateOfReturn').val());
            var growthSelector = 'bothGrowth';
            if (rs == 'BP') {
                growthSelector = 'balanceOnly';
            }
            // if (growthSelector == 'futureOnly') { amountToUse = 0; }
            // if (growthSelector == 'balanceOnly') { yearsToContribute = 0; }
            // alert(growthSelector);
            // loop control
            var periodLength = get_pay_freq(paySchedule);
            if (rs == 'US') {
                periodLength = 12.0;
            }
            if (rs == 'USBRS') {
                periodLength = 12.0;
            }
            if (rs == 'BP') {
                periodLength = 1.0;
            }
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
            if (rs == 'FERS') {
                annualPayRate = FERSmatch(annualPayRate);
            }
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
            total[year] = accountBalance[year] + accountGrowth[year] + contributions[year] + contributionGrowth[year] + matching[year] + matchingGrowth[year];
            salary[year] = parseFloat((annualPay / periodLength).toFixed(2));
            salary[year + 1] = salary[year];
            for (year = 1; year <= yearsToGo; year++) {
                accountBalance[year] = parseFloat(amountToUse);
                accountGrowth[year] = accountGrowth[year - 1];
                contributions[year] = contributions[year - 1];
                contributionGrowth[year] = contributionGrowth[year - 1];
                matching[year] = matching[year - 1];
                matchingGrowth[year] = matchingGrowth[year - 1];
                if (year > 1) {
                    salary[year] = parseFloat((salary[year - 1] * annualPayIncreaseRate).toFixed(2));
                }
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
                        if (period <= catchupCatchup) {
                            contributions[year] += 0.01;
                        }
                    }
                }
                accountGrowth[year] += parseFloat(((accountBalance[year - 1] + accountGrowth[year - 1]) * (rateOfReturn / 100.0)).toFixed(2));
                total[year] = accountBalance[year] + accountGrowth[year] + contributions[year] + contributionGrowth[year] + matching[year] + matchingGrowth[year];
            }
            if (verbose) {
                console.log("Percent is " + percent);
                console.log('year, balance, growth, contribution, growth, matching, growth');
                for (year = 0; year <= yearsToGo; year++) {
                    console.log(year + ', ' + accountBalance[year].toFixed(2) + ', ' + accountGrowth[year].toFixed(2) + ', ' + contributions[year].toFixed(2) + ', ' + contributionGrowth[year].toFixed(2) + ', ' + matching[year].toFixed(2) + ', ' + matchingGrowth[year].toFixed(2));
                }
            }
        }
        var defdot = {
            symbol: 'circle'
            , radius: 0.1
        };
        var defcircle = {
            symbol: 'circle'
            , radius: 2.4
        };
        var defdiamond = {
            symbol: 'diamond'
            , radius: 2.6
        };
        var chart;

        function dataBoth() {
            return [
                {
                    name: 'left'
                    , legendIndex: 1
                    , marker: defcircle
                    , color: colorLeft
                    , data: leftGrowth
                }
                , {
                    name: 'right'
                    , legendIndex: 2
                    , marker: defcircle
                    , color: colorRight
                    , data: rightGrowth
                }
    ];
        }

        function makeChart(tickInterval) {
            if (typeof (tickInterval) === 'undefined') tickInterval = 5;
            /* Chart Drawing */
            var plotdata = dataBoth();
            return new Highcharts.Chart({
                credits: {
                    enabled: false
                }
                , chart: {
                    renderTo: 'chart'
                    , type: 'line'
                }
                , legend: {
                    enabled: true
                    , align: 'right'
                    , layout: 'vertical'
                    , verticalAlign: 'top'
                    , useHTML: true
                    , margin: 8
                    , x: -3
                    , backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white'
                    , borderColor: '#CCC'
                    , symbolWidth: 10
                    , symbolPadding: 3
                    , shadow: false
                }
                , title: {
                    //      x: -40,
                    //      margin: 30,
                    //      text: 'Projected Savings Growth'
                    text: ''
                }, //    subtitle: { text: 'Subtitle' },
                xAxis: {
                    tickInterval: tickInterval
                    , tickmarkPlacement: 'on'
                    , title: {
                        text: 'Years'
                    }
                }
                , yAxis: {
                    title: {
                        text: ''
                    }
                    , labels: {
                        formatter: function () {
                            return CurrencyFormatted(this.value, 'no_cent')
                        }
                    }
                }
                , tooltip: {
                    // valueSuffix: ' millions',
                    useHTML: true
                    , borderColor: '#aaaaaa'
                    , crosshairs: true, //      positioner: function (boxWidth, boxHeight, point) {
                    //        var x = point.plotX;
                    //        if (point.plotX > 350) { x = 350; }
                    //        var y = point.plotY;
                    //        if (point.plotY > 225) { y = 225; }
                    //        return { x: x, y: y };
                    //      },
                    formatter: function () {
                        var yValues = new Array();
                        var output = '<table>' + '<tr><td><strong>Year ' + this.x + '</strong>:</td></tr>';
                        // output += '<tr><td>&nbsp;</td></tr>';
                        var j = 0;
                        for (j = chart.series.length - 1; j >= 0; j--) {
                            if ((chart.series[j].visible) && (chart.series[j].data.length > this.x)) {
                                output += '<tr align=right>';
                                output += '<td align=left>' + chart.series[j].name + ':</td><td><strong>';
                                output += CurrencyFormatted(chart.series[j].data[this.x].y) + '</strong></td>';
                                yValues.push(chart.series[j].data[this.x].y);
                                output += '</tr>';
                            }
                        }
                        output += '<tr><td colspan=2><hr></td></tr>';
                        output += '<tr><td>Total Projected Balance: &nbsp;&nbsp;&nbsp;</td><td><strong>' + CurrencyFormatted(total[this.x]) + '</strong></td></tr>';
                        output += '</table>';
                        return output;
                    }, //      formatter: function() {
                    //      return CurrencyFormatted(this.y, 'no_cent')
                    //      },
                    shared: true
                }
                , plotOptions: {
                    area: {
                        stacking: 'normal'
                        , lineColor: '#666666'
                        , lineWidth: 1
                        , events: {
                            legendItemClick: function () {
                                return false;
                            }
                        } // disable disabling of plot items
                    }
                }
                , series: plotdata
            });
        }

        function goodMax(year) {
            // return Math.round(Math.max(parseFloat(trad1Growth[year]),parseFloat(roth1Growth[year]), parseFloat(trad2Growth[year]),parseFloat(roth2Growth[year])) * 1.07);
            // return Math.round(Math.max(parseFloat(trad1Growth[year])+parseFloat(roth1Growth[year]), parseFloat(trad2Growth[year])+parseFloat(roth2Growth[year])) * 1.07);
            return total[year] * 1.07;
        }
        var stack1 = 'Scenario1';
        // var stack2 = '2Roth';
        var stack2 = 'Scenario2';

        function makeBar(side, chartMax, year) {
            var borderColor = colorLeft;
            if (side == 'rightBar') {
                borderColor = colorRight;
            }
            return new Highcharts.Chart({
                credits: {
                    enabled: false
                }
                , chart: {
                    height: 370
                    , spacingBottom: 20, //              marginTop: 100,
                    //                zoomType: 'y',
                    //              redraw: function() { check_labels(); },
                    type: 'column'
                    , renderTo: side
                }
                , title: {
                    text: null
                }
                , xAxis: {
                    categories: [' '], //                categories: ['Scenario 1', 'Scenario 2'],
                    labels: {
                        y: 25
                        , style: {
                            font: '14px Helvetica'
                            , fontWeight: 'bold'
                        }
                    }
                    //              useHTML : true
                }
                , yAxis: {
                    min: 0
                    , max: chartMax
                    , title: {
                        text: ''
                    }
                    , startOnTick: false
                    , endOnTick: false
                    , alignTicks: false
                    , gridLineWidth: 1
                    , labels: {
                        enabled: false
                    }
                    , stackLabels: {
                        formatter: function () {
                            return '<strong>' + CurrencyFormatted(this.total) + '</strong>';
                        }
                        , enabled: true
                        , style: {
                            fontWeight: 'bold'
                            , fontSize: '8pt'
                            , color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                        }
                    }
                }
                , legend: {
                    useHTML: true
                    , enabled: true
                    , align: 'top'
                    , itemStyle: {
                        fontSize: '8px'
                    }
                    , layout: 'vertical'
                    , verticalAlign: 'top'
                    , margin: 8
                    , x: -3
                    , backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white'
                    , borderColor: '#CCC'
                    , symbolWidth: 10
                    , symbolPadding: 3
                    , title: {
                        text: 'City<br/><span style="font-size: 9px; color: #666; font-weight: normal">(Click to hide)</span>'
                        , style: {
                            fontStyle: 'italic'
                        }
                    }
                    , shadow: false
                }
                , tooltip: {
                    positioner: function (labelWidth, labelHeight, point) {
                        var x = 212;
                        if ((this.chart.hoverSeries.data[0].series.stackKey).indexOf("Scenario2") >= 0) {
                            x = 88;
                        }
                        var y = 50;
                        if (point.plotY > 50) {
                            y = point.plotY;
                        }
                        if (point.plotY > 100) {
                            y = 100;
                        }
                        // if (point.plotX > 200) { return { x: 117, y: y }; }
                        return {
                            x: x
                            , y: y
                        };
                    }
                    , useHTML: true
                    , borderColor: '#aaaaaa', //
                    backgroundColor: 'white',
                    formatter: function () {
                        if (this.series.index <= 0) {
                            return null;
                        }
                        var idx = 0;
                        var key = 'Scenario 1';
                        if ((this.series.index % 2) <= 0) {
                            key = 'Scenario 2';
                        }
                        // var output = '<table><tr><td style="text-align:center; font-weight:bold; color:black" colspan=2>' + key + '</td></tr>';
                        var output = '<table><tr><td align=center colspan=2><strong>' + key + '</strong></td></tr>';
                        output += '<tr><td style="color:white">&nbsp;</td></tr>';
                        var data = this.series.xAxis.series;
                        output += '<tr align=right>';
                        output += '<td style="font-weight:bold; color:' + 'black' + '">' + 'Total' + ': </td>' + '<td style="font-weight:bold; color: black">' + CurrencyFormatted(this.point.stackTotal) + '</td>';
                        output += '</tr>';
                        var j = this.series.index % 2;
                        for (; j < data.length; j += 2) {
                            output += '<tr align=right>';
                            if (data[j].points[idx].y > 0) {
                                output += '<td style="font-weight:bold; color:' + data[j].color + '">' + data[j].name + ': </td>' + '<td style="font-weight:bold; color: black">' + CurrencyFormatted(data[j].points[idx].y) + '</td>';
                            }
                            output += '</tr>';
                        }
                        output += '</table>';
                        return output;
                    }
                }
                , plotOptions: {
                    borderWidth: 0.1
                    , shadow: false
                    , column: {
                        shadow: false
                        , borderColor: borderColor
                        , pointWidth: 50
                        , pointPadding: 0.25
                        , groupPadding: 0.05
                        , stacking: 'normal'
                        , dataLabels: {
                            enabled: true
                            , padding: 0
                            , color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'black'
                            , formatter: function () {
                                if (this.y == -0.00005) {
                                    return side;
                                }
                                if (this.y == -0.00005) {
                                    return 'Scenario 1';
                                }
                                if (this.y == -0.00006) {
                                    return 'Scenario 2';
                                }
                                if (this.y == 0.0) {
                                    return '';
                                };
                                return '<strong>' + CurrencyFormatted(this.y) + '</strong>';
                            }
                        }
                        , events: {
                            legendItemClick: function () {
                                return false;
                            }
                        }
                    }
                }
                , series: [{
                    name: '<b>Contribution Type</b>'
                    , stack: stack1
                    , color: 'white'
                    , data: [0]
                        //            }, {
                        //                name: 'Agency', stack: stack1, color: colorAgency,
                        //                        // data: [parseFloat(FERSauto) + parseFloat(FERSmatch1)]
                        //                        data: [parseFloat(accountGrowth[year])]
            }, {
                    name: 'Matching Growth'
                    , stack: stack1
                    , color: 'cornflowerblue'
                    , data: [parseFloat(matchingGrowth[year])]
            }, {
                    name: 'Matching'
                    , stack: stack1
                    , color: 'seagreen'
                    , data: [parseFloat(matching[year])]
            }, {
                    name: 'Contribution Growth'
                    , stack: stack1
                    , color: colorTrad
                    , data: [parseFloat(contributionGrowth[year])]
            }, {
                    name: 'Contributions'
                    , stack: stack1
                    , color: colorGrowthTrad
                    , data: [parseFloat(contributions[year])]
            }, {
                    name: 'Growth'
                    , stack: stack1
                    , color: colorRoth
                    , data: [parseFloat(accountGrowth[year])]
            }, {
                    name: 'Balance'
                    , stack: stack1
                    , color: colorGrowthRoth
                    , data: [parseFloat(accountBalance[year])]
            }, {
                    dataLabels: {
                        verticalAlign: 'top'
                        , x: 0
                        , y: 3
                        , crop: false
                        , color: borderColor
                        , style: {
                            fontWeight: 'bold'
                            , fontSize: '11pt'
                        }
                    }
                    , name: 'S1'
                    , stack: stack1
                    , showInLegend: false
                    , color: borderColor
                    , data: [-0.00005]
                        // dataLabels: { verticalAlign: 'top', x: 0, y: 3, crop: false, color: '#666666', style: { fontWeight: 'bold', fontSize: '11pt' } },
                        // name: 'S1', stack: stack1, showInLegend: false, color: '#666666', data: [-0.00005]
            }]
            });
        }

        function make2Bar(side, leftTotal, rightTotal, leftPercent, rightPercent) {



  var borderColor = colorLeft;

  return  new Highcharts.Chart({

        chart: {

            renderTo: side,

            defaultSeriesType: 'column'

        },

        title: { text: '', x: -20 },

        credits: { enabled: false },

        plotOptions: {

            column: {

                    dataLabels: {

                        verticalAlign: 'top', y: -20,

                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'black',

                        formatter: function() {

                            if (this.y == null) return '';

                            return '<strong>' + CurrencyFormatted(this.y, 'no_cent') + '</strong>'; },

                        enabled: true,

                        crop: false,

                        overflow: false,

                        style: {"fontWeight":"bold"}

                    },

                    inside: false,

                    shadow: false,

                    point:{"events":{}},

                    pointWidth: 120,

                    pointPadding: 0.4,

                    groupPadding: 0.0,

                    borderWidth: 1,

                    borderColor: 'black',

                    stacking: 'normal'

                }

        },

        tooltip: { enabled: false, },

        legend: { enabled: false, },

        xAxis: {

            title: { text: null },

            labels: { y: 25, style: { color: 'black' } },

            categories: ['Default contribution (3%)', 'MatchingFunds (5%)'],

            minPadding: 0,

            maxPadding: 0

        },

        yAxis: {

            title: {

                text: '', align: 'high'

            },

                startOnTick: false, endOnTick: false, alignTicks: false,

                gridLineWidth: 0, labels: { enabled: false }

        },

        series: [{

            name: 'left',

            color: '#00B5E2',

            data: [leftTotal, null]

        }, {

            name: 'right',

            color: '#004986',

            data: [null, rightTotal]

        }]

        });

}

        function reDraw() {
            var maxYears = parseInt($('#retire').val() - $('#age').val()); // parseInt($('#yearsToContribute').val()) + parseInt($('#yearsToGo').val());
            var leftPercent = 3; // parseInt($('#leftPercent').val());
            var rightPercent = 5; // parseInt($('#rightPercent').val());
            if ((leftPercent < 5) || (rightPercent < 5)) {
                $('#bonusWarning').show();
            }
            else {
                $('#bonusWarning').hide();
            }
            // setData(rightPercent, 0);
            //   var maxTotal = total[maxYears];
            setData(leftPercent, 1);
            var leftTotal = total[maxYears];
            //   if (maxTotal < total[maxYears]) { maxTotal = total[maxYears]; }
            //   maxTotal = maxTotal * 1.10;
            // makeBar('leftBar', maxTotal, maxYears);
            leftGrowth = total.slice();
            setData(rightPercent, 1);
            var rightTotal = total[maxYears];
            // makeBar('rightBar', maxTotal, maxYears);
            rightGrowth = total.slice();
            // chart = makeChart(parseInt(maxYears / 10));
            // chart.lbl = chart.renderer.label('match', 508, 100, null, null, null, true).css({ fontSize: '12', textAlign: 'left'}).add();
            console.log(leftTotal, rightTotal);
            make2Bar('bar', leftTotal, rightTotal, leftPercent, rightPercent);
            // now lets set the text
            var salary = parseInt($('#salary').val());
            var perpay = (salary / 12.0) * 0.02;
            var newText = "<h2>" + CurrencyFormatted(rightTotal, 'no_cent') + "* earned with as little as " + CurrencyFormatted(perpay) + " per paycheck.</h2>" + "Don't leave " + CurrencyFormatted(rightTotal - leftTotal, 'no_cent') + " on the table.";
            $('#message').html(newText);
        }
