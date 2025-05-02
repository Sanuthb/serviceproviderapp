import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'
import {BounceIn,FadeInDown} from "react-native-reanimated"
import Animated from "react-native-reanimated"


const Splash = () => {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/login')  // Navigate to login screen
      // router.replace('/(admintabs)')  // Navigate to login screen
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <View  style={styles.container}>
      <Animated.Image entering={BounceIn.duration(1000)} source={require('../assets/images/logo.png')} style={styles.logo} />
      <View style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <Animated.Text entering={FadeInDown.duration(500)} style={styles.text}>Handy</Animated.Text>
        <Animated.Text  entering={BounceIn.duration(500)}  style={styles.paragraph}>At your service</Animated.Text>
      </View>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFD63A",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap:50
  },
  logo: {
    width: 220,
    height: 220,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#0d47a1',
    letterSpacing:5,
  },
  paragraph:{
    fontSize: 20,
    color: '#0d47a1',
  }
})
