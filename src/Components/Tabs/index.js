import React from 'react';
import { View, StyleSheet } from 'react-native';

const Tabs = ({children}) => {
    return<View style={styles.container}>
        {children}
    </View>;
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        display: "flex",
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        width: '100%',
    },
});

export default Tabs;