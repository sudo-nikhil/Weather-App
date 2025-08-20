import { useState } from 'react'
import axios from "axios";
import './App.css';
import { FaSearchLocation } from "react-icons/fa";
import cloud from './assets/images/cloud.png';
import clear from './assets/images/clear.png';
import mist from './assets/images/mist.png';
import rain from './assets/images/rain.png';
import snow from './assets/images/snow.png';
import error from './assets/images/404.png';

function App() {
  const [humidity, setHumidity] = useState("")
  const [windspeed, setWindSpeed] = useState("")
  const [temparature, setTemp] = useState("")
  const [description, setDesc] = useState("")
  const [userdata, setUserdata] = useState("")
  const [showWeather, setShowWeather] = useState(false)
  const [animate, setAnimate] = useState("")
  const [weathericon, setIcon] = useState("")
  const [inputstatus, setStatus] = useState(true)

  const handleChange = (event) => {
    setUserdata(event.target.value)
  }

  const handleAdd = () => {
    axios(`https://api.openweathermap.org/data/2.5/weather?q=${userdata}&appid=3ae45e2cfaf230e57fa069df6fd97e3c`)
      .then((wdata) => {
        setHumidity(wdata.data.main.humidity)
        setDesc(
          wdata.data.weather[0].description
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        )
        setTemp((wdata.data.main.temp - 273.15).toFixed(0))
        setWindSpeed((wdata.data.wind.speed).toFixed(0))
        setShowWeather(true)
        setAnimate("animate-slowOpen")

        const description = wdata.data.weather[0].main.toLowerCase();

        if (description === "clouds") {
          setIcon(cloud);
        } else if (description === "clear") {
          setIcon(clear);
        } else if (description === "mist" || description === "fog" || description === "haze" || description === "smoke") {
          setIcon(mist);
        } else if (description === "rain" || description === "drizzle" || description === "thunderstorm") {
          setIcon(rain);
        } else if (description === "snow") {
          setIcon(snow);
        } else {
          setIcon(clear);
        }

        setStatus(true)

      })
      .catch((error) => {
        console.error("Error fetching weather:", error.message)
        setAnimate("animate-slowOpen");
        setTimeout(() => setShowWeather(false), 1500)
        setStatus(!inputstatus)
      })
  }

  return (
    <div>
      <div className="absolute bg-[url('./assets/images/bg-image2.jpg')] h-full w-full bg-cover bg-center"></div>
      <h1 className='sm: text-4xl font-poppins pt-8 relative md:text-6xl font-bold text-center text-white [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]'>Weather App</h1>

      <div className="z-10 relative mx-auto top-20 w-fit bg-white/10 backdrop-blur-md rounded-lg shadow-md p-8 text-white">
        <div className='flex justify-between items-center text-[16px] rounded-md border border-gray-300 w-[280px] px-3 py-1'>
          <input
            onChange={handleChange}
            value={userdata}
            className='bg-transparent focus:outline-none placeholder-white/60 w-[80%]'
            placeholder="Search weather by city..!"
          />
          <FaSearchLocation
            className='text-white/80 hover:cursor-pointer'
            onClick={handleAdd}
          />
        </div>

        {/* Weather section */}

        {inputstatus ? (
          showWeather && (
            <div className={animate}>
              <img src={weathericon} className='w-[180px] mx-auto my-6' alt="Weather icon" />
              <p className='text-center w-full text-5xl font-bold'>{temparature}<sup>°C</sup></p>
              <p className='text-center w-full text-[20px] my-3 font-semibold'>{description}</p>

              <div className='flex justify-between mt-9'>
                <div className='flex items-center gap-2'>
                  <i className='bx bx-water text-5xl'></i>
                  <div>
                    <p className='text-[18px]'>{humidity}%</p>
                    <p className='text-[12px]'>Humidity</p>
                  </div>
                </div>

                <div className='flex items-center gap-2'>
                  <i className='bx bx-wind text-5xl'></i>
                  <div>
                    <p className='text-[18px]'>{windspeed} Km/h</p>
                    <p className='text-[12px]'>Wind Speed</p>
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className={`flex flex-col items-center justify-center mt-6 ${animate}`}>
            <img src={error} className="w-[250px]" alt="Not found" />
            <p className="mt-3 text-lg font-semibold text-white">City not found, try again!</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default App







