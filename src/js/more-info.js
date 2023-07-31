import { createMarkup } from './create-markup';
import { fetchForecast } from './api';
import { getDate } from './five-days';
const buttons = document.querySelectorAll('.five-days__button');
const input = document.querySelector('.js-form input[name="query"]');
const temperatureUnit = 'metric';
const moreInfoElement = document.querySelector('.more-info');
let fiveDayData = {};
let moreInfoData = {};
let markup = [
  {
    time: '00:00',
    weatherIconName: 'cloudy',
    temperature: '-5',
    pressure: '1000',
    humidity: '85',
    wint: '10',
  },
  {
    time: '03:00',
    weatherIconName: 'sunny',
    temperature: '0',
    pressure: '1012',
    humidity: '80',
    wint: '5',
  },
  {
    time: '06:00',
    weatherIconName: 'sunny',
    temperature: '0',
    pressure: '1012',
    humidity: '80',
    wint: '5',
  },
  {
    time: '09:00',
    weatherIconName: 'sunny',
    temperature: '0',
    pressure: '1012',
    humidity: '80',
    wint: '5',
  },
  {
    time: '12:00',
    weatherIconName: 'sunny',
    temperature: '0',
    pressure: '1012',
    humidity: '80',
    wint: '5',
  },
  {
    time: '15:00',
    weatherIconName: 'sunny',
    temperature: '0',
    pressure: '1012',
    humidity: '80',
    wint: '5',
  },
  {
    time: '18:00',
    weatherIconName: 'sunny',
    temperature: '0',
    pressure: '1012',
    humidity: '80',
    wint: '5',
  },
  {
    time: '21:00',
    weatherIconName: 'sunny',
    temperature: '0',
    pressure: '1012',
    humidity: '80',
    wint: '5',
  },
];
createMarkup(markup);

function getThreeHourlyData(forecastData, day) {
  // Calculate start and end indices for the selected day
  const startIndex = (day - 1) * 8;
  const endIndex = startIndex + 8;

  const data = forecastData.list.slice(startIndex, endIndex).map(item => {
    const dateItem = new Date(item.dt * 1000);
    const weatherIconName = item.weather[0].icon;

    return {
      time: dateItem.getHours() + ':00',
      weatherIconName: weatherIconName,
      temperature: Math.round(item.main.temp),
      pressure: item.main.pressure,
      humidity: item.main.humidity,
      wint: item.wind.speed,
    };
  });

  return data;
}
const moreInfo = async event => {
  event.preventDefault();
  const day = parseInt(event.target.getAttribute('data-day'));
  try {
    fiveDayData = await fetchForecast(input.value, temperatureUnit);
    console.log(fiveDayData);
    if (fiveDayData) {
      moreInfoData = getThreeHourlyData(fiveDayData, day);
      console.log(moreInfoData);
      const dayData = moreInfoData;
      const markup = createMarkup(dayData);
      console.log(markup);
      moreInfoElement.innerHTML = markup;
    }
  } catch (error) {
    console.error('Error while fetching weather data: ', error);
  }
};
buttons.forEach(button => {
  button.addEventListener('click', moreInfo);
});