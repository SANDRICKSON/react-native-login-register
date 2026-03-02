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

export default class Login extends React.Component {

  state = {
    email: "",
    password: ""
  }

  checkInput = () => {
    if (this.state.email != '') {
      if (this.state.password != '') {
        Alert.alert('წარმატება', 'თქვენ წარმატებით გაიარეთ ავტორიზაცია!');
      } else {
        Alert.alert('შეცდომა', 'გთხოვთ შეიყვანოთ პაროლი');
      }
    } else {
      Alert.alert('შეცდომა', 'გთხოვთ შეიყვანოთ იმეილი');
    }
  }

  showAlert = () => {
    Alert.alert("Email", this.state.email);
  }

  showFullAlert = () => {
    Alert.alert(
      "Login Information",
      `Email: ${this.state.email}\nPassword: ${this.state.password}`
    );
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>

          <Text style={styles.title}>Log In</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#9ca3af"
              onChangeText={text => this.setState({ email: text })}
              value={this.state.email}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#9ca3af"
              onChangeText={text => this.setState({ password: text })}
              value={this.state.password}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={styles.linkContainer}
            onPress={() => this.props.navigation.navigate('Registration')}
          >
            <Text style={styles.linkText}>Don't have an account?</Text>
            <Text style={styles.linkHighlight}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={this.checkInput}
          >
            <Text style={styles.buttonText}>Log In</Text>
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
    marginTop: 15,
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
  },
});