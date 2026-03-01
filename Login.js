import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, Alert, TouchableOpacity, View } from 'react-native';

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
            <View style={styles.container}>
                <Text style={styles.loginText} onPress={this.checkInput}>Log In</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#999"
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#999"
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password}
                    secureTextEntry
                />

                <TouchableOpacity>
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.checkInput}
                >
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>

                <StatusBar style="auto" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    loginText: {
        fontWeight: 'bold',
        fontSize: 30,
        color: "blue",
        marginBottom: 40,
    },

    input: {
        width: "70%",
        backgroundColor: "blue",
        height: 50,
        borderRadius: 25,
        marginBottom: 20,
        paddingHorizontal: 20,
        color: "#fff",
    },

    forgotText: {
        color: "blue",
        marginTop: 10,
        marginBottom: 20,
    },

    button: {
        backgroundColor: "blue",
        width: "70%",
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },

    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    }
});