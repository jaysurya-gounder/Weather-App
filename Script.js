const api_key = "adf4e79d07a01a12ecf91a55558cdc70";
const inputBox = document.querySelector('#inpValue');
const locationBtn = document.getElementById('locationBtn');
const backBtn = document.getElementById('backBtn');
const weather_img = document.querySelector('.climateData');
const temperature = document.querySelector('#celciusData');
const description = document.querySelector('#cloudsData');
const location_data = document.getElementById('locationData');
const humidity = document.getElementById('humidityData');
const wind_speed = document.getElementById('windData');

const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.content');
const main_body = document.querySelector('.main');


async function getWeather(city, state) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`; 

  const weather_data = await fetch(`${url}`).then(response => response.json());
  
  console.log(weather_data)
  if (weather_data.cod === "404") {
    location_not_found.style.display = "flex";
    weather_body.style.display = "none";
    main_body.style.display = "none";
    console.log("error");
    return;
  } else {
    
    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "block";
    main_body.style.display = "none";
    location_data.innerHTML = `${weather_data.name}, ${state}`
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)} <sup>°C</sup>`;
    description.textContent = `${weather_data.weather[0].main}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;
  }

  switch (weather_data.weather[0].main) {
    case 'Clouds':
      weather_img.src = "./Images/cloud.png";
      break;
    case 'Clear':
      weather_img.src = "./Images/clear.png";
      break;
    case 'Rain':
      weather_img.src = "./Images/rain.png";
      break;
    case 'Mist':
      weather_img.src = "./Images/mist.png";
      break;
    case 'Snow':
      weather_img.src = "./Images/snow.png";
      break;
    case 'Smoke':
      weather_img.src = "./Images/smoke.png";
      break;

  }
}

 function getLocation() {
  if(navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function(position) {
       // Get latitude and longitude
       let lat = position.coords.latitude;
       let lon = position.coords.longitude;
       const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${5}&appid=${api_key}`
       const api_location = fetch(`${url}`)
       .then((response) => {return (response.json())})
       .then((data) => {return getWeather(data[0].name, data[0].state)})
    });
  } else {
    alert('Geolocation is not supported by this browser.');
  }
  }

locationBtn.addEventListener('click', () => {
  if(inputBox.value === '') {
    getLocation()
  } else {
    getWeather(inputBox.value);
  }
});

backBtn.addEventListener('click', () => {
  location_not_found.style.display = "none";
  weather_body.style.display = "none";
  main_body.style.display = "block";
});