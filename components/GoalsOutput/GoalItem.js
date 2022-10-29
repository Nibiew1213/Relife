import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";

function GoalItem({ id, title, description, date}) {
    const navigation = useNavigation()

    function goalPressHandler() {
        navigation.navigate('ManageGoal', { // navigate to goal detail upon goal press
            goalId: id
        })
    }

    return (
        <Pressable 
            onPress={goalPressHandler}
            style={({ pressed }) => pressed && styles.pressed}
        >
            <View style={styles.goalItem}>
                <View>
                    <Text style={[styles.textBase, styles.title]}>{title}</Text>
                    <Text style={styles.textBase}>
                        {description}
                    </Text>
                </View>
                <View style={styles.dateContainer}>
                    <Text style={styles.date}>{getFormattedDate(date)}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default GoalItem

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75
    },
    goalItem: {
        padding:12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6, 
        elevation: 3
    },
    textBase: {
        color: GlobalStyles.colors.primary50
      },
    title: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    dateContainer: {
        paddingHorizontal: 5,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 80
    },
    date: {
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold',
        fontSize: 12,
    }
})