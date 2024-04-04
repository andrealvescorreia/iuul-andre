import { DateTime } from 'luxon';

function dateTimeFromString(dataString = '', mask = 'ddMMyyyy') {
  return DateTime.fromFormat(dataString, mask);
}

export { dateTimeFromString };
