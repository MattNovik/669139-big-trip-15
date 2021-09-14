import  {createSiteHeaderFilters} from './view/filters.js';
import SiteHeaderFiltersView from './view/filters.js';
import SiteHeaderMenuView from './view/menu.js';
import SiteHeaderTripInfoView from './view/trip-info.js';
import SiteMainSortView from './view/sort.js';
import SiteListEventsView from './view/list-events.js';
import SiteEventView from './view/event.js';
import SiteAddEventView from './view/add-event.js';
import NoEventView from './view/no-event.js';
import { generateEvent } from './mock/event.js';
import { generateFilter } from './mock/filter.js';
import { render, RenderPosition } from './utils.js';

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

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  eventComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', ()=> {
    replaceEventToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector('.event__save-btn').addEventListener('click', (evt) => {
    replaceFormToEvent();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector('.event__reset-btn').addEventListener('click', (evt) => {
    replaceFormToEvent();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

const siteTripInfo = document.querySelector('.trip-main');
const siteFilter = document.querySelector('.trip-controls__filters');
const siteMenu = document.querySelector('.trip-controls__navigation');
const siteEvents = document.querySelector('.trip-events');

render(siteFilter, new SiteHeaderFiltersView().getElement(), RenderPosition.BEFOREEND);
render(siteMenu, new SiteHeaderMenuView().getElement(), RenderPosition.BEFOREEND);
render(siteTripInfo,new SiteHeaderTripInfoView().getElement(), RenderPosition.AFTERBEGIN);
render(siteEvents, new SiteMainSortView().getElement(), RenderPosition.AFTERBEGIN);
render(siteEvents, new SiteListEventsView().getElement(), RenderPosition.BEFOREEND);

const siteListEvents = document.querySelector('.trip-events__list');

if (events.length === 0) {
  render(siteListEvents, new NoEventView().getElement(), RenderPosition.AFTERBEGIN);
} else {
  for (let i = 0; i < EVENT_COUNT; i++) {
    renderEvent(siteListEvents, events[i]);
  }
}


//renderElement(siteListEvents, new SiteAddEventView(events[0]).getElement(), RenderPosition.AFTERBEGIN);
