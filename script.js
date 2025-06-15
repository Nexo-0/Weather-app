document.addEventListener("DOMContentLoaded", ()=>{
    console.log("weatherapp");
    let apiKey = 'e9129f4710d44d8eb7f171154242407';

    let defaultCity = "Pune";
    fetchWeatherData(defaultCity);

    document.getElementById('search-city',addEventListener('change',()=>{
        let city = document.getElementById('search-city').value;
        if(city) fetchWeatherData(city);
    }));

    function fetchWeatherData(city){
                fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`)
                .then(res=>res.json())
                .then(data => {
                    document.getElementById('city').textContent = data.location.name;
                    document.getElementById('temperature').textContent = `Temperature ${data.current.temp_c}`
                    document.getElementById('condition').textContent = `Condition ${data.current.condition.text}`
                    document.getElementById('weather-icon').src = `https:${data.current.condition.icon}`

                    let weeklyForecast = document.getElementById('weekly-forecast');
                    weeklyForecast.innerHTML = "";
                    data.forecast.forecastday.forEach(day => 
    {
                    let card = document.createElement('div');
                    card.className = 'card bg-secondary text-white p-2 text-center';
                    card.style.width = '110px';

                    card.innerHTML = `
        <strong>${new Date(day.date).toLocaleDateString('en-us',{weekday:'short'})}</strong>
        <img src="https:${day.day.condition.icon}" style="width=:40px; height=40px;/>
        <p style="margin: 0;">${day.day.avgtemp_c}°C</p>`

        weeklyForecast.appendChild(card);
    }
)
    
                })

            .catch(error=> console.error("Failed to fetch weather",error));
        
    }

    
});