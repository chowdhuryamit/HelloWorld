import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Colors } from '../constants/Color'

const About = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme?Colors[colorScheme]:Colors.light;
  return (
    <View style={[styles.container,{backgroundColor:theme.background}]}>
      <Text style={[styles.title,{color:theme.text}]}>About Page</Text>
      <Link href={'/'} style={styles.back_button}>Back to Home </Link>
    </View>
  )
}

export default About

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