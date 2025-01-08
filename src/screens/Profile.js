import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

//firebase imports
import { db } from "../config/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const isValidPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return false;
  return /^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/.test(phoneNumber);
};

export default function SettingsTab() {
  const [username, setUsername] = useState(""); // username
  const [gender, setGender] = useState(""); // gender
  const [age, setAge] = useState("18"); // age
  const [phoneNumber, setPhoneNumber] = useState(""); // phone #

  const generateUserNumber = async () => {
    //we want to get a new user ID from the db
    const storedUserNumber = await AsyncStorage.getItem("userNumber");

    //get db snapshot
    if (!storedUserNumber) {
      //get new number
      const docRef = doc(db, "numUsers", "MJNPe07C81x5E6HSgzTO");
      const docSnap = await getDoc(docRef);
      const numberOfUsers = String(docSnap.data().n);

      //incr database number
      await setDoc(docRef, { n: Number(numberOfUsers) + 1 });
      //set async number
      await AsyncStorage.setItem("userNumber", numberOfUsers);

      //speak
      console.log("USER NUMBER NOT IN STORAGE");
      console.log("N IN DB:", numberOfUsers);

      return numberOfUsers;
    } else {
      //speak
      console.log("USER NUMBER FOUND IN STORAGE");
      console.log("N IN DB:", storedUserNumber);

      return storedUserNumber;
    }
  };

  const updateDBProfile = async (n) => {
    const docRef = doc(db, "users", n);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(`User with ID ${n} exists. Updating`);

      await updateDoc(docRef, {
        name: username,
        barMitzvah: gender === "male" && age >= 13,
        phoneNumber: phoneNumber,
      });
    } else {
      console.log(`User with ID ${n} does not exist. Creating a new user.`);
      await setDoc(docRef, {
        name: username,
        barMitzvah: gender === "male" && age >= 13,
        phoneNumber: phoneNumber,
      });
    }
    console.log(gender === "male" && age >= 13);
  };

  // ages arr for picker
  const ages = Array.from({ length: 121 }, (_, i) => i.toString());

  useEffect(() => {
    //load user settings
    const loadSettings = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        const storedGender = await AsyncStorage.getItem("gender");
        const storedAge = await AsyncStorage.getItem("age");
        const phoneNumber = await AsyncStorage.getItem("phoneNumber");

        if (storedGender) {
          setGender(storedGender);
        }
        if (storedAge) {
          setAge(storedAge);
        }
        if (storedUsername) {
          setUsername(storedUsername);
        }
        if (phoneNumber) {
          setPhoneNumber(phoneNumber);
        }
      } catch (error) {
        showToast("Error loading settings", "error");
      }
    };

    loadSettings();
  }, []);

  const saveSettings = async () => {
    console.log("\nPRESSED SAVE");

    if (!username || !gender || !age) {
      // handle empty errors in username
      showToast("Fill out all required fields", "error");
    } else if (username.length > 20 || username.length === 0) {
      // handle errors in username
      showToast("Username is too long", "error");
    } else if (!isValidPhoneNumber(phoneNumber)) {
      // handle phone number errors
      showToast("Phone # must be formatted: +x (xxx)-xxx-xxxx", "error");
    } else {
      // try to save everything
      try {
        await AsyncStorage.setItem("username", username);
        await AsyncStorage.setItem("gender", gender);
        await AsyncStorage.setItem("age", age);
        await AsyncStorage.setItem("phoneNumber", phoneNumber);

        updateDBProfile(await generateUserNumber());

        showToast("Settings saved successfully!", "success");
      } catch (error) {
        showToast("Error saving settings", "error");
      }
    }
  };

  const showToast = (message, type) => {
    Toast.show({
      type: type,
      text1: message,
      position: "top",
    });
  };

  const GenderOption = ({ value, label }) => (
    <TouchableOpacity
      style={[styles.genderOption, gender === value && styles.selectedGender]}
      onPress={() => setGender(value)}
    >
      <Text
        style={[
          styles.genderText,
          gender === value && styles.selectedGenderText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.profileIconContainer}>
          <Ionicons name="person-circle-outline" size={100} color="black" />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Username:</Text>
          <TextInput
            style={styles.usernameInput}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter a username"
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Gender:</Text>
          <View style={styles.genderContainer}>
            <GenderOption value="male" label="Male" />
            <GenderOption value="female" label="Female" />
            <GenderOption value="other" label="Other" />
          </View>
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Phone # (opt):</Text>
          <TextInput
            style={styles.usernameInput}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Enter your phone number"
          />
        </View>

        <View style={[styles.inputRow, styles.pickerRow]}>
          <Text style={styles.label}>Age: {age}</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={age}
              onValueChange={(itemValue) => setAge(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {ages.map((age) => (
                <Picker.Item key={age} label={age} value={age} color="#000" />
              ))}
            </Picker>
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
          <Text style={styles.buttonText}>Save Settings</Text>
        </TouchableOpacity>
        <Toast />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileIconContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 20,
    backgroundColor: "#8bd9fb",
    padding: 20,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  pickerRow: {
    paddingVertical: 10,
  },
  label: {
    fontSize: 18,
  },
  usernameInput: {
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    width: 170,
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    width: 120,
    overflow: "scroll",
  },
  picker: {
    maxHeight: 50,
    transform: [{ translateY: -82.5 }], // Adjust this value to bring the scroller up
  },

  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  genderOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    backgroundColor: "#fff",
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 100,
  },
  selectedGender: {
    backgroundColor: "#000",
  },
  genderText: {
    textAlign: "center",
    fontSize: 13,
  },
  selectedGenderText: {
    color: "#fff",
  },
  saveButton: {
    alignSelf: "center",
    backgroundColor: "#000",
    width: 130,
    height: 40,
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 16,
    margin: 10,
    fontWeight: "bold",
  },
});
