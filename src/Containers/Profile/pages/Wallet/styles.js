import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  PageContainer: {
    paddingBottom: 100,
    minHeight: '100%',
  },
  ScrollContainer: {
    padding: 14,
    paddingTop: 0,
    display: 'flex',
  },
  PageSubtitle: {
    fontSize: 14,
    marginVertical: 14,
  },
  WalletCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: 30,
    flex: 1,
    borderRadius: 5,
    marginTop: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CardSubtitle: {
    fontSize: 14,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  Cardtitle: {
    fontSize: 24,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    fontWeight: 'bold',
    color: '#8163C7',
  },
  ButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  Button: {
    alignItems: 'center',
    padding: 14,
    borderRadius: 50,
    backgroundColor: '#8163C7',
  },
  ButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  Table: {
    padding: 20,
  },
  TableHead: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  TableHeadText: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    textAlign: 'center',
  },
  TableBody: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    borderTopWidth: 1,
    justifyContent: 'space-around',
  },
  TableBodyText: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    textAlign: 'center',
  },
})

export default styles
