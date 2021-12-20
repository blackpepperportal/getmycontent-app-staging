import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  PageContainer: {
    paddingBottom: 120,
    minHeight: '100%',
  },
  TabHeader: {
    display: 'flex',
    flexDirection: 'row',
    margin: 14,
  },
  ScrollContainer: {
    padding: 14,
  },
  Table: {
    padding: 10,
    borderRadius: 5,
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
    fontSize: 13.5,
  },
})

export default styles
