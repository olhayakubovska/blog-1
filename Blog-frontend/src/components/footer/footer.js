import React, { useState } from "react";
import styled from "styled-components";

const FooterContainer = ({ className }) => {
  const [temperature, setTemperature] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Warsaw&units=metric&lang=ru&appid=de14689fbf12514b3d7d65b8dcadd3e7"
  )
    .then((res) => res.json())
    .then(({ name, main, weather }) => {
      setCity(name);
      setTemperature(main.temp);
      setDescription(weather[0].description);
    });

  return (
    <div className={className}>
      <div>
        <div>Блог веб-разработчика</div>
        <div> web@developer.ru</div>
      </div>
      <div>
        <div>
          {city},{" "}
          {new Date().toLocaleDateString("ru", {
            day: "numeric",
            month: "long",
          })}
        </div>
        <div>
          {temperature} градусов, {description}{" "}
        </div>
      </div>
    </div>
  );
};

export const Footer = styled(FooterContainer)`
  display: flex;
  justify-content: space-between;
  height: 120px;
  width: 1000px;
  padding: 20px 40px;
  box-shadow: 0 -2px 15px #000;
  background-color: #fff;
  font-weight: bold;
`;
