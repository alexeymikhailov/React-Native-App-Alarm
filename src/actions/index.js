export const SCHEDULE_NEW_ALARM='SCHEDULE_NEW_ALARM';
export const EDIT_SCHEDULED_ALARM='EDIT_SCHEDULED_ALARM';

export const scheduleNewAlarm=(data) => {
  return {
    type: SCHEDULE_NEW_ALARM,
    data
  };
};

export const editScheduledAlarm=(data) => {
  return {
    type: EDIT_SCHEDULED_ALARM,
    data
  };
};
