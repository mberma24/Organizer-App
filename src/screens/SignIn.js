import React, { useState } from 'react';
import Dropdown from "../components/DropDown";
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const x = console.log("hello world!");

const SignIn = () => {
  const [code, setCode] = useState('');
  const [activePage, setActivePage] = useState(0); // Track the active page

  const pages = [
    { color: "#87CEEB", label: "Shacharit" },
    { color: "#87CEEB", label: "Screen 2" },
    { color: "#87CEEB", label: "Screen 3" },
    { color: "#87CEEB", label: "Screen 4" },
    { color: "#87CEEB", label: "Screen 5" },
    
    { color: "#87CEEB", label: "Screen 6" },
  ];

  const handleScroll = (event) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round((scrollX / 300)); // Use the center of the page for accuracy
    setActivePage(pageIndex);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dropDownContainer}>
        <Dropdown
          data={[
            { value: "0", label: "Minyan 1" },
            { value: "1", label: "Minyan 2" },
            { value: "2", label: "Minyan 3" },
            { value: "3", label: "Minyan 4" },
            { value: "4", label: "Minyan 5" },
            { value: "5", label: "Minyan 0" },
          ]}
          onChange={setCode}
          placeholder="Select minyan"
        />
      </View>
      {/* Contents */}
      <View style={styles.contentsContainer}>
        <ScrollView
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16} // Ensures smooth scrolling tracking
        >
          {pages.map((page, index) => (
            <View key={index} style={[styles.page, { backgroundColor: page.color }]}>
              <Text style={styles.pageName}>{page.label}</Text>
              <Text style={styles.pageTime}>Time</Text>
              
            </View>
          ))}
        </ScrollView>
        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {pages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activePage === index && styles.activeDot, // Highlight the active dot
              ]}
            />
          ))}
        </View>
      </View>
      
      {/* Quit and refresh button */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.quitButtonContainer}>
          <Text style={styles.quitText}>Leave Minyan</Text>
        </TouchableOpacity>
        
        <TouchableOpacity>
          <Ionicons name="refresh-circle" style={styles.refreshButton} size={50} color="white" backgroundColor="#000"/>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  dropDownContainer: {
    paddingTop: 50,
    width: 250,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  contentsContainer: {
    marginTop: 30,
    backgroundColor: "#8bd9fb",
    height: 350,
    width: 300,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    position: "relative", // For proper positioning of the pagination dots
  },
  page: {
    width: 300,
    alignItems:"center",
    borderRadius: 10,
  },
  pageName: {
    marginTop:30,
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  pageTime: {
    marginTop:50,
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  pagination: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#bbb",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#333",
  },
  //bottom bottoms 
  bottomButtons: {
    marginTop:60,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    
  },
  //refresh button
  refreshButton: {
    justifyContent:"center",
    alignItems:"center",


    borderRadius:40,

  

  },
  //quit container
  quitButtonContainer: {
    marginRight:40,
    width:150,
    height:50,
    backgroundColor:"#ff8080",

    justifyContent:"center",
    alignContent:"center",
    alignItems:"center",

    borderRadius:40,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  quitText: {
    color:"#fff",
    fontWeight:"bold",
    fontSize:16,
  }
});

export default SignIn;
