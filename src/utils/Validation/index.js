import moment from 'moment';
import {
  getDateAlarm,
  getCurrentDate,
  getTimeAlarm,
  getCurrentTime,
  getHourDifferentiationAlarm
} from '../../resources/strings';

export const checkScheduleCurrentTimeAlarm=(scheduledDateTime) => {
  return getCurrentDate() === getDateAlarm(scheduledDateTime)
    && getCurrentTime() === getTimeAlarm(scheduledDateTime);
};

export const existScheduledDateTimeAlarm=(scheduledAlarmList, scheduledDateTime) => {
  return scheduledAlarmList.some((item) => {
    if (item.dateId === getDateAlarm(scheduledDateTime)) {
      return item.data.some((dataItem) => {
        if (dataItem.hourDifferentiation === getHourDifferentiationAlarm(getTimeAlarm(scheduledDateTime))) {
          return dataItem.data.some((innerDataItem) => {
            if (innerDataItem.time === getTimeAlarm(scheduledDateTime)) {
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
    if (item.dateId === getDateAlarm(scheduledDateTime)) {
      return item.data.some((dataItem) => {
        if (dataItem.hourDifferentiation === getHourDifferentiationAlarm(getTimeAlarm(scheduledDateTime))) {
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
