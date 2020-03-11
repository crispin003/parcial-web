Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

fetch('https://www.datos.gov.co/resource/wsrw-hr5d.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        generateTable(myJson);
        paintPolarChart(myJson);
    });

// funtions
function generateTable(elementsJson) {
    var table = document.getElementById("dataTable");
    var html = `
    <thead>
        <tr>
            <th>No</th>
            <th>INICIATIVA</th>
            <th>PROYECTO</th>
            <th>OPERADOR</th>
            <th>CATEGORIA DE DEPARTAMENTO</th>
            <th>CATEGORIA DE MUNICIPIO</th>
            <th>REGION</th>
            <th>CÓDIGO DANE DEL DEPARTAMENTO</th>
            <th>DEPARTAMENTO</th>
            <th>CÓDIGO DANE DEL MUNICIPIO 5 DIGITOS</th>
            <th>MUNICIPIO</th>
            <th>LOCALIDAD</th>
            <th>CANTIDAD</th>
            <th>NOMBRE ZONA WIFI</th>
            <th>ID ZONA WIFI</th>
            <th>DIRECCION</th>
            <th>LONGITUD</th>
            <th>LATITUD</th>
            <th>FECHA DE APROBACION</th>
            <th>ESTADO</th>
            <th>No APS</th>
            <th>FECHA FIN DE OPERACIÓN</th>
            <th>CAPACIDAD (Mbps)</th>
        </tr>
    </thead>
    <tfoot>
        <tr>
        <th>No</th>
        <th>INICIATIVA</th>
        <th>PROYECTO</th>
        <th>OPERADOR</th>
        <th>CATEGORIA DE DEPARTAMENTO</th>
        <th>CATEGORIA DE MUNICIPIO</th>
        <th>REGION</th>
        <th>CÓDIGO DANE DEL DEPARTAMENTO</th>
        <th>DEPARTAMENTO</th>
        <th>CÓDIGO DANE DEL MUNICIPIO 5 DIGITOS</th>
        <th>MUNICIPIO</th>
        <th>LOCALIDAD</th>
        <th>CANTIDAD</th>
        <th>NOMBRE ZONA WIFI</th>
        <th>ID ZONA WIFI</th>
        <th>DIRECCION</th>
        <th>LONGITUD</th>
        <th>LATITUD</th>
        <th>FECHA DE APROBACION</th>
        <th>ESTADO</th>
        <th>No APS</th>
        <th>FECHA FIN DE OPERACIÓN</th>
        <th>CAPACIDAD (Mbps)</th>
        </tr>
    </tfoot>
    <tbody>
    `;
    for (let json of elementsJson) {
        html += `
        <tr>
            <td>${json.no}</td>
            <td>${json.iniciativa}</td>
            <td>${json.proyecto}</td>
            <td>${json.operador}</td>
            <td>${json.categoria_de_departamento}</td>
            <td>${json.categoria_de_municipio}</td>
            <td>${json.region}</td>
            <td>${json.c_digo_dane_del_departamento}</td>
            <td>${json.departamento}</td>
            <td>${json.c_digo_dane_del_municipio}</td>
            <td>${json.municipio}</td>
            <td>${json.localidad}</td>
            <td>${json.cantidad}</td>
            <td>${json.nombre_zona_wifi}</td>
            <td>${json.id_zona_wifi}</td>
            <td>${json.direccion}</td>
            <td>${json.longitud}</td>
            <td>${json.latitud}</td>
            <td>${json.fecha_de_aprobacion}</td>
            <td>${json.estado}</td>
            <td>${json.no_aps}</td>
            <td>${json.fecha_fin_de_operaci_n}</td>
            <td>${json.capacidad_mbps}</td>
        </tr>
        `;
    }
    html += `
    </tbody>
        `;
    table.innerHTML = html;
}

function paintPolarChart(elementsJson) {
    var ctx = document.getElementById("myPolarChart");
    var data = [1]
    var labels = [elementsJson[0].departamento]
    var colors = [getRandomColor()]
    for (let json of elementsJson) {
        var isRepeated = false;
        var position = 0;
        for (var i = 0; i < labels.length; i++) {
            if (labels[i] == json.departamento) {
                isRepeated = true;
                position = i;
            }
        }
        if (!isRepeated) {
            labels[labels.length] = json.departamento;
            data[data.length] = 1;
            colors[colors.length] = getRandomColor();
        } else {
            data[position] += 1;
        }

    }

    var myPolarChart = new Chart(ctx, {
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
            }],
        },
        type: 'polarArea',
        options: {}
    });
}

function getRandomColor() {
    hexadecimal = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F")
    color_aleatorio = "#";
    for (i = 0; i < 6; i++) {
        posarray = aleatorio(0, hexadecimal.length)
        color_aleatorio += hexadecimal[posarray]
    }
    return color_aleatorio
}

function aleatorio(inferior, superior) {
    numPosibilidades = superior - inferior
    aleat = Math.random() * numPosibilidades
    aleat = Math.floor(aleat)
    return parseInt(inferior) + aleat
}