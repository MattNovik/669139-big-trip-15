import AbstractView from "./abstract";

const createSiteListEvents = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class SiteListEvents extends AbstractView {
  getTemplate() {
    return createSiteListEvents();
  }
};
