import { AlarmItem } from '../../models';
import {
  getDateAlarm,
  getCurrentDate,
  getTimeAlarm,
  getCurrentTime,
  getHourDifferentiationAlarm
} from '../../resources/strings';

export const checkScheduleCurrentTimeAlarm=(scheduledDateTime: object) => {
  return getCurrentDate() === getDateAlarm(scheduledDateTime)
    && getCurrentTime() === getTimeAlarm(scheduledDateTime);
};

export const existScheduledDateTimeAlarm=(scheduledAlarmList: AlarmItem[], scheduledDateTime: object) => {
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

export const checkEditScheduledAlarmItem=(scheduledAlarmList: AlarmItem[], scheduledDateTime: object, alarmId: number) => {
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
