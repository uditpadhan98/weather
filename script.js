const form=document.querySelector("form");
const weather=document.querySelector("#city-temp");
const search=document.querySelector("#search");
const api_key=`3265874a2c77ae4a04bb96236a642d2f`;
const placeName=document.getElementById('place-name');
const date=document.querySelector("#date");
const coord=document.getElementById('coord');
const info=document.getElementById('info');
const getWeather=async(city)=>{
    weather.innerHTML="<h2>Loading..</h2>"
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
    const response=await fetch(url);
    const data=await response.json();
    console.log(data);
    return showWeather(data);
}

const showWeather=(data)=>{
    if (data.cod=="404") {
        weather.innerHTML=`<h2> City not found</h2>`
        return;
    }
    let now = new Date();
    placeName.innerHTML=`
        <div id="place-name">
            <h1>${data.name}<h1>
            <h3>${date.innerText = dateBuilder(now)}</h3>
        </div>`;

    info.innerHTML=`<h2>Feels Like : ${data.main.feels_like} ℃</h2>`  

    coord.innerHTML=`
            <h1>Coordination</h1>
            <h2>Longitude : ${data.coord.lon}</h2>
            <h2>Latitude : ${data.coord.lat}</h2>
        `
    
    weather.innerHTML = `
        <div>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
        </div>
        <div>
            <h2>${data.main.temp} ℃</h2>
            <h4>${data.weather[0].main}</h4>
        </div>
    `
}
form.addEventListener("submit",
function(event){
    getWeather(search.value);
    event.preventDefault();
})


function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
}