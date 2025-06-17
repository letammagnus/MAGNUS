const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const CurrentWeatherItemEl = document.getElementById("current-weather-item");
const timeZone = document.getElementById("time-zone");
const CountryEl = document.getElementById("country");
const WeatherForcastEl = document.getElementById("weather-forcast");
const CurrentTempEl = document.getElementById("current-temp");
var inputvalue = document.querySelector(".search-box");
var button = document.querySelector(".button");



const days = [
  "sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];



setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  let hour = time.getHours();
  const hoursIn24Format = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const ampm = hour >= 12 ? "PM" : "AM";

  timeEl.innerHTML = (hoursIn24Format  < 10? `0`+hoursIn24Format: hoursIn24Format) + `:` + (minutes < 10? '0' +minutes: minutes) + ` ` + `<span id="am-pm" class="am-pm">${ampm}</span>`;


  dateEl.innerHTML = days[day] + ", " + date + " " + months[month];
}, 1000);


button.addEventListener("click", function () {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=` +
    inputvalue.value +
    `&appid=d99ee8079a14c49cb15b8e1cde5a9f7f&units=metric`
  )


    .then(response => {
      if (response.status === 404) {
        // Handle 404 error (e.g., display a message to the user)
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".weather-icon").style.display = "none";
        document.querySelector(".time-zone").style.display = "none";
        document.querySelector(".country").style.display = "none";
        document.querySelector(".others").style.display = "none";

        console.log("Resource not fyound");


      } else {
        return response.json()

          .then(data => {
            console.log(data)
            showWeatherData(data);
            // Process data if the request was successful



            document.querySelector(".time-zone").innerHTML = `${data.name}`;
            document.querySelector(".country").innerHTML = `${data.sys.country}`;
            document.querySelector(".temp").innerHTML = `${Math.floor(data.main.temp)}<span>°c</span>`; document.querySelector(".desc").innerText = data.weather[0].main;
            document.querySelector(".hi-low").innerText = `${Math.floor(data.main.temp_min)}°c / ${Math.floor(data.main.temp_max)}°c`;

              

            const weatherIcon = document.querySelector('.weather-icon')

           if (data.weather[0].main == "Clouds") {
              weatherIcon.src = "images/Cloude.png";
            }
            else if (data.weather[0].main == "Clear") {
              weatherIcon.src = "images/clear.png";
            }
            else if (data.weather[0].main == "Drizzle") {
              weatherIcon.src = "images/drizzle.png";
            }
            else if (data.weather[0].main == "Rain") {
              weatherIcon.src = "images/rain.png";
            }
            else if (data.weather[0].main == "Mist") {
              weatherIcon.src = "images/mist.png";
            }
            else if (data.weather[0].main == "Thunderstorm") {
              weatherIcon.src = "images/Thunderstom.png";
            }
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".weather-icon").style.display = "flex";
            document.querySelector(".error").style.display = "none";
            document.querySelector(".time-zone").style.display = "flex";
            document.querySelector(".country").style.display = "flex";
            document.querySelector(".others").style.display = "flex";


          })

      }
    })



  /* .then((response) => response.json())
   .then((data) => {
     console.log(data)
     

     //document.querySelector("temp").innerHTML = `${Math.floor(data.main.temp)}<span>°c</span>`; 
    // document.querySelector(".desc").innerText = data.weather[0].main;
    // document.querySelector(".hi-low").innerText = `${Math.floor(data.main.temp_min)}°c / ${Math.floor(data.main.temp_max)}°c`;
 document.querySelector(".time-zone").innerHTML = `${data.name}`;
document.querySelector(".country").innerHTML = `${data.sys.country}`;
*/


  // })
})

function showWeatherData(data) {
  let { sunset, sunrise } = data.sys;
  let { pressure, humidity } = data.main;
  let { speed } = data.wind;
  CurrentWeatherItemEl.innerHTML = `
            <div class="weather-item">
              <p>Humidity</p>
              <div>${humidity}<span>%</span></div>
            </div>
             <div class="weather-item">
              <p>Pressure</p>
              <div>${pressure}</div>
            </div>
            
            <div class="weather-item">
              <p>Wind speed</p>
              <div>${speed}<span>km/h</span></div>
            </div>

                <div class="weather-item">
              <p>Sunrise</p>
              <div>${window.moment(sunrise * 1000).format("HH:mm a")}</div>
            </div>

             <div class="weather-item">
              <p>Sunset</p>
              <div>${window.moment(sunset * 1000).format("HH:mm a")}</div>
            </div>
             `;

/*
  otherDataForcast = ''
  data.forEach((day, idx) => {
    if (idx == 0) {

    } else {
      otherDataForcast += `
                <div class="the-icon">
      <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" class="weather-icon" alt="" />
    </div> `
    }
  })
WeatherForcastEl.innerHTML = otherDataForcast;
*/
}
