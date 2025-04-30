import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const Splash = () => {
  const navigation = useNavigation()

  useEffect(() => {
    // Redirect to the next screen after 3 seconds
    const timer = setTimeout(() => {
      
    }, 3000)

    return () => clearTimeout(timer) // Cleanup timer on component unmount
  }, [navigation])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Splash Screen</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFD63A",
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center", 
    alignItems: "center", 
  },
  text: {
    fontSize: 24, 
    fontWeight: 'bold',
    color: '#000',
  },
})
