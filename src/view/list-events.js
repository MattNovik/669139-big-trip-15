import { createElement } from "../utils";

const createSiteListEvents = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class SiteListEvents {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSiteListEvents();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
};
