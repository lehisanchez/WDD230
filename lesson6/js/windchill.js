function calculateWindChill() {

    let temperature = parseFloat(document.getElementById('currentTemperature').innerHTML)
    let speed       = parseFloat(document.getElementById('currentWindSpeed').innerHTML)
    let factor      = windChill(temperature,speed)

    if (temperature <= 50 && speed > 3) {
        document.getElementById("currentWindChill").innerHTML = factor + "&deg; F"
    } else {
        document.getElementById("currentWindChill").innerHTML = "N/A"
    }

}

function windChill(t,s) {
    let f = 35.74 + 0.6215 * t - 35.75 * (s ** 0.16) + 0.4275 * t * (s ** 0.16)
    return Math.round(f)
}

calculateWindChill();