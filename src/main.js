import  {createSiteHeaderFilters} from './view/filters.js';
import SiteHeaderFiltersView from './view/filters.js';
import SiteHeaderMenuView from './view/menu.js';
import SiteHeaderTripInfoView from './view/trip-info.js';
import SiteMainSortView from './view/sort.js';
import SiteListEventsView from './view/list-events.js';
import SiteEventView from './view/event.js';
import SiteAddEventView from './view/add-event.js';
import { generateEvent } from './mock/event.js';
import { generateFilter } from './mock/filter.js';
import { renderTemplate, renderElement, RenderPosition } from './utils.js';

const EVENT_COUNT = 20;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);
const filters = generateFilter(events);

const renderEvent = (eventListElement, event) => {
  const eventComponent = new SiteEventView(event);
  const eventEditComponent = new SiteAddEventView(event);

  const replaceEventToForm = () => {
    eventListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToEvent = () => {
    eventListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  eventComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', ()=> {
    replaceEventToForm();
  });

  eventEditComponent.getElement().querySelector('.event__save-btn').addEventListener('click', (evt) => {
    replaceFormToEvent();
  });

  renderElement(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

console.log(filters);

const siteTripInfo = document.querySelector('.trip-main');
const siteFilter = document.querySelector('.trip-controls__filters');
const siteMenu = document.querySelector('.trip-controls__navigation');
const siteEvents = document.querySelector('.trip-events');

renderElement(siteFilter, new SiteHeaderFiltersView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMenu, new SiteHeaderMenuView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteTripInfo,new SiteHeaderTripInfoView().getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteEvents, new SiteMainSortView().getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteEvents, new SiteListEventsView().getElement(), RenderPosition.BEFOREEND);

const siteListEvents = document.querySelector('.trip-events__list');

for (let i = 0; i < EVENT_COUNT; i++) {
  renderEvent(siteListEvents,events[i]);
}

//renderElement(siteListEvents, new SiteAddEventView(events[0]).getElement(), RenderPosition.AFTERBEGIN);
