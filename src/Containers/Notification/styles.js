import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  PageContainer: {
    display: 'flex',
    paddingBottom: 120,
  },
   ScrollContainer: {
    padding: 14,
    paddingTop: 0,
  },
  Header: {
    display: 'flex',
    flexDirection: 'row',
    margin: 14,
  },
  TabImg : {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  NotificationTitle: {
    fontSize: 14,
    color: '#A3A3A3'
  }
})

export default styles
