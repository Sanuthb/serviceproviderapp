import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'

const Splash = () => {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/login')  // Navigate to login screen
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.text}>Handy</Text>
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
  },
})
