import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function AdminLayout() {
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
        name="service"
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
        name="viewservice"
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
        name="profile"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={focused?"#FFD63A":""}
            />
          ),
        }}
      />
    </Tabs>
  );
}
