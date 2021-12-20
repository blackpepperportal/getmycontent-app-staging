import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  navbg: {
    height: 60,
    width: '100%',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 0 : -30,
    left: 0,
    right: 0,
  },
  navBgCurve: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    left: 0,
    right: 0,
    width: '100%',
    resizeMode: 'cover',
  },
  navuser: {
    width: 30,
    height: 30,
    top: 0,
    borderRadius: 20,
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: '#8163C7',
  },
})

export default styles
