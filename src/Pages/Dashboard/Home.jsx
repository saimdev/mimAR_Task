import React, { useContext } from "react";
import "../../assets/css/home.css";
import profileLogo from "../../assets/imgs/profile-logo.png";
import weatherLogo from "../../assets/imgs/weather-icon.png";
import quoteIcon from "../../assets/imgs/quote-icon.png";
import editIcon from "../../assets/imgs/edit-icon.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../apis/getUserData";
import { getRandomQuote } from "../../apis/getRandomQuote";
import { getLiveWeather } from "../../apis/getLiveWeather";
import { getLocation } from "../../utils/getLiveLocation";
import { Link } from "react-router-dom";
// import { UserContext } from "../../Context/UserContext";

export const Home = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [loadingQuote, setLoadingQuote] = useState(true);
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [temp, setTemp] = useState(null);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [humidity, setHumidity] = useState(null);
  const [condition, setCondition] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [windDirection, setWindDirection] = useState(null);
  const [quote, setQuote] = useState(null);
  const [author, setAuthor] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [quoteError, setQuoteError] = useState(null);
  const weatherApiKey = "f0de5fa8e83c4acb852174019240304";
  const quoteApiKey = "9UszHFOANfdH4Dnd1uXpsQ==5XfJQikFhBj22eZM";
  const navigate = useNavigate();
  const googleUser = JSON.parse(localStorage.getItem("user"));
  const facebookUser = JSON.parse(localStorage.getItem("facebookUser"));
  const githubUser = JSON.parse(localStorage.getItem("githubUser"));
  //   const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!googleUser && !facebookUser && !githubUser) {
      getUserData(setEmail, setUsername, navigate, setLoading);
    } else {
      console.log(googleUser);
      console.log(facebookUser);
      console.log(githubUser);
    }
    getLocation()
      .then(({ latitude, longitude }) => {
        setLatitude(latitude);
        setLongitude(longitude);
      })
      .catch((err) => {
        setError(err.error);
      });
    getRandomQuote(
      setLoadingQuote,
      quoteApiKey,
      setQuote,
      setAuthor,
      setQuoteError
    );
  }, []);

  useEffect(() => {
    getLiveWeather(
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
      setError
    );
  }, [latitude, longitude]);

  return (
    <div className="container dashboard d-flex flex-column p-3">
      {/* {loading ? (
        <div></div>
      ) : ( */}
      <div>
        <div className="w-100 d-flex flex-row ">
          <Link to="/signout" className="btn btn-danger">
            Logout
          </Link>
        </div>
        <h2 className="text-center text-white">Dashboard</h2>
        <div className="profile-section">
          <div className="d-flex flex-row align-items-center dashboard-subheading my-2">
            <img src={profileLogo} alt="" className="profile-icon mx-2" />
            <h4 className="text-white">Profile</h4>
            <Link to="/updateProfile">
              <img src={editIcon} alt="" className="edit-icon mx-2" />
            </Link>
          </div>
          <table className="table table-bordered">
            <thead className="">
              <tr>
                <th scope="col">Key</th>
                <th scope="col">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Username</td>
                <td>
                  {googleUser
                    ? googleUser.username
                    : facebookUser
                    ? facebookUser.username
                    : githubUser
                    ? githubUser.username
                    : username}
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  {googleUser
                    ? googleUser.email
                    : facebookUser
                    ? facebookUser.email
                    : githubUser
                    ? githubUser.email
                    : email}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-1 line-div"></div>
        <div className="weather-section mt-2">
          <div className="d-flex flex-row align-items-center dashboard-subheading my-2">
            <img src={weatherLogo} alt="" className="profile-icon mx-2" />
            <h4 className="text-white">Weather Information</h4>
          </div>
          {loadingWeather ? (
            <div className="weather-card" id="weather">
              {error ? (
                <p style={{ fontStyle: "italic" }}>{error}</p>
              ) : (
                <p style={{ fontStyle: "italic" }}>
                  Loading Weather Information.....
                </p>
              )}
            </div>
          ) : (
            <div className="weather-card" id="weather">
              <div className="d-flex flex-row align-items-center justify-content-center">
                <img
                  src={weatherIcon}
                  alt="Weather Icon"
                  className="weather-icon mx-2"
                />
                <div className="weather-temp">{temp}°C</div>
              </div>
              <h5>City: {city}</h5>
              <h5>Country: {country}</h5>
              <h4 className="mt-3">Details</h4>
              <div className="d-flex flex-row justify-content-between">
                <p>Condition: {condition}</p>
                <p>Wind Speed: {windSpeed} km/h</p>
                <p>Wind Direction: {windDirection}</p>
                <p>Humidity: {humidity}%</p>
              </div>
            </div>
          )}
        </div>
        <div className="p-1 line-div mt-3"></div>
        <div className="quotes-section mt-4">
          <div className="d-flex flex-row align-items-center dashboard-subheading my-2">
            <img src={quoteIcon} alt="" className="profile-icon mx-2" />
            <h4 className="text-white">English Quotes</h4>
          </div>

          {loadingQuote ? (
            <div className="carousel-inner" id="quotesCarouselInner">
              <div className="carousel-item active">
                <div className="quotes-card">
                  {quoteError ? (
                    <p className="quote-text">{quoteError}</p>
                  ) : (
                    <p className="quote-text">Fetching quotes...</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="carousel-inner" id="quotesCarouselInner">
              <div className="carousel-item active">
                <div className="quotes-card">
                  <p className="quote-text">"{quote}"</p>
                  <p className="quote-author">-{author}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
