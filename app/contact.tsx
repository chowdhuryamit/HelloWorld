import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Contact = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>contact Page</Text>
      <Link href={'/'} style={styles.back_button}>Back to Home </Link>
    </View>
  )
}

export default Contact

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        fontWeight:'bold',
        fontSize:20
    },
    back_button:{
      backgroundColor:'#81a9eb',
      padding:4,
      borderRadius:10,
      marginTop:10,
      color:'#f0f4fa'
    }
})