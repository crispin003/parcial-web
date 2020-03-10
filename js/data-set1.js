Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

fetch('https://www.datos.gov.co/resource/yec2-e4mm.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        paintComponents(myJson);
        generateTable(myJson);
    });

//funtions        
function paintComponents(jsonElements) {
    // console.log(json);
    var ctx = document.getElementById("myBarChart");
    var jsonSize = jsonElements.length
    console.log(jsonSize);
    var visitsPerMonth = [
        jsonElements[jsonSize - 1].enero_2018,
        jsonElements[jsonSize - 1].febrero_2018,
        jsonElements[jsonSize - 1].marzo_2018,
        jsonElements[jsonSize - 1].abril_2018,
        jsonElements[jsonSize - 1].mayo_2018,
        jsonElements[jsonSize - 1].junio_2018,
        jsonElements[jsonSize - 1].julio_2018,
        jsonElements[jsonSize - 1].agosto_2018,
        jsonElements[jsonSize - 1].septiembre_2018,
        jsonElements[jsonSize - 1].octubre_2018,
        jsonElements[jsonSize - 1].noviembre_2018,
        jsonElements[jsonSize - 1].diciembre_2018
    ];

    var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
                "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ],
            datasets: [{
                label: "Visitas",
                backgroundColor: "#4e73df",
                hoverBackgroundColor: "#2e59d9",
                borderColor: "#4e73df",
                data: visitsPerMonth,
            }],
        },
        options: {
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 10,
                    right: 25,
                    top: 25,
                    bottom: 0
                }
            },
            scales: {
                xAxes: [{
                    time: {
                        unit: 'month'
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        maxTicksLimit: 6
                    },
                    maxBarThickness: 25,
                }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 4000,
                        maxTicksLimit: 5,
                        padding: 10,
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values) {
                            return number_format(value);
                        }
                    },
                    gridLines: {
                        color: "rgb(234, 236, 244)",
                        zeroLineColor: "rgb(234, 236, 244)",
                        drawBorder: false,
                        borderDash: [2],
                        zeroLineBorderDash: [2]
                    }
                }],
            },
            legend: {
                display: false
            },
            tooltips: {
                titleMarginBottom: 10,
                titleFontColor: '#6e707e',
                titleFontSize: 14,
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                caretPadding: 10,
                callbacks: {
                    label: function (tooltipItem, chart) {
                        var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                        return datasetLabel + " " + number_format(tooltipItem.yLabel);
                    }
                }
            },
        }
    });
}

function number_format(number, decimals, dec_point, thousands_sep) {
    // *     example: number_format(1234.56, 2, ',', ' ');
    // *     return: '1 234,56'
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

function generateTable(elementsJson) {
    var table = document.getElementById("dataTable");
    var html = `
    <thead>
        <tr>
            <th>Rango de edad</th>
            <th>Enero</th>
            <th>Febrero</th>
            <th>Marzo</th>
            <th>Abril</th>
            <th>Mayo</th>
            <th>Junio</th>
            <th>Julio</th>
            <th>Agosto</th>
            <th>Septiembre</th>
            <th>Octubre</th>
            <th>Noviembre</th>
            <th>Diciembre</th>
            <th>Total</th>
        </tr>
    </thead>
    <tfoot>
        <tr>
        <th>Rango de edad</th>
        <th>Enero</th>
        <th>Febrero</th>
        <th>Marzo</th>
        <th>Abril</th>
        <th>Mayo</th>
        <th>Junio</th>
        <th>Julio</th>
        <th>Agosto</th>
        <th>Septiembre</th>
        <th>Octubre</th>
        <th>Noviembre</th>
        <th>Diciembre</th>
        <th>Total</th>
        </tr>
    </tfoot>
    <tbody>
    `;
    for (let json of elementsJson) {
        html += `
        <tr>
            <td>${json.rango_de_edad}</td>
            <td>${json.enero_2018}</td>
            <td>${json.febrero_2018}</td>
            <td>${json.marzo_2018}</td>
            <td>${json.abril_2018}</td>
            <td>${json.mayo_2018}</td>
            <td>${json.junio_2018}</td>
            <td>${json.julio_2018}</td>
            <td>${json.agosto_2018}</td>
            <td>${json.septiembre_2018}</td>
            <td>${json.octubre_2018}</td>
            <td>${json.noviembre_2018}</td>
            <td>${json.diciembre_2018}</td>
            <td>${json.totales}</td>
        </tr>
        `;
    }
    html += `
    </tbody>
        `;
    table.innerHTML = html;
}