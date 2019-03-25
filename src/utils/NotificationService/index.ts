import PushNotification, { PushNotificationScheduleObject } from 'react-native-push-notification';

class NotificationService {
  constructor(onHandleOpenedReceivedNotification: any) {
    PushNotification.configure({
      onNotification: onHandleOpenedReceivedNotification,

      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      popInitialNotification: true,
      requestPermissions: true
    });
  }

  onHandleLocalNotificationSchedule=(data: PushNotificationScheduleObject) => {
    PushNotification.localNotificationSchedule({
      ...data,
      userInfo: {
        id: data.id,
      },
      number: '0',
      title: 'Alarm'
    });
  };

  onHandleEditLocalNotificationSchedule=(data: PushNotificationScheduleObject) => {
    PushNotification.cancelLocalNotifications({
      id: data.id
    });

    PushNotification.localNotificationSchedule({
      ...data,
      userInfo: {
        id: data.id,
      },
      number: '0',
      title: 'Alarm'
    });
  };

  onHandleCancelLocalNotificationSchedule=(data: PushNotificationScheduleObject) => {
    PushNotification.cancelLocalNotifications({
      id: data.id
    });
  };
}

export default NotificationService;
