import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              size={24}
              color={focused?"#FFD63A":""}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={24}
              color={focused?"#FFD63A":""}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "construct" : "construct-outline"}
              size={24}
              color={focused?"#FFD63A":""}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "call" : "call-outline"}
              size={24}
              color={focused?"#FFD63A":""}
            />
          ),
        }}
      />
    </Tabs>
  );
}
