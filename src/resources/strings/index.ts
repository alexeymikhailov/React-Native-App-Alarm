import moment from 'moment';

interface AlarmItem {
  dateId: string,
  time: string | object
}

export const getUniqueId=() => {
  return Math.floor(Math.random() * (10 ** 15));
};

export const getDateAlarm=(datetime: object) => {
  return moment(datetime).format("YYYYMMDD");
};

export const getShortDateAlarm=(datetime: object) => {
  return moment(datetime).format("Do MMM, YY");
};

export const getCurrentDate=() => {
  return moment().format("YYYYMMDD");
};

export const getCurrentDateTime=() => {
  return moment().toDate();
};

export const getTimeAlarm=(datetime: object) => {
  return moment(datetime, 'h:mm').format('HH:mm');
};

export const getCurrentTime=() => {
  return moment().format("HH:mm");
};

export const setSecondDateTimeAlarm=(datetime: object, second: number=0) => {
  return moment(datetime).set('second', second).toDate();
};

export const getHourDifferentiationAlarm=(currentTimeAlarm: string) => {
  return currentTimeAlarm >= '06:00' && currentTimeAlarm < '18:00' ? 'Day' : 'Night';
};

export const getDateTimeAlarm=(alarm: AlarmItem) => {
  return moment(alarm.dateId).set({
    hours: Number(moment(alarm.time, 'h:mm').format('HH')),
    minutes: Number(moment(alarm.time, 'h:mm').format('mm'))
  }).toDate();
};
