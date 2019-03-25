import { SectionListData } from 'react-native';

export interface AddNewAlarmAction {
  alarmId: number,
  text: string,
  datetime?: object
}

export interface EditCurrentAlarmAction extends AddNewAlarmAction {
  dateId: string,
  sectionListId: number,
  time: string | object
}

export interface Item {
  id: number,
  time: string,
  text: string,
  isTurned?: boolean
}

export interface CurrentOpenItem {
  alarmItem: Item,
  sectionListId: number
}

export interface ModalData {
  title: string,
  minimumDatePicker: object | null,
  modeDatePicker: string,
  onHandleCloseSuccessAlarmModal: (scheduledDateTime: object, alarmTextValue: string, currentOpenAlarm: CurrentOpenItem) => boolean,
  currentOpenAlarm?: CurrentOpenItem
}

export interface AlarmItem {
  dateId: string,
  data: SectionListData<Item>[],
  date: string
}

export interface AlarmState {
  scheduledDateAlarmList: string[],
  scheduledAlarmList: AlarmItem[]
}

export type TextInputField=any;
