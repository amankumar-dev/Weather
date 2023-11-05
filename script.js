const searchBar = document.querySelector('.search-bar');
const btn = document.querySelector('.search-icon');
const img=document.querySelector('.weather-img');
const detail=document.querySelector('.detail');
const tempe=document.querySelector('.temperature');
const city=document.querySelector('.city');
const humidity=document.querySelector('.percentage');
const wind=document.querySelector('.wind-per');
const container=document.querySelector('.container');
const loader=document.querySelector('.loading');

async function temp() {
    let value = searchBar.value;
    const url = `https://the-weather-api.p.rapidapi.com/api/weather/${value}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a9030757f8msh1f5e32ad610cf0bp148f4bjsnc946de35f5a7',
            'X-RapidAPI-Host': 'the-weather-api.p.rapidapi.com'
        }
    };
    loader.style.display = 'block';
    container.style.filter = 'blur(10px)';
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result.data.current_weather);
        let weather=result.data.current_weather;
        if(weather==='Partly Cloudy'||weather==='Cloudy'){
            weather='Mostly Cloudy';
        }
        if(weather==='Clear'){
            weather='Sunny';
        }
        if(weather==='Snowfall'||weather==='Heavy Snow'||weather==='Partly Snow'){
            weather='Snow';
        }
        city.textContent=`${weather} in ${value}`;
        if(weather==="Fog"){
            weather="Haze";
        }
        img.src=`./images/${weather}.png`;
        detail.textContent=`${result.data.aqi_description}`;
        tempe.textContent=`${result.data.temp}°c`;
        humidity.textContent=`${result.data.humidity}`;
        wind.textContent=`${result.data.wind}`;
        loader.style.display='none';
        container.style.filter='none';
    } catch (error) {
        alert(error);
        loader.style.display='none';
        container.style.filter='none';
    }
}

btn.addEventListener('click', temp);
window.addEventListener('load',()=>{
    loader.style.display='none';
    container.style.filter='none';
})