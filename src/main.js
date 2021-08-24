import  {createSiteHeaderFilters} from "./view/filters.js";
import  {createSiteHeaderMenu} from "./view/menu.js";
import {createSiteHeaderTripInfo} from "./view/tripInfo.js";
import {createSiteMainSort} from "./view/sort.js";

const renderSmth = (container, block, place) => {
  container.insertAdjacentHTML(place, block);
};

const siteTripInfo = document.querySelector(".trip-main");
const siteFilter = document.querySelector(".trip-controls__filters");
const siteMenu = document.querySelector(".trip-controls__navigation");
const siteSort = document.querySelector(".trip-events");

renderSmth(siteFilter, createSiteHeaderFilters(), "beforeend");
renderSmth(siteMenu, createSiteHeaderMenu(), "beforeend");
renderSmth(siteTripInfo,createSiteHeaderTripInfo(),"afterbegin");
renderSmth(siteSort, createSiteMainSort(), "afterbegin");
