import { FlatList, Text } from "react-native"
import GoalItem from "./GoalItem"

function renderGoalItem(itemData) {
    return <GoalItem {...itemData.item} />
}

function GoalsList({ goals }) {
    return (
        <FlatList 
            data={goals} 
            renderItem={renderGoalItem} 
            keyExtractor={(item) => item.id}
        />
    )
}

export default GoalsList