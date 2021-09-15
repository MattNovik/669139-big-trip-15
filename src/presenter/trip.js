import SiteHeaderFiltersView from '../view/filters.js';
import SiteHeaderMenuView from '../view/menu.js';
import SiteHeaderTripInfoView from '../view/trip-info.js';
import SiteMainSortView from '../view/sort.js';
import SiteListEventsView from '../view/list-events.js';
import SiteEventView from '../view/event.js';
import SiteAddEventView from '../view/add-event.js';
import NoEvent from '../view/no-event.js';
import { RenderPosition, render, replace } from '../utils/render.js'

const EVENT_COUNT = 20;

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._tripComponent = new SiteListEventsView();
    this._sortComponent = new SiteMainSortView();
    this._noEventComponent = new NoEvent();
    //this._listEventsComponent = new SiteListEventsView();
    this._tripInfoComponent = new SiteHeaderTripInfoView();
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();

    render(this._tripContainer, this._tripComponent, RenderPosition.BEFOREEND);
    //render(this._tripComponent, this._listEventsComponent, RenderPosition.BEFOREEND);

    this._renderTrip();
  }

  _renderSort() {
    render(this._tripComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEvent(event) {
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

    render(this._tripComponent, eventComponent, RenderPosition.BEFOREEND);


  }

  _renderEvents(from, to) {
    this._tripEvents.slice(from, to).forEach((tripEvent) => this._renderEvent(tripEvent));
  }

  _renderNoEvent() {
    render(this._tripComponent, this._noEventComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEventInfo() {

  }

  _renderTrip() {
    if (this._tripEvents.length === 0) {
      this._renderNoEvent();
      return;
    }

    this._renderSort();

    this._renderEvents(0, this._tripEvents.length);
  }
}
