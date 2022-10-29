import { View, StyleSheet } from 'react-native'

import { GlobalStyles } from '../../constants/styles'
import GoalsList from './GoalsList'

const DUMMY_GOALS = [
    {
        id: 'g1',
        title: 'Pass IPPT',
        description: 'Exercise alot',
        date: new Date('2021-12-19')
    },
    {
        id: 'g2',
        title: 'Pass driving Test',
        description: 'Practice Driving',
        date: new Date('2022-01-05')
    },
    {
        id: 'g3',
        title: 'Pass General assembly',
        description: 'Complete projects',
        date: new Date('2021-12-01')
    },
]

function GoalsOutput({ goals }) {
    return (
        <View style={styles.container}>
            <GoalsList goals={DUMMY_GOALS} />
        </View>
    )
}

export default GoalsOutput

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        padding: 0,
        backgroundColor: GlobalStyles.colors.primary700
    }
})