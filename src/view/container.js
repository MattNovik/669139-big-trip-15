import AbstractView from "./abstract";

const createContainer = () => (
          `<section class="trip-events">
            <h2 class="visually-hidden">Trip events</h2>
          </section>`
);

export default class Container extends AbstractView {
  getTemplate() {
    return createContainer();
  }
}
