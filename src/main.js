import  {createSiteHeaderFilters} from './view/filters.js';
import  {createSiteHeaderMenu} from './view/menu.js';
import {createSiteHeaderTripInfo} from './view/trip-info.js';
import {createSiteMainSort} from './view/sort.js';
import {createSiteListEvents} from './view/list-events.js';
import {createSiteEvent} from './view/event.js';
import { createSiteAddEvent } from './view/add-event.js';

const renderElement = (container, block, place) => {
  container.insertAdjacentHTML(place, block);
};

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

for (let i = 0; i < 3; i++) {
  renderElement(siteListEvents, createSiteEvent(), 'beforeend');
}
renderElement(siteListEvents, createSiteAddEvent(), 'afterbegin');
