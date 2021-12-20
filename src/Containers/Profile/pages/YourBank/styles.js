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
  YourBank: {
    display: 'flex',
    flexDirection: 'row',
    padding: 14,
    // flex: 1,
    borderRadius: 5,
    marginTop: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 1,
    position: 'relative',
    paddingBottom: 0,
  },
  YourBankUserImg: {
    width: 35,
    height: 35,
    borderRadius: 20,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  YourBankContent: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 5,
  },
  YourBankName: {
    fontSize: 14,
    marginBottom: 3,
    fontWeight: 'bold',
  },
  YourBankNo: {
    fontSize: 13,
    lineHeight: 20,
  },
  DefaultIcon: {
    position: 'absolute',
    top: 50,
    right: 15,
    fontSize: 20,
    color: '#8163C7',
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
  HeadRight: {
    left: 240,
    top: -40,
  },
  NoData: {
    alignSelf: 'center',
    fontSize: 15,
  },
})

export default styles
