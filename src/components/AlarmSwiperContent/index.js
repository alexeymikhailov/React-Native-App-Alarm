import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import NoScheduledAlarms from '../NoScheduledAlarms';
import AlarmHeader from '../AlarmHeader';
import ListAlarmItems from '../ListAlarmItems';
import styles from './styles';

class AlarmSwiperContent extends Component {
  render() {
    const { scheduledAlarmList }=this.props;

    return (
      <View style={styles.alarmSwiperContentWrap}>
        <Swiper
          loop={true}
          index={0}
          showsButtons={false}
          showsPagination={false}>
          {
            scheduledAlarmList.length > 0 ? scheduledAlarmList.map((alarmItem) => (
              <View
                style={styles.slideItemAlarmSwiperContentWrap}
                key={alarmItem.dateId}>
                <AlarmHeader
                  date={alarmItem.date} />
                <ListAlarmItems
                  dateId={alarmItem.dateId}
                  data={alarmItem.data} />
              </View>
            )) : (
              <View style={styles.slideItemAlarmSwiperContentWrap}>
                <AlarmHeader />
                <NoScheduledAlarms />
              </View>
            )
          }
        </Swiper>
      </View>
    );
  }
}

const mapStateToProps=(state) => {
  const {
    scheduledAlarmList
  }=state;

  return {
    scheduledAlarmList
  };
};

export default connect(mapStateToProps)(AlarmSwiperContent);
