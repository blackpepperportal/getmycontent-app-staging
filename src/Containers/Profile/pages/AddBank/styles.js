import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  PageContainer: {
    paddingBottom: 170,
    minHeight: '100%',
  },
  PageSubtitle: {
    fontSize: 14,
    margin: 14,
  },
  ScrollContainer: {
    padding: 14,
    paddingTop: 0,
    display: 'flex',
  },
  input: {
    borderWidth: 1,
    padding: 15,
    fontSize: 14,
    borderRadius: 25,
    marginTop: 15,
  },
  dropdown: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 14,
    borderTopLeftRadius: 25, 
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25, 
    borderBottomRightRadius: 25,
    marginTop: 15,
  },
  BottomContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 110,
    left: 0,
    right: 0,
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  BottomButton: {
    alignItems: 'center',
    padding: 14,
    borderRadius: 50,
    backgroundColor: '#8163C7',
  },
  BottomButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
})

export default styles
