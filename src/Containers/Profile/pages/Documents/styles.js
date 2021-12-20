import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  PageContainer: {
    paddingBottom: 100,
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
  BottomContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 14,
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
  PreviewCard: {
    height: 120,
    width: 100,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,
    overflow: 'hidden',
    alignItems: 'flex-end',
    justifyContent: 'center',
    // flex: 1,
  },
  PreviewBg: {
    resizeMode: 'cover',
    position: 'absolute',
    height: '100%',
    width: '100%',
    left: 2,
    right: 0,
    top: 0,
    bottom: 0,
  },
  PreviewName: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 5,
    color: '#fff',
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
  },
  PreviewCardOverlay: {
    position: 'absolute',
    left: 2,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#000',
    opacity: 0.3,
    zIndex: 0,
  },
})

export default styles
