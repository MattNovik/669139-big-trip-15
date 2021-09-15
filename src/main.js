import  {createSiteHeaderFilters} from './view/filters.js';
import SiteHeaderFiltersView from './view/filters.js';
import SiteHeaderMenuView from './view/menu.js';
import SiteHeaderTripInfoView from './view/trip-info.js';
/* import SiteMainSortView from './view/sort.js';
import SiteListEventsView from './view/list-events.js';
import SiteEventView from './view/event.js';
import SiteAddEventView from './view/add-event.js';
import NoEventView from './view/no-event.js'; */
import { generateEvent } from './mock/event.js';
import { generateFilter } from './mock/filter.js';
import TripPresenter from './presenter/Trip.js';
import { RenderPosition, render, replace } from './utils/render.js';

const EVENT_COUNT = 20;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);
const filters = generateFilter(events);

/* const renderEvent = (eventListElement, event) => {
  const eventComponent = new SiteEventView(event);
  const eventEditComponent = new SiteAddEventView(event);

  const replaceEventToForm = () => {
    replace(eventEditComponent, eventComponent);
  };

  const replaceFormToEvent = () => {
    replace(eventComponent, eventEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  eventComponent.setEditClickHandler(() => {
    replaceEventToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.setEventSubmitHandler(() => {
    replaceFormToEvent();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.setEventCloseHandler(() => {
    replaceFormToEvent();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(eventListElement, eventComponent, RenderPosition.BEFOREEND);
}; */

const siteTripInfo = document.querySelector('.trip-main');
const siteFilter = document.querySelector('.trip-controls__filters');
const siteMenu = document.querySelector('.trip-controls__navigation');

const siteEvents = document.querySelector('.trip-events');

render(siteFilter, new SiteHeaderFiltersView(), RenderPosition.BEFOREEND);
render(siteMenu, new SiteHeaderMenuView(), RenderPosition.BEFOREEND);
render(siteTripInfo,new SiteHeaderTripInfoView(), RenderPosition.AFTERBEGIN);

/* const renderEventsList = (eventsContainer, events) => {

  const eventsListComponent = new SiteListEventsView();
  const eventsMainSort = new SiteMainSortView();

  render(eventsContainer, eventsListComponent, RenderPosition.BEFOREEND);
  render(eventsContainer, eventsMainSort, RenderPosition.AFTERBEGIN);

  const siteListEvents = document.querySelector('.trip-events__list');

  if (events.length === 0) {
    render(siteListEvents, new NoEventView(), RenderPosition.AFTERBEGIN);
  } else {
    for (let i = 0; i < EVENT_COUNT; i++) {
      renderEvent(siteListEvents, events[i]);
    }
  }

}; */

const tripPresenter = new TripPresenter(siteEvents);

//renderEventsList(siteEvents, events);

tripPresenter.init(events);
//renderElement(siteListEvents, new SiteAddEventView(events[0]).getElement(), RenderPosition.AFTERBEGIN);
