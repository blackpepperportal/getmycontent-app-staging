import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 14,
    marginBottom: 0,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 0,
  },
  MessageCardBlock: {
    padding: 14,
    paddingTop: 0,
    display: 'flex',
  },
  MessageCard: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    justifyContent: 'space-between',
  },
  MessageCardLeft: {
    display: 'flex',
    flexDirection: 'row',
  },
  MessageCardRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  MessageUserImgBox: {
    width: 40,
    height: 40,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  MessageUserImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  Online: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0BF10B',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  MessageContent: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 5,
  },
  MessageName: {
    fontSize: 15,
    fontWeight: '600',
  },
  MessageTime: {
    fontSize: 12,
    marginBottom: 3,
  },
  MessageDetails: {
    fontSize: 14,
    lineHeight: 20,
  },
  MessageCount: {
    backgroundColor: '#8163C7',
    color: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 10,
    overflow: 'hidden',
    fontSize: 10,
  },
})

export default styles
