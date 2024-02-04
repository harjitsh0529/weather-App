import "./App.css";
import React, { useEffect, useState } from "react";
import Highlight from "./components/Highlight";
import Temperature from "./components/Temperature";
function App() {
  const [city, setCity] = useState("New Delhi");
  const [weatherData, setWeatherData] = useState(null);

  const ApiUrl = `https://api.weatherapi.com/v1/current.json?key=458adc3bdb8c4ad3b4c65153240402&q=${city}&aqi=no`;

  //calling the weather api using fetch keywird

  useEffect(() => {
    fetch(ApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [city]);
  return (
    <>
      <div className="bg-[#1F213A] h-screen flex justify-center align-top">
        <div className=" mt-40 w-1/5 h-1/3">
          {weatherData && (
            <Temperature
              setCity={setCity}
              stats={{
                temp: weatherData?.current?.temp_c,
                condition: weatherData?.current?.condition.text,
                isDay: weatherData?.current?.is_day,
                location: weatherData?.location?.name,
                time: weatherData?.location?.localtime,
              }}
            />
          )}
        </div>
        <div className="mt-40 w-1/3 h-1/3 p-10 grid grid-cols-2 gap-6">
          <h1 className="text-slate-200 text-2xl col-span-2">
            Today's Highlights
          </h1>
          {weatherData && (
            <>
              <Highlight
                stats={{
                  title: "Wind Status",
                  value: weatherData.current.wind_mph,
                  unit: "mph",
                  direction: weatherData.current.wind_dir,
                }}
              />
              <Highlight
                stats={{
                  title: "Humidity",
                  value: weatherData.current.humidity,
                  unit: "%",
                }}
              />{" "}
              <Highlight
                stats={{
                  title: "Visibility",
                  value: weatherData.current.vis_miles,
                  unit: "miles",
                }}
              />{" "}
              <Highlight
                stats={{
                  title: "Air pressure",
                  value: weatherData.current.pressure_mb,
                  unit: "mb",
                }}
              />{" "}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
