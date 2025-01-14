export const getLiveWeather = async (
    latitude, 
    longitude, 
    weatherApiKey,
    setLoadingWeather, 
    setWeatherIcon,
    setTemp,
    setCity,
    setCountry,
    setHumidity,
    setCondition,
    setWindSpeed,
    setWindDirection,
    setError) => {
        console.log(latitude,longitude);
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${latitude},${longitude}&aqi=no`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const data = await response.json();
    console.log(data);
    if(!data){
        setError("Unable to fetch weather Information");
    }
    else{
        setWeatherIcon(data.current.condition.icon);
        setTemp(data.current.temp_c);
        setCity(data.location.name);
        setCountry(data.location.country);
        setCondition(data.current.condition.text);
        setWindSpeed(data.current.wind_kph);
        setWindDirection(data.current.wind_dir);
        setHumidity(data.current.humidity);
    }
    setLoadingWeather(false);
   
  };
  