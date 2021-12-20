import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  PageContainer: {
    paddingBottom: 10,
    minHeight: '100%',
  },
  PageSubtitle: {
    fontSize: 14,
    paddingTop: 10,
  },
  ScrollContainer: {
    margin: 14,
    paddingTop: 0,
    display: 'flex',
  },
  HelpCardBlock: {
    marginBottom: 14,
  },
  HelpCard: {
    display: 'flex',
    flexDirection: 'row',
    padding: 14,
    borderRadius: 5,
    marginTop: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 1,
    position: 'relative',
  },
  HelpCardUserImg: {
    width: 35,
    height: 35,
    borderRadius: 20,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  HelpCardContent: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 5,
  },
  HelpCardName: {
    fontSize: 14,
    marginBottom: 3,
    fontWeight: 'bold',
  },
  HelpCardNo: {
    fontSize: 13,
    lineHeight: 20,
  },
  CallIcon: {
    position: 'absolute',
    top: 22,
    right: 15,
    fontSize: 20,
    color: '#8163C7',
  },
  FaqHead: {
    padding: 14,
    borderRadius: 5,
    marginTop: 8,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  FaqBody: {
    padding: 14,
    borderRadius: 5,
    marginTop: 5,
  },
  CollapseIcon: {
    display: 'flex',
  },
  FaqHeadText: {
    fontSize: 14,
    lineHeight: 20,
  },
  FaqBodyText: {
    fontSize: 13,
    lineHeight: 20,
  },
})

export default styles
