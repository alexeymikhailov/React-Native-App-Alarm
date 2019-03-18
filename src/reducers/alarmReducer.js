import moment from 'moment';
import {
  SCHEDULE_NEW_ALARM,
  EDIT_SCHEDULED_ALARM
} from '../actions';

const initialState={
  scheduledDateAlarmList: [],
  scheduledAlarmList: []
};

const alarmReducer=(state=initialState, action) => {
  switch(action.type) {
    case SCHEDULE_NEW_ALARM:
      const currentScheduledShortDateAlarm=moment(action.data.datetime).format("Do MMM, YY");
      const currentScheduledTimeAlarm=moment(action.data.datetime).format("HH:mm");
      const setDateAlarmId=moment(action.data.datetime).format("DDMMYYYY");
      const currentDateAlarmListIndex=state.scheduledDateAlarmList.indexOf(setDateAlarmId);
      const setHourDifferentiationAlarm=currentScheduledTimeAlarm >= '06:00' && currentScheduledTimeAlarm < '18:00' ? 'Day' : 'Night';

      return {
        ...state,
        scheduledDateAlarmList:
          currentDateAlarmListIndex !== -1 ?
            [...state.scheduledDateAlarmList]
              : [...state.scheduledDateAlarmList, setDateAlarmId],
        scheduledAlarmList:
          currentDateAlarmListIndex !== -1 ?
            state.scheduledAlarmList.map((item) => {
              if (item.dateId === setDateAlarmId) {
                const existHourDifferentiation=item.data.some((dataItem) => {
                  if (dataItem.hourDifferentiation && dataItem.hourDifferentiation === setHourDifferentiationAlarm) return true;
                  return false;
                });

                if (existHourDifferentiation) {
                  return {
                    ...item,
                    data: item.data.map((dataItem) => {
                      if (dataItem.hourDifferentiation && dataItem.hourDifferentiation === setHourDifferentiationAlarm) {
                        return {
                          ...dataItem,
                          data: dataItem.data.concat({
                            id: Math.round((Math.random() * 36 ** 12)).toString(36),
                            time: currentScheduledTimeAlarm,
                            text: action.data.text,
                            isTurned: true
                          }).sort((a, b) => {
                            return b.time > a.time
                                    ? -1
                                      : a.time > b.time
                                        ? 1
                                          : 0;
                          })
                        }
                      }
                      return dataItem;
                    })
                  }
                }
                return {
                  ...item,
                  data: item.data.concat(
                    {
                      id: Math.round((Math.random() * 36 ** 12)).toString(36),
                      hourDifferentiation: setHourDifferentiationAlarm,
                      data: [
                        {
                          id: Math.round((Math.random() * 36 ** 12)).toString(36),
                          time: currentScheduledTimeAlarm,
                          text: action.data.text,
                          isTurned: true
                        }
                      ]
                    }
                  )
                };
              }
              return item;
            })
              : state.scheduledAlarmList.concat({
                  dateId: setDateAlarmId,
                  date: currentScheduledShortDateAlarm,
                  data: [
                    {
                      id: Math.round((Math.random() * 36 ** 12)).toString(36),
                      hourDifferentiation: setHourDifferentiationAlarm,
                      data: [
                        {
                          id: Math.round((Math.random() * 36 ** 12)).toString(36),
                          time: currentScheduledTimeAlarm,
                          text: action.data.text,
                          isTurned: true
                        }
                      ]
                    }
                  ]
                })
      };

    case EDIT_SCHEDULED_ALARM:
      let currentScheduledNewAlarmOtherSection;
      const currentScheduledNewTimeAlarm=action.data.time && moment(action.data.time).format("HH:mm");

      return {
        ...state,
        scheduledAlarmList: state.scheduledAlarmList.map((item) => {
          if (item.dateId === action.data.dateId) {
            return {
              ...item,
              data: item.data.map((dataItem) => {
                if (dataItem.id === action.data.sectionListId) {
                  return {
                    ...dataItem,
                    data: dataItem.data.map((innerDataItem) => {
                      if (innerDataItem.id === action.data.alarmId) {
                        return {
                          ...innerDataItem,
                          time: currentScheduledNewTimeAlarm || innerDataItem.time,
                          text: action.data.text || '',
                          isTurned:
                            typeof action.data.switchValue !== 'undefined'
                              ? action.data.switchValue
                                : innerDataItem.isTurned
                        }
                      }
                      return innerDataItem;
                    })
                  }
                }
                return dataItem;
              }).map((dataItem) => {
                return {
                  ...dataItem,
                  data: dataItem.data.sort((a, b) => {
                    return b.time > a.time
                            ? -1
                              : a.time > b.time
                                ? 1
                                  : 0;
                  })
                }
              })
            }
          }
          return item;
        })
      };

    default:
      return state;
  }
};

export default alarmReducer;
