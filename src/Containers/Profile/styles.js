import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  PageContainer: {
    paddingBottom: 40,
  },
  ProfileHead: {
    display: 'flex',
    flexDirection: 'row',
    padding: 14,
    alignItems: 'center',
  },
  UserImg: {
    display: 'flex',
    flexDirection: 'column',
    width: 70,
    height: 70,
    resizeMode: 'cover',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#8163C7',
  },
  ProfileRight: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
  },
  ProfileName: {
    fontSize: 24,
    fontWeight: '600',
  },
  ProfileUserName: {
    fontSize: 16,
    fontWeight: '500',
  },
  ProfileSubHead: {
    display: 'flex',
    flexDirection: 'row',
    padding: 14,
    paddingTop: 0,
    alignItems: 'center',
  },
  ProfileSubHeadText: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 30,
  },
  ProfileCount: {
    fontSize: 16,
    fontWeight: '600',
  },
  ProfileText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 5,
  },
  ProfileMenuList: {
    paddingHorizontal: 14,
    paddingVertical: 18,
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  ProfileMenuListRight: {
    paddingHorizontal: 14,
    paddingVertical: 18,
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    marginBottom: -8,
    justifyContent: 'space-between',
  },
  ProfileMenuListIcon: {
    fontSize: 16,
    color: '#7A5CC4',
    marginRight: 5,
    width: 24,
  },
  ProfileMenuListText: {
    fontSize: 16,
  },
  ProfileMenuListRightInner: {
    display: 'flex',
    flexDirection: 'row',
  },
  ProfileMenuSwitch: {
    margin: 0,
  },
})

export default styles
