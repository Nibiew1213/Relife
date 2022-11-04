import { View, StyleSheet, Text, Image } from 'react-native'

import { GlobalStyles } from '../../constants/styles'
import GoalsList from './GoalsList'

function GoalsOutput({ goals, fallbackText }) {
    let content = <Text style={styles.infoText}>{fallbackText}</Text>

    if (goals.length > 0) {
        content = <GoalsList goals={goals} />
    }

    return (
        <View style={styles.container}>
                {content}     
        </View>
    )
}

export default GoalsOutput

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
        padding: 0,
        backgroundColor: GlobalStyles.colors.primary800
    },
    infoText: {
        color: 'white',
        fontSize: 16, 
        textAlign:'center',
        marginTop: 32
    }
})