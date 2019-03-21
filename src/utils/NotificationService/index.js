import PushNotification from 'react-native-push-notification';

class NotificationService {
  constructor(onHandleOpenedReceivedNotif) {
    PushNotification.configure({
      onNotification: onHandleOpenedReceivedNotif,

      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      popInitialNotification: true,
      requestPermissions: true
    });

    this.onHandleLocalNotificationSchedule=(data) => {
      PushNotification.localNotificationSchedule({
        ...data,
        userInfo: {
          id: data.id,
        },
        number: 0,
        title: 'Alarm'
      });
    };

    this.onHandleEditLocalNotificationSchedule=(data) => {
      PushNotification.cancelLocalNotifications({
        id: data.id
      });

      PushNotification.localNotificationSchedule({
        ...data,
        userInfo: {
          id: data.id,
        },
        number: 0,
        title: 'Alarm'
      });
    };

    this.onHandleCancelLocalNotificationSchedule=(data) => {
      PushNotification.cancelLocalNotifications({
        id: data.id
      });
    };
  };
}

export default NotificationService;
