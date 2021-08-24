import  {createSiteHeaderFilters} from './view/filters.js';
import  {createSiteHeaderMenu} from './view/menu.js';
import {createSiteHeaderTripInfo} from './view/tripInfo.js';
import {createSiteMainSort} from './view/sort.js';
import {createSiteListEvents} from './view/listEvents.js';
import {createSiteEvent} from './view/event.js';
import { createSiteAddEvent } from './view/addEvent.js';

const renderSmth = (container, block, place) => {
  container.insertAdjacentHTML(place, block);
};

const siteTripInfo = document.querySelector('.trip-main');
const siteFilter = document.querySelector('.trip-controls__filters');
const siteMenu = document.querySelector('.trip-controls__navigation');
const siteEvents = document.querySelector('.trip-events');

renderSmth(siteFilter, createSiteHeaderFilters(), 'beforeend');
renderSmth(siteMenu, createSiteHeaderMenu(), 'beforeend');
renderSmth(siteTripInfo,createSiteHeaderTripInfo(),'afterbegin');
renderSmth(siteEvents, createSiteMainSort(), 'afterbegin');
renderSmth(siteEvents, createSiteListEvents(), 'beforeend');

const siteListEvents = document.querySelector('.trip-events__list');

for (let i = 0; i < 3; i++) {
  renderSmth(siteListEvents, createSiteEvent(), 'beforeend');
}
renderSmth(siteListEvents, createSiteAddEvent(), 'afterbegin');
