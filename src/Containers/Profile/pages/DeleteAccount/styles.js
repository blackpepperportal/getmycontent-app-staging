import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  PageContainer: {
    paddingBottom: 120,
    minHeight: '100%',
  },
  PageSubtitle: {
    fontSize: 16,
    margin: 14,
    marginBottom: 0,
  },
  PageNote: {
    fontSize: 12,
    margin: 14,
    marginTop: 0,
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
  BottomContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 20,
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
