import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
  } from "react-native";
  import React, { useState } from "react";
  import { useRouter } from "expo-router";
  import Animated, {
    FadeInDown,
    FadeInRight,
    FadeInUp,
    FadeIn,
  } from "react-native-reanimated";
  import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
  import {auth} from "../firebase"
  
  const Register = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
  
    const handleRegister = async () => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
      
          // Optional: Set display name
          await updateProfile(user, {
            displayName: name,
          });
      
          console.log("User registered:", user.email);
          router.replace("/(tabs)");
        } catch (error) {
          console.error("Registration Error:", error);
          // Optionally show error to user here
        }
    }
  
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Animated.View
          entering={FadeInDown.duration(800)}
          style={styles.innerContainer}
        >
          <Animated.Text entering={FadeInDown.delay(100)} style={styles.heading}>
            Create Account
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(300)}
            style={styles.subHeading}
          >
            Join us and get started!
          </Animated.Text>
  
          <Animated.View entering={FadeInRight.delay(500)}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#aaa"
              value={name}
              onChangeText={setName}
            />
          </Animated.View>
  
          <Animated.View entering={FadeInRight.delay(600)}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </Animated.View>
  
          <Animated.View entering={FadeInRight.delay(700)}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#aaa"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </Animated.View>
  
          <Animated.View entering={FadeInUp.delay(900)}>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </Animated.View>
  
          <Animated.View entering={FadeIn.delay(1100)} style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.replace("/login")}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </KeyboardAvoidingView>
    );
  };
  
  export default Register;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f7f9fc",
      justifyContent: "center",
      paddingHorizontal: 24,
    },
    innerContainer: {
      backgroundColor: "#fff",
      padding: 24,
      borderRadius: 16,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
    },
    heading: {
      fontSize: 28,
      fontWeight: "700",
      color: "#0d47a1",
      textAlign: "center",
      marginBottom: 8,
    },
    subHeading: {
      fontSize: 16,
      color: "#666",
      textAlign: "center",
      marginBottom: 24,
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 12,
      paddingHorizontal: 16,
      fontSize: 16,
      marginBottom: 16,
      backgroundColor: "#f9f9f9",
    },
    button: {
      backgroundColor: "#0d47a1",
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: "center",
      marginTop: 8,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
    loginContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 24,
    },
    loginText: {
      fontSize: 14,
      color: "#444",
    },
    loginLink: {
      fontSize: 14,
      color: "#0d47a1",
      fontWeight: "600",
    },
  });
  