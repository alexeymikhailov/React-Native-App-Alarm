import { Reducer } from 'redux';
import {
  SCHEDULE_NEW_ALARM,
  EDIT_SCHEDULED_ALARM,
  DELETE_TRIGGERED_ALARMS
} from '../constants';
import {
  Item,
  AlarmState
} from '../models';
import {
  getUniqueId,
  getDateAlarm,
  getShortDateAlarm,
  getCurrentDate,
  getTimeAlarm,
  getCurrentTime,
  getHourDifferentiationAlarm
} from '../resources/strings';

export const initialState: AlarmState={
  scheduledDateAlarmList: [],
  scheduledAlarmList: []
};

const alarmReducer: Reducer<AlarmState>=(state=initialState, action) => {
  switch(action.type) {
    case SCHEDULE_NEW_ALARM:
      const currentScheduledShortDateAlarm: string=getShortDateAlarm(action.data.datetime);
      const currentScheduledTimeAlarm: string=getTimeAlarm(action.data.datetime);
      const setDateAlarmId: string=getDateAlarm(action.data.datetime);
      const setHourDifferentiationAlarm: string=getHourDifferentiationAlarm(currentScheduledTimeAlarm);
      const setSectionListId: number=getUniqueId();
      const currentDateAlarmListIndex: number=state.scheduledDateAlarmList.indexOf(setDateAlarmId);

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
                            id: action.data.alarmId,
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
                      id: setSectionListId,
                      hourDifferentiation: setHourDifferentiationAlarm,
                      data: [
                        {
                          id: action.data.alarmId,
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
                      id: setSectionListId,
                      hourDifferentiation: setHourDifferentiationAlarm,
                      data: [
                        {
                          id: action.data.alarmId,
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
      let currentScheduledNewAlarm: Item;
      let moveCurrentScheduledNewAlarm: boolean=false;
      const currentScheduledNewTimeAlarm: string=getTimeAlarm(action.data.time);
      const currentHourDifferentiationNewAlarm: string=getHourDifferentiationAlarm(currentScheduledNewTimeAlarm);

      return {
        ...state,
        scheduledAlarmList: state.scheduledAlarmList.map((item) => {
          if (item.dateId === action.data.dateId) {
            const existCurrentHourDifferentiation=item.data.some((dataItem) => {
              if (dataItem.hourDifferentiation && dataItem.hourDifferentiation === currentHourDifferentiationNewAlarm) return true;
              return false;
            });

            if (existCurrentHourDifferentiation) {
              return {
                ...item,
                data: item.data.map((dataItem) => {
                  if (dataItem.id === action.data.sectionListId) {
                    return {
                      ...dataItem,
                      data: dataItem.data.map((innerDataItem) => {
                        if (innerDataItem.id === action.data.alarmId) {
                          currentScheduledNewAlarm={
                            ...innerDataItem,
                            time: currentScheduledNewTimeAlarm,
                            text: action.data.text && action.data.text !== ''
                              ? action.data.text
                                : 'null',
                            isTurned:
                              typeof action.data.switchValue !== 'undefined'
                                ? action.data.switchValue
                                  : innerDataItem.isTurned
                          };

                          return {
                            ...currentScheduledNewAlarm
                          };
                        }
                        return innerDataItem;
                      }).filter((innerDataItem) => {
                        if (innerDataItem.id === currentScheduledNewAlarm.id
                          && currentHourDifferentiationNewAlarm && currentHourDifferentiationNewAlarm !== dataItem.hourDifferentiation) {
                          moveCurrentScheduledNewAlarm=true;
                          return false;
                        }
                        return true;
                      })
                    }
                  }
                  return dataItem;
                }).filter((dataItem) => {
                  return dataItem.data.length > 0;
                }).map((dataItem) => {
                  if (dataItem.hourDifferentiation === currentHourDifferentiationNewAlarm
                    && moveCurrentScheduledNewAlarm) {
                    return {
                      ...dataItem,
                      data: dataItem.data.concat(currentScheduledNewAlarm)
                    };
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
            return {
              ...item,
              data: item.data.map((dataItem) => {
                if (dataItem.id === action.data.sectionListId) {
                  return {
                    ...dataItem,
                    data: dataItem.data.map((innerDataItem) => {
                      if (innerDataItem.id === action.data.alarmId) {
                        currentScheduledNewAlarm={
                          ...innerDataItem,
                          time: currentScheduledNewTimeAlarm,
                          text: action.data.text && action.data.text !== ''
                            ? action.data.text
                              : 'null',
                          isTurned:
                            typeof action.data.switchValue !== 'undefined'
                              ? action.data.switchValue
                                : innerDataItem.isTurned
                        };

                        return {
                          ...currentScheduledNewAlarm
                        };
                      }
                      return innerDataItem;
                    }).filter((innerDataItem) => {
                      if (innerDataItem.id === currentScheduledNewAlarm.id
                        && currentHourDifferentiationNewAlarm && currentHourDifferentiationNewAlarm !== dataItem.hourDifferentiation) {
                        return false;
                      }
                      return true;
                    })
                  }
                }
                return dataItem;
              }).filter((dataItem) => {
                return dataItem.data.length > 0;
              }).concat({
                id: getUniqueId(),
                hourDifferentiation: currentHourDifferentiationNewAlarm,
                data: [
                  {
                    ...currentScheduledNewAlarm
                  }
                ]
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

    case DELETE_TRIGGERED_ALARMS:
      let deleteDateId: string;

      return {
        ...state,
        scheduledAlarmList: state.scheduledAlarmList.map((item) => {
          return {
            ...item,
            data: item.data.map((dataItem) => {
              return {
                ...dataItem,
                data: dataItem.data.filter((innerDataItem) => {
                  if (getCurrentDate() > item.dateId
                    || getCurrentTime() >= innerDataItem.time) return false;
                  return true;
                })
              }
            }).filter((item) => {
              return item.data.length > 0;
            })
          }
        }).filter((item) => {
          if (!(item.data.length > 0)) {
            deleteDateId=item.dateId;
            return false;
          }
          return true;
        }),
        scheduledDateAlarmList: state.scheduledDateAlarmList.filter((item) => {
          if (deleteDateId) return item !== deleteDateId;
          return item;
        })
      };

    default:
      return state;
  }
};

export default alarmReducer;
