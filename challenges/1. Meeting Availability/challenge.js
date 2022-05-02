import moment from "moment";
export function findFreeTimes(start, end, duration, events) {
  let response = [{ start: start.format(), end: end.format() }];
  events.sort(function(a, b) {
    return moment(a.start).diff(moment(b.start));
  });
  for (let i = 0; i < events.length; i++) {
    let ele = events[i];
    let currEventStart = moment(ele.start);
    let currEventEnd = moment(ele.end);
    let eventDurationbyMinutes = Math.abs(
      currEventEnd.diff(currEventStart, "minutes", true)
    );

    if (end.isSameOrBefore(currEventStart)) {
      return response;
    }
    if (end.isSameOrBefore(currEventEnd)) {
      currEventEnd = end.clone();
      eventDurationbyMinutes = Math.abs(
        currEventEnd.diff(currEventStart, "minutes", true)
      );
    }
    if (eventDurationbyMinutes % duration !== 0) {
      currEventEnd.subtract(eventDurationbyMinutes % duration, "minutes");
      eventDurationbyMinutes =
        Math.floor(eventDurationbyMinutes / duration) * 30;
    }
    if (eventDurationbyMinutes >= duration) {
      if (response[response.length - 1].start != currEventStart.format()) {
        response[response.length - 1].end = currEventStart.format();
        if (currEventEnd.format() != end.format()) {
          response.push({ start: currEventEnd.format(), end: end.format() });
        }
      } else {
        response[response.length - 1].start = currEventEnd.format();
      }
    }
  }
  return response;
}
