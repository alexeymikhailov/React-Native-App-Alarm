import { createCustomAction } from 'typesafe-actions';
import {
  SCHEDULE_NEW_ALARM,
  EDIT_SCHEDULED_ALARM,
  DELETE_TRIGGERED_ALARMS
} from '../constants';
import {
  AddNewAlarmAction,
  EditCurrentAlarmAction
} from '../models';

export const scheduleNewAlarm=createCustomAction(SCHEDULE_NEW_ALARM, (type) => {
  return (data: AddNewAlarmAction) => ({ type, data });
});

export const editScheduledAlarm=createCustomAction(EDIT_SCHEDULED_ALARM, (type) => {
  return (data: EditCurrentAlarmAction) => ({ type, data });
});

export const deleteTriggeredAlarms=createCustomAction(DELETE_TRIGGERED_ALARMS, (type) => {
  return () => ({ type });
});
