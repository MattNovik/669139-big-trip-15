import { POINTS } from '../const.js';
import { CITIES } from '../const.js';
import SmartView from './smart.js';
import { getRandomInteger } from '../utils/utils.js';
import { render, RenderPosition } from '../utils/render.js';

const generateEventTypeItems = () => {
  const elements = POINTS.map((element) => {
   return `<div class="event__type-item">
        <input id="event-type-${element.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${element.toLowerCase()}">
        <label class="event__type-label  event__type-label--${element.toLowerCase()}" for="event-type-${element.toLowerCase()}-1">${element}</label>
      </div>`;
  });

  return elements.join('');
};

const generateEventCities = () => {
  const elements = CITIES.map((element) => {
   return `<option value="${element}"></option>`;
  });

  return elements.join('');
};

const createSiteAddEvent = (event = {}) => {

  const {eventPoints ='Bus',
    eventCity = 'London',
    eventPrice = '100',
    eventDate,
    eventStartDate,
    eventEndDate,
    eventDescription = 'good day',
    eventPhoto,
    isChecked,
    offers,
  } = event;
  return `<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${eventPoints}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${generateEventTypeItems()}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${eventPoints}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${eventCity}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${generateEventCities()}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${eventPrice}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Cancel</button>
  </header>
  <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">

      </div>
    </section>

    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${eventDescription}.</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          <img class="event__photo" src="${eventPhoto}" alt="Event photo">
          <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
          <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
          <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
          <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
        </div>
      </div>
    </section>
  </section>
</form>`
};

export default class SiteAddEvent extends SmartView {
  constructor(events) {
    super();
    this._data = SiteAddEvent.parseEventToData(events);

    this._eventHandler = this._eventHandler.bind(this);
    this._pointHandler = this._pointHandler.bind(this);
    this._destinationHandler = this._destinationHandler.bind(this);
    this._generateOffers = this._generateOffers.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createSiteAddEvent(this._data);
  }

  _generateOffers(data) {
    let newData = [];
    for (let i = 1; i < getRandomInteger(1, data.length); i++) {
      newData.push(data[i]);
    }
    const element = newData.map((element) => {
     return `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort">
          <label class="event__offer-label" for="event-offer-comfort-1">
            <span class="event__offer-title">${element.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${element.price}</span>
          </label>
        </div>`;
    });
    const newElement = element.join('');
    this.getElement().querySelector('.event__available-offers').insertAdjacentHTML(RenderPosition.BEFOREEND, newElement);
  }

  _pointHandler(evt) {
    evt.preventDefault();
    this.updateData({
      eventPoints: this._data.eventPoints = evt.target.value,
    });
    this._generateOffers(this._data.offers);
  }

  _destinationHandler(evt) {
    evt.preventDefault()
    this.updateData({
      eventCity: this._data.eventCity = evt.target.value,
    });
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setEventSubmitHandler(this._callback.event);
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-group').addEventListener('click', (evt) => {
      if (evt.target.tagName === 'INPUT') {
        this._pointHandler(evt);
      }
    });
    this.getElement().querySelector('.event__input--destination').addEventListener('change', (evt) => {
      this._destinationHandler(evt);
    })
  }

  _eventHandler(evt) {
    evt.preventDefault();
    this._callback.event(SiteAddEvent.parseDataToEvent(this._data));
  }

  setEventSubmitHandler(callback) {
    this._callback.event = callback;
    this.getElement().querySelector('.event__save-btn').addEventListener('click', this._eventHandler);
  }

  setEventCloseHandler(callback) {
    this._callback.event = callback;
    this.getElement().addEventListener('submit', this._eventHandler);
  }

  static parseEventToData(event) {
    return Object.assign(
      {},
      event,
      {
        eventPoints: event.eventPoints,
      },
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);

    return data;
  }
};
