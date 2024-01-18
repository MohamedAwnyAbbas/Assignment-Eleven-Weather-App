// Weather API Key : 32554aea7f334130ba0193444241501

let apiTodayCond;
let apiCity;
let searchInput = document.querySelector("#search");
let weather;
let weatherData;
// First Day
let today = document.querySelector("#today");
let todayDate =  document.querySelector("#today-date");
let city = document.querySelector("#city");
let todayDegree =  document.querySelector("#today-degree");
let todayIcon = document.querySelector("#today-icon");
let todayCond = document.querySelector("#today-condition");

//Second Day
let tommorrow = document.querySelector("#tmw");
let tmwIcon = document.querySelector("#tmw-icon");
let tmwDegreeMax = document.querySelector("#tmw-degree-max");
let tmwDegreeMin = document.querySelector("#tmw-degree-min");
let tmwCond = document.querySelector("#tmw-condition");

//Third Day
let thirdDay = document.querySelector("#third-day");
let thirdDayIcon = document.querySelector("#third-day-icon");
let thirdDayDegMax = document.querySelector("#third-day-degree-max");
let thirdDayDegMin = document.querySelector("#third-day-degree-min");
let ThirdDayCon = document.querySelector("#third-day-condition");

//Fetch Weather Data Function
async function getWeather(parsedWeatherData=null,weatherLocationData=null)
{
    if(parsedWeatherData!=null)
    {
         weatherData = parsedWeatherData;
    }
    else if(weatherLocationData!=null&&parsedWeatherData==null)
    {
         weatherData = weatherLocationData;   
    }
    else
    {
        weather = await fetch("https://api.weatherapi.com/v1/forecast.json?key=32554aea7f334130ba0193444241501&q=giza&days=3", {method: "GET"});
        weatherData = await weather.json()
    }
        console.log(weatherData);
        apiTodayCond = weatherData.current.condition;
        apiCity =  weatherData.location.name;
        //Fisrt Day
        city.innerHTML = apiCity;
        todayDegree.innerHTML = weatherData.current.temp_c+"°C";
        todayCond.innerHTML = apiTodayCond.text;
        todayIcon.innerHTML = `<img src=${apiTodayCond.icon}>`;
        //Second Day
        tmwIcon.innerHTML = `<img src=${weatherData.forecast.forecastday[1].day.condition.icon}>`;
        tmwDegreeMax.innerHTML = weatherData.forecast.forecastday[1].day.maxtemp_c+"°C";
        tmwDegreeMin.innerHTML = weatherData.forecast.forecastday[1].day.mintemp_c+"°C";
        tmwCond.innerHTML = weatherData.forecast.forecastday[1].day.condition.text;
        //Third Day
        thirdDayIcon.innerHTML = `<img src=${weatherData.forecast.forecastday[2].day.condition.icon}>`;
        thirdDayDegMax.innerHTML = weatherData.forecast.forecastday[2].day.maxtemp_c+"°C";
        thirdDayDegMin.innerHTML = weatherData.forecast.forecastday[2].day.mintemp_c+"°C";
        ThirdDayCon.innerHTML = weatherData.forecast.forecastday[2].day.condition.text;
    
}

getWeather();

//Search function
async function search()
{
     weather =  await fetch("https://api.weatherapi.com/v1/forecast.json?key=32554aea7f334130ba0193444241501&q="+this.value+"&days=3", {method: "GET"});
    let parsedWeatherData = await weather.json();
    getWeather(parsedWeatherData);
}
 searchInput.addEventListener("input",search)

 //Get Location
async function getWeatherByLocation() 
{
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const { latitude, longitude } = position.coords;
      weather = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=32554aea7f334130ba0193444241501&q=${latitude},${longitude}&days=3`, { method: "GET" });
      let weatherLocationData = await weather.json();
      getWeather(weatherLocationData);
}
getWeatherByLocation();

let date = new Date;
let day = date.getDay();
let allDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let month = date.getMonth();
let allMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"];
today.innerHTML = allDays[day];
let dateFormatter = new Intl.DateTimeFormat("en-US", { day: "numeric" });
let dayFormat = dateFormatter.format(date);
todayDate.innerHTML = dayFormat+" "+allMonths[month];
tommorrow.innerHTML = allDays[day+1];
thirdDay.innerHTML = allDays[day+2];
