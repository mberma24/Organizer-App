import React, { useState } from 'react';
import Dropdown from "../components/DropDown";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
//open maps
import { showLocation } from 'react-native-map-link';
//icons
import { Ionicons } from "@expo/vector-icons";
//firebase imports
import { db } from "../config/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const SignIn = () => {
  const [code, setCode] = useState('');
  const [activePage, setActivePage] = useState(0); // Track the active page\

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
    const pageIndex = Math.round((scrollX / 350)); // Use the center of the page for accuracy
    setActivePage(pageIndex);
  };

  return (
    <View style={styles.container}>
      {/* Dropdown display */}
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
        {/* Horizontal slider for pages */}
        <ScrollView
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
        >
          {pages.map((page, index) => (
            <View key={index} style={[styles.page, { backgroundColor: page.color }]}>
              <View style={styles.nameBox}> 
                <Text style={styles.nameText}>{page.label}</Text>
              </View>
              <View style = {styles.fullContainter}>
              <View style={styles.timeBox}>
                <Text style={styles.pageTime}>Time:</Text>
                <Text style={styles.timeText}>XX:XX am</Text>
              </View>

              <View style={styles.locationBox}>
                <Text style={styles.locLiteral}>Location</Text>
                <TouchableOpacity
                  onPress={() =>
                    showLocation({
                      address: "197 E. Woodland Circle Thornton, CO 80241", 
                      dialogTitle: "Open in Maps", 
                      dialogMessage: "Would you like to open this location in maps?", 
                      cancelText: "Cancel", 
                    })
                  }
                >
                  <Text style={styles.locationText}>197 E. Woodland Circle Thornton, CO 80241</Text>
                </TouchableOpacity>
              </View>
              
              </View>
              <View style={styles.schedulingBox}>
                <TouchableOpacity>
                  <Ionicons name="alarm" size={40} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="calendar" size={40} color="black" />
                </TouchableOpacity>
              </View>
              
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
        
        <TouchableOpacity style={styles.refreshButtonContainer}>
          <Ionicons name="refresh-circle" style={styles.refreshButton} size={55}  />
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
    height: 375,
    width: 350,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    position: "relative", // For proper positioning of the pagination dots
  },
  page: {
    width: 350,
    alignItems:"center",
    borderRadius: 10,
    alignContent:"space-evenly"
  },
  
  nameBox: {
    marginTop:30,
    height:40,
    width: 250,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    alignContent:"center",
    borderRadius:10,
  },
  nameText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  fullContainter: {
    width: 325,
    height: 180,
    backgroundColor:"#fff",
    marginTop:15,
    borderRadius:20,
    justifyContent: "center",
    alignItems:"center",
    paddingBottom:20,
  },
  timeBox: {
    width:300,
    height:50,
    flexDirection:"row",
    justifyContent:"space-evenly",
    alignItems:"center",
    
  },
  pageTime: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
  },
  timeText: {
    fontSize: 17,
    color: "#000",
  },
  locationBox: {
    marginTop:10,
    width:300,
    height:80,
    justifyContent:"space-evenly",
    alignItems:"center",
  },
  locLiteral: {
    fontSize: 18,
    fontWeight:"bold",
  },
  locationText: {
    fontSize: 13,
    textDecorationLine:"underline",
  },
  schedulingBox: {
    width:325,
    height:70,
    marginTop: 10,
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",

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
  //bottom bottoms (quit, refresh)
  bottomButtons: {
    marginTop:60,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    
  },
  //refresh button
  refreshButtonContainer: {
    justifyContent:"center",
    alignItems:"center",
    alignContent:"center",
    alignSelf:"center",

    borderRadius:80,
    height:40,
    width:40,
    marginLeft:60,
    backgroundColor:"#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,

  },
  //refresh button
  refreshButton: {
    color: "#fff",
    height:55,
    width:55,
  },
  //quit container
  quitButtonContainer: {
    marginRight:50,
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
