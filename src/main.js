import  {createSiteHeaderFilters} from './view/filters.js';
import  {createSiteHeaderMenu} from './view/menu.js';
import {createSiteHeaderTripInfo} from './view/trip-info.js';
import {createSiteMainSort} from './view/sort.js';
import {createSiteListEvents} from './view/list-events.js';
import {createSiteEvent} from './view/event.js';
import { createSiteAddEvent } from './view/add-event.js';
import { generateEvent } from './mock/event.js';

const EVENT_COUNT = 20;

const renderElement = (container, block, place) => {
  container.insertAdjacentHTML(place, block);
};

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const siteTripInfo = document.querySelector('.trip-main');
const siteFilter = document.querySelector('.trip-controls__filters');
const siteMenu = document.querySelector('.trip-controls__navigation');
const siteEvents = document.querySelector('.trip-events');

renderElement(siteFilter, createSiteHeaderFilters(), 'beforeend');
renderElement(siteMenu, createSiteHeaderMenu(), 'beforeend');
renderElement(siteTripInfo,createSiteHeaderTripInfo(),'afterbegin');
renderElement(siteEvents, createSiteMainSort(), 'afterbegin');
renderElement(siteEvents, createSiteListEvents(), 'beforeend');

const siteListEvents = document.querySelector('.trip-events__list');

for (let i = 1; i < EVENT_COUNT; i++) {
  renderElement(siteListEvents, createSiteEvent(events[i]), 'beforeend');
}

renderElement(siteListEvents, createSiteAddEvent(events[0]), 'afterbegin');
