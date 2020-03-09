// console.log(doGet('https://www.datos.gov.co/resource/x84b-t6fw.json'))

// funtions
function doGet(url) {
    var json;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            console.log(myJson)
            json = myJson
            
        });
}
