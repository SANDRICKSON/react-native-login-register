import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator
} from 'react-native';

export default class Login extends React.Component {

  state = {
    username: "",  // შეცვალე email-იდან username-ად
    password: "",
    loading: false
  }

  // 🔐 LOGIN ფუნქცია - Django-სთან კავშირი
  doLogin = async () => {
    this.setState({ loading: true });

    try {
      console.log('Login attempt:', this.state.username);

      const response = await fetch("http://10.0.2.2:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      });

      // პასუხის წაკითხვა
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('JSON parse error:', e);
        Alert.alert('შეცდომა', 'სერვერიდან მოსული პასუხი არასწორია');
        this.setState({ loading: false });
        return;
      }

      console.log('Parsed response:', data);

      if (!response.ok) {
        // შეცდომის დეტალების ჩვენება
        const errorMessage = data.message ||
                            (data.errors ? Object.values(data.errors).flat().join(', ') : 'არასწორი მომხმარებელი ან პაროლი');
        Alert.alert('შეცდომა', errorMessage);
        this.setState({ loading: false });
        return;
      }

      // 🎉 წარმატებული შესვლა
      Alert.alert(
        'წარმატება',
        'თქვენ წარმატებით შეხვედით სისტემაში',
        [
          {
            text: 'OK',
            onPress: () => {
              // აქ შეგიძლიათ შეინახოთ ტოკენები (AsyncStorage-ში)
              console.log('Access Token:', data.tokens?.access);
              console.log('User:', data.user);

              // გადავიდეთ მთავარ გვერდზე
              // this.props.navigation.navigate('Home');
            }
          }
        ]
      );

    } catch (error) {
      console.error('Network Error:', error);
      Alert.alert('შეცდომა', 'ქსელთან კავშირის პრობლემა: ' + error.message);
    } finally {
      this.setState({ loading: false });
    }
  }

  // ✅ ვალიდაცია
  checkInput = () => {
    if (!this.state.username.trim()) {
      Alert.alert('შეცდომა', 'გთხოვთ შეიყვანოთ მომხმარებლის სახელი');
    } else if (!this.state.password.trim()) {
      Alert.alert('შეცდომა', 'გთხოვთ შეიყვანოთ პაროლი');
    } else {
      this.doLogin();
    }
  }

  // 📧 მეილის შეტყობინება (დებაგისთვის)
  showAlert = () => {
    Alert.alert("Username", this.state.username);
  }

  // 📋 სრული ინფორმაცია (დებაგისთვის)
  showFullAlert = () => {
    Alert.alert(
      "Login Information",
      `Username: ${this.state.username}\nPassword: ${this.state.password}`
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
              placeholder="Enter your username"  // შეცვლილია email-იდან username-ად
              placeholderTextColor="#9ca3af"
              onChangeText={text => this.setState({ username: text })}
              value={this.state.username}
              autoCapitalize="none"
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
            style={[styles.button, this.state.loading && styles.buttonDisabled]}
            onPress={this.checkInput}
            disabled={this.state.loading}
          >
            {this.state.loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Log In</Text>
            )}
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

  buttonDisabled: {
    backgroundColor: "#93c5fd",
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