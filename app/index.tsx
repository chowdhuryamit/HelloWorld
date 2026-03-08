import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import logo from '../assets/favicon.png'
import { Link } from 'expo-router'
import ThemedView from '../components/ThemedView'

const Home = () => {
  return (
    <ThemedView style={styles.container}>
      <Image source={logo}/>
      <Text style={styles.title}>The Number 1</Text>
      <Text style={{marginVertical:10}}> Reading app list </Text>
      <View style={styles.buttonRow}>
        {/* <Link href={'/about'} style={styles.back_button}>About page </Link>
        <Link href={'/contact'} style={styles.back_button}>Contact page </Link> */}
        <Link href={'/signin'} style={styles.back_button}>Login to your account </Link>
        <Link href={'/profile'} style={styles.back_button}>Profile </Link>
      </View>

    </ThemedView>
  )
}

export default Home

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
    },
    buttonRow:{
        flexDirection:'row',
        gap:10,
    },
})