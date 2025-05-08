import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import {Provider} from "react-redux"
import {store} from "../redux/Store"


export default function RootLayout() {
  return (
    <>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="detailedview" options={{ headerShown: true, headerTitle:"" }} />
        <Stack.Screen name="userprofile" options={{ headerShown: false, headerTitle:"" }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(admintabs)" options={{ headerShown: false }} />
      </Stack>
      </Provider>
    </>
  );
}
