import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#8163C7',
    height: 50,
    alignItems: 'center',
    zIndex: 1,
  },
  leftButton: {
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    zIndex: 99,
  },
  rightButton: {
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    zIndex: 99,
  },
  buttonIcon: {
    color: '#fff',
    fontSize: 20,
  },
  titleContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
})

export default styles
