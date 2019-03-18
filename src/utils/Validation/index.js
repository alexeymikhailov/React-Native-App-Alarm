import moment from 'moment';

const getDateAlarmId=(scheduledDateTime) => {
  return moment(scheduledDateTime).format("DDMMYYYY");
};

const getScheduledTimeAlarm=(scheduledDateTime) => {
  return moment(scheduledDateTime).format("HH:mm");
};

const getHourDifferentiationAlarm=(currentScheduledTimeAlarm) => {
  return currentScheduledTimeAlarm >= '06:00' && currentScheduledTimeAlarm < '18:00' ? 'Day' : 'Night';
};

export const checkScheduleCurrentTimeAlarm=(scheduledDateTime) => {
  return moment().format("HH:mm") === moment(scheduledDateTime).format("HH:mm");
};

export const existScheduledDateTimeAlarm=(scheduledAlarmList, scheduledDateTime) => {
  return scheduledAlarmList.some((item) => {
    if (item.dateId === getDateAlarmId(scheduledDateTime)) {
      return item.data.some((dataItem) => {
        if (dataItem.hourDifferentiation === getHourDifferentiationAlarm(getScheduledTimeAlarm(scheduledDateTime))) {
          return dataItem.data.some((innerDataItem) => {
            if (innerDataItem.time === getScheduledTimeAlarm(scheduledDateTime)) {
              return true;
            }
            return false;
          })
        }
        return false;
      })
    }
    return false;
  });
};

export const checkEditScheduledAlarmItem=(scheduledAlarmList, scheduledDateTime, alarmId) => {
  return scheduledAlarmList.some((item) => {
    if (item.dateId === getDateAlarmId(scheduledDateTime)) {
      return item.data.some((dataItem) => {
        if (dataItem.hourDifferentiation === getHourDifferentiationAlarm(getScheduledTimeAlarm(scheduledDateTime))) {
          return dataItem.data.some((innerDataItem) => {
            if (innerDataItem.id === alarmId) {
              return true;
            }
            return false;
          })
        }
        return false;
      })
    }
    return false;
  });
};
