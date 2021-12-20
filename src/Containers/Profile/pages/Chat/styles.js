import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'

const Mobileheight = Dimensions.get('window').height
const MobileWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  PageSubtitle: {
    fontSize: 14,
  },
  PageWrapper: {
    flex: 1,
  },
  BottomContainer: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 14,
    paddingBottom: 55,
  },
  ChatWrapper: {
    flex: 1,
  },
  keyboardStyle: {
    flex: 1,
    flexDirection: 'row',
    width: MobileWidth,
  },
  ScrollContainer: {
    paddingHorizontal: 14,
    paddingTop: 14,
    width: MobileWidth,
  },
  RightCard: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
  },
  RightUserImg: {
    width: 35,
    height: 35,
    borderRadius: 20,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    marginRight: 10,
  },
  RightContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    borderRadius: 5,
    marginRight: 30,
  },
  RightName: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  RightMsg: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 3,
  },
  RightTime: {
    fontSize: 10,
    display: 'flex',
    alignSelf: 'flex-end',
  },
  LeftCard: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 20,
    alignContent: 'flex-end',
  },
  LeftContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  LeftMsg: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 3,
  },
  LeftTime: {
    fontSize: 10,
    display: 'flex',
    alignSelf: 'flex-end',
  },
  input: {
    padding: 15,
    fontSize: 14,
    borderRadius: 25,
    flex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 1,
    height: 50,
  },
  SendButton: {
    alignItems: 'center',
    padding: 14,
    borderRadius: 50,
    backgroundColor: '#8163C7',
    width: 50,
    height: 50,
    marginLeft: 10,
    display: 'flex',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 1,
  },
  SendIco: {
    color: '#fff',
    fontSize: 20,
  },
})

export default styles
