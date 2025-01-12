import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from "react-native";

const Join = () => {
  

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.container}> 
      <View style={styles.textContainer}>
        <Text style={styles.text}>Enter Minyan ID</Text>
      </View>
      <View style = {styles.searchBarContainer}>
        <TextInput
            style={styles.searchBar}

            placeholder="Enter minyan ID here"
          />
      </View>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Join Minyan</Text>
      </TouchableOpacity>

      
    </View>
    </TouchableWithoutFeedback>
     
  );
};

const styles = StyleSheet.create({
  // page container
  container: {
    paddingTop: 30,
    marginTop: 70,
    alignItems: "center",
    backgroundColor:"#87CEEB",
    height:230,
    width: 350,
    alignSelf:"center",

    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,

  },
  textContainer: {
    

    height:50,
    width:300,
    
    justifyContent:"center",
    alignItems:"center",
    
  },
  //instructions text
  text: {
    fontSize:30,
    fontWeight:"400",

  },
  searchBarContainer: {
    marginTop:10,
    height:50,
    width:300,
    
    borderRadius:10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,

    backgroundColor:"#fff",

    justifyContent:"center",
    alignItems:"center",

  },
  searchBar: {
    marginLeft:40,
    marginRight:40,
    height:50,
    width:250,
  },
  buttonContainer: {
    marginTop:30,
    backgroundColor:"#000",
    borderRadius:30,
    justifyContent:"center",
    alignItems:"center",
    height:40,
    width:120,
    
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,




  },
  buttonText: {
    fontWeight:"bold",
    color:"#fff",
  },
  
 
});

export default Join;
