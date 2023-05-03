const container = document.querySelector('.container');

const buttonLihatLokasi = document.querySelector('#lihat-lokasi');
const weatherBox = document.querySelector('.weather-box');

const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const APIKey = 'fcaebb6578e5b4dfa8a7a6e17a379873';

function displayDateTime() {
  var dateTime = new Date();
  var days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  var dayOfWeek = days[dateTime.getDay()];
  var date = dateTime.getDate();
  var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  var month = months[dateTime.getMonth()];
  var year = dateTime.getFullYear();
  var time = dateTime.toLocaleTimeString();
  var dateTimeString = `${time}<br> ${dayOfWeek}, ${date} ${month} ${year}`;
  // 
  document.getElementById('date-time').innerHTML = dateTimeString;
}

displayDateTime();
setInterval(displayDateTime, 1000);

if (window.navigator.geolocation) {
    // Geolocation available
    window.navigator.geolocation.getCurrentPosition(success, rejected);
}

function rejected() {
  weatherBox.innerHTML = ""; 
  buttonLihatLokasi.style.display = 'block';
}


function success(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(lat, lon)
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`)
    .then(response => response.json())
    .then(json => {
        console.log(json);
        // if (json.cod === '404') {
        //     container.style.height = '400px';
        //     weatherBox.style.display = 'none';
        //     weatherDetails.style.display = 'none';
        //     error404.style.display = 'block';
        //     error404.classList.add('fadeIn');
        //     return;
        // }

        // error404.style.display = 'none';
        // error404.classList.remove('fadeIn');

        const image = document.querySelector('#weather-img');
        const temperature = document.querySelector('#temperature');
        const description = document.querySelector('#description');
        const location = document.querySelector('#location');

        switch (json.weather[0].main) {
            case 'Mist':
                image.src = 'public/images/mist.png';
                break;
                
            case 'Clear':
                image.src = 'public/images/clear.png';
                break;

            case 'Rain':
                image.src = 'public/images/rain.png';
                break;

            case 'Snow':
                image.src = 'public/images/snow.png';
                break;

            case 'Clouds':
                image.src = 'public/images/cloud.png';
                break;

            case 'Haze':
                image.src = 'public/images/mist.png';
                break;

            default:
                image.src = '';
        }

        location.innerHTML = `${json.name}`;
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        

        // weatherBox.style.display = '';
        // weatherDetails.style.display = '';
        // weatherBox.classList.add('fadeIn');
        // weatherDetails.classList.add('fadeIn');
        // container.style.height = '590px';


    });
}

