import { FlatList, View, Image, StyleSheet } from "react-native"
import GoalItem from "./GoalItem"

function renderGoalItem(itemData) {
    return <GoalItem {...itemData.item} />
}

function GoalsList({ goals }) {
    return (
        <View>
            <FlatList 
                data={goals} 
                renderItem={renderGoalItem} 
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default GoalsList

const styles = StyleSheet.create({
  
})
