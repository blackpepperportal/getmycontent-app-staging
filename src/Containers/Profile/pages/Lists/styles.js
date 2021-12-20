import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  PageContainer: {
    paddingBottom: 100,
  },
  PageSubtitle: {
    fontSize: 14,
    margin: 14,
  },
  ListsCardBlock: {
    padding: 14,
    paddingTop: 0,
    display: 'flex',
  },
  ListsCard: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    justifyContent: 'space-between',
  },
  ListsCardLeft: {
    display: 'flex',
    flexDirection: 'row',
  },
  ListsCardRight: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ListsUserImgBox: {
    width: 40,
    height: 40,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  ListsUserImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#8163C7',
  },
  ListsContent: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 5,
  },
  ListsName: {
    fontSize: 15,
    fontWeight: '600',
  },
  ListsDetails: {
    fontSize: 14,
    lineHeight: 20,
  },
  ListsUserCount: {
    fontSize: 14,
    marginLeft: 5,
  },
})

export default styles
