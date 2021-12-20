 import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  PageContainer: {
    paddingBottom: 50,
  },
  BannerImg: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  ProfileBanner: {
    position: 'relative',
  },
  ProfileBannerOverlay: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 1,
  },
  ProfileHead: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 14,
    alignItems: 'center',
    marginTop: -50,
  },
  UserImg: {
    display: 'flex',
    flexDirection: 'column',
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#8163C7',
    zIndex: 1,
  },
  ProfileRight: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
  },
  ProfileName: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: '600',
    color: '#fff',
  },
  ProfileUserName: {
    fontSize: 16,
    marginBottom: 5,
  },
  ProfileUserRole: {
    fontSize: 16,
    fontWeight: '500',
  },
  TabHeader: {
    display: 'flex',
    flexDirection: 'row',
    margin: 14,
  },
  FilterBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  FilterBoxIcon: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 10,
  },
  ProfileSubHead: {
    display: 'flex',
    flexDirection: 'column',
  },
  ProfileIcoName: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  ProfileIco: {
    fontSize: 14,
    marginRight: 5,
    minWidth: 15,
  },
  ProfileIcoText: {
    fontSize: 14,
  },
  ProfileIcoTextLink: {
    fontSize: 14,
    color: 'blue',
  },
})

export default styles
