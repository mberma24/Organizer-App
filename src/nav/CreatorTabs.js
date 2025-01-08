import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Text, StyleSheet } from "react-native";

import SetUp from "../screens/SetUp";
import Manage from "../screens/Manage";

const Tab = createBottomTabNavigator();

const CreatorTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          switch (route.name) {
            case "SetUp":
              iconName = focused ? "calendar" : "calendar-outline";
              break;
            case "Manage":
              iconName = focused ? "people" : "people-outline";
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ color, focused }) => (
          <Text
            style={{
              fontSize: 10,
              color,
              fontWeight: focused ? "bold" : "normal",
            }}
          >
            {route.name}
          </Text>
        ),
        tabBarStyle: styles.tabBarStyle,
        tabBarItemStyle: styles.tabBarItemStyle,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "##c4c5c5",

        headerTitleAlign: "center",
        headerStyle: styles.headerStyle,
      })}
    >
      <Tab.Screen name="SetUp" component={SetUp} />
      <Tab.Screen name="Manage" component={Manage} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,

    backgroundColor: "#8bd9fb",
    position: "absolute",
    bottom: 15,
    left: 40,
    right: 40,
    borderRadius: 50,
    borderTopWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  tabBarItemStyle: {
    margin: 12,
    marginHorizontal: 20,
    borderRadius: 30,
  },

  headerStyle: {
    borderBottomWidth: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
});

export default CreatorTabs;
