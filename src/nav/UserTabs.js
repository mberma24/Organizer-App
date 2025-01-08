import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Text, StyleSheet, View } from "react-native";
import SignIn from "../screens/SignIn";
import Join from "../screens/Join";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

const UserTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          switch (route.name) {
            case "Minyanim":
              iconName = focused ? "alarm" : "alarm-outline";
              break;
            case "Join":
              iconName = focused ? "add-circle" : "add-circle-outline";
              break;
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              break;
          }
          return (
            <View style={focused ? styles.activeIconContainer : styles.inactiveIconContainer}>
              <Ionicons name={iconName} size={size} color={focused ? "#fff" : "#000"} />
              <Text
                style={{
                  fontSize: 10,
                  color: focused ? "#fff" : "#000",
                  fontWeight: focused ? "bold" : "normal",
                  marginTop: 4
                }}
              >
                {route.name}
              </Text>
            </View>
          );
        },
        tabBarLabel: () => null, // This hides the default label
        tabBarStyle: styles.tabBarStyle,
        tabBarItemStyle: styles.tabBarItemStyle,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#c4c5c5",
        headerTitleAlign: "center",
        headerStyle: styles.headerStyle
      })}
    >
      <Tab.Screen name="Minyanim" component={SignIn} />
      <Tab.Screen name="Join" component={Join} />
      <Tab.Screen name="Profile" component={Profile} />
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
    backgroundColor: "#fff",
  },
  activeIconContainer: {
    backgroundColor: "#000",
    borderRadius: 50,
    width: 90,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    verticalAlign: 'middle',
    marginTop: 15,
  },
  inactiveIconContainer: {
    borderRadius: 50,
    width: 80,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    verticalAlign: 'middle',
    marginTop: 10,
  }
});

export default UserTabs;