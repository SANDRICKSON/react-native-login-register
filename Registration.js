import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';

export default class Registration extends React.Component {

  state = {
    firstName: "",
    userName: "",
    phoneNumber: "",
    address: "",
    password: ""
  }

  checkInput = () => {
    if (this.state.firstName == '') {
      Alert.alert('შეცდომა', 'გთხოვთ შეიყვანოთ სახელი');
    } else if (this.state.userName == '') {
      Alert.alert('შეცდომა', 'გთხოვთ შეიყვანოთ მომხმარებლის სახელი');
    } else if (this.state.phoneNumber == '') {
      Alert.alert('შეცდომა', 'გთხოვთ შეიყვანოთ ტელეფონის ნომერი');
    } else if (this.state.address == '') {
      Alert.alert('შეცდომა', 'გთხოვთ შეიყვანოთ მისამართი');
    } else if (this.state.password == '') {
      Alert.alert('შეცდომა', 'გთხოვთ შეიყვანოთ პაროლი');
    } else {
      Alert.alert('წარმატება', 'რეგისტრაცია წარმატებით დასრულდა!');
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>

          <Text style={styles.title}>Register</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='First Name'
              placeholderTextColor="#9ca3af"
              onChangeText={text => this.setState({ firstName: text })}
              value={this.state.firstName}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='User Name'
              placeholderTextColor="#9ca3af"
              onChangeText={text => this.setState({ userName: text })}
              value={this.state.userName}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='Phone Number'
              placeholderTextColor="#9ca3af"
              keyboardType="phone-pad"
              onChangeText={text => this.setState({ phoneNumber: text })}
              value={this.state.phoneNumber}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='Address'
              placeholderTextColor="#9ca3af"
              onChangeText={text => this.setState({ address: text })}
              value={this.state.address}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='Password'
              placeholderTextColor="#9ca3af"
              secureTextEntry
              onChangeText={text => this.setState({ password: text })}
              value={this.state.password}
            />
          </View>

          <TouchableOpacity style={styles.linkContainer} onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.linkText}>Already Have an Account?</Text>
            <Text style={styles.linkHighlight}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={this.checkInput}
          >
            <Text style={styles.buttonText}>Registration</Text>
          </TouchableOpacity>

        </View>
        <StatusBar style="auto" />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#f4f6fb',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 32,
    color: "#1e3a8a",
    marginBottom: 30,
  },

  inputContainer: {
    width: "100%",
    marginBottom: 18,
  },

  input: {
    width: "100%",
    backgroundColor: "#ffffff",
    height: 55,
    borderRadius: 14,
    paddingHorizontal: 18,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },

  button: {
    backgroundColor: "#2563eb",
    width: "100%",
    height: 55,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    shadowColor: "#2563eb",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  linkContainer: {
    marginTop: 15,
    alignItems: "center",
  },

  linkText: {
    color: "#6b7280",
    fontSize: 14,
  },

  linkHighlight: {
    color: "#2563eb",
    fontWeight: "600",
    marginTop: 5,
  }
});