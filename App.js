import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import UserTabs from './src/nav/UserTabs';
import CreatorTabs from './src/nav/CreatorTabs';
import Icon from 'react-native-vector-icons/Ionicons'; // Ionicons is included in react-native-vector-icons

export default function App() {
  const [isCreatorMode, setIsCreatorMode] = useState(false);

  return (
    <NavigationContainer>
      <View style={styles.container}>

        <TouchableOpacity
          style={[
            styles.iconContainer,
            { backgroundColor: isCreatorMode ? 'black' : "#eee" },
          ]}
          onPress={() => setIsCreatorMode(!isCreatorMode)}
        >
          <Icon 
            name={isCreatorMode ? 'construct' : 'construct-outline'}
            size={30}
            color={isCreatorMode ? "#fff" : "#000"}
          />
  
        </TouchableOpacity>

  
        {isCreatorMode ? <CreatorTabs /> : <UserTabs />}
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconContainer: {
    position: 'absolute',
    top: 80, 
    right: 20, 
    zIndex: 10, 
    borderRadius: 15,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, 
  },
});
