import { View, Text, TextInput, StyleSheet, Image } from "react-native"
import { GlobalStyles } from '../constants/styles'

function Profile () {

return (
    <View style={styles.container}>
        <Image 
        source={require('../assets/images/profile.png')} 
        style={styles.image}
        />
        <Text style={styles.text}>Work in progress...</Text>
    </View>
)
}
    
export default Profile

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,  
        alignItems: 'center',  
    },
    text: {
        color: '#e2cf7d',
        fontSize: 20, 
        textAlign:'center',
        marginTop: 32
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 30
    }
})