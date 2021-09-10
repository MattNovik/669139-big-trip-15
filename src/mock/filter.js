import dayjs from "dayjs";

const eventsFilter = {
  after: (events) => events.filter((event) => dayjs().isAfter(event.eventDate)),
  future: (events) => events.filter((event) => dayjs().isBefore(event.eventDate)),
};

export const generateFilter = (events) => Object.entries(eventsFilter).map(
  ([filterName, eventsList]) => ({
    name: filterName,
    list:  eventsList(events),
  }),
);
