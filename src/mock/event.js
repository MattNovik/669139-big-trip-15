// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
import dayjs from 'dayjs';
import { getRandomInteger  } from '../utils.js';
import { POINTS } from '../const.js';
import { CITIES } from '../const.js';

const generateDescription = () => {
  const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
  const textSplit = text.split(".");
  let textLength = getRandomInteger(1,5);
  let newText = [];
  for (let i = 1; i <= textLength;i++) {
    newText.push(textSplit[getRandomInteger(0,textSplit.length - 1)]);
  }
  return newText;
};

const generatePoinst = () => {
  return POINTS[getRandomInteger(0, POINTS.length-1)];
};

const generateCity = () => {
  return CITIES[getRandomInteger(0, CITIES.length-1)];
};

const generateDate = () => {
  const dateDays = getRandomInteger(-365,365);
  return dayjs().add(dateDays, 'day').format('MMM D');
};

const generateStartDate = () => {
  return dayjs().format('HH:MM');
};

const generateEndDate = () => {
  return dayjs().add(1,'hour').format('HH:MM');
};

export const generateEvent = () => {
  return {
    eventDate: generateDate(),
    eventStartDate: generateStartDate(),
    eventEndDate: generateEndDate(),
    eventPoints :generatePoinst(),
    eventCity:generateCity(),
    eventPrice:getRandomInteger(1000, 10000),
    eventDescription: generateDescription(),
    eventPhoto: `http://picsum.photos/248/152?r=${getRandomInteger(1,10)}`,
    isFavorite: Boolean(getRandomInteger(0, 1)),
    isChecked:Boolean(getRandomInteger(0, 1)),
  };
};
