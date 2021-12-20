import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  PageContainer: {
    paddingBottom: 60,
    minHeight: '100%',
  },
  PageSubtitle: {
    fontSize: 14,
    margin: 14,
  },
  FileName: {
    fontSize: 14,
    marginTop: 5,
  },
  ScrollContainer: {
    padding: 14,
    paddingTop: 0,
    display: 'flex',
  },
  input: {
    borderWidth: 1,
    paddingBottom: 100,
    paddingLeft: 25,
    fontSize: 14,
    borderRadius: 10,
    marginTop: 5,
    height: 140,
  },
  amountInput: {
    borderWidth: 1,
    paddingLeft: 25,
    fontSize: 14,
    borderRadius: 10,
    marginTop: 15,
    height: 50,
  },
  ProgressContainer: {
    marginTop: 12,
    paddingHorizontal: 14,
  },
  BottomContainer: {
    flex: 1,
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
  UploadContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  UploadButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#8163C7',
    marginTop: 30,
    display: 'flex',
    width: 150,
  },
  UploadButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  UploadImgIco: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 100,
  },
})

export default styles
