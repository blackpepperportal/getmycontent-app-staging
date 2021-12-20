import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  NotificationCardBlock: {
    marginBottom: 30,
  },
  NotificationCard: {
    display: 'flex',
    flexDirection: 'row',
    padding: 14,
    flex: 1,
    borderRadius: 5,
    marginTop: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    elevation: 1,
  },
  NotificationUserImg: {
    width: 35,
    height: 35,
    borderRadius: 20,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  NotificationContent: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 12,
  },
  NotificationTime: {
    fontSize: 12,
    marginBottom: 3,
  },
  NotificationDetails: {
    fontSize: 14,
    lineHeight: 20,
  },

})

export default styles
