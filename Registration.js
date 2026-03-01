import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Alert, TouchableOpacity, View, ScrollView } from 'react-native';

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
            // აქ შეგიძლიათ დაამატოთ რეგისტრაციის ლოგიკა
        }
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Text style={styles.registerText}>Register</Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder='First Name'
                            placeholderTextColor="#999"
                            onChangeText={text => this.setState({ firstName: text })}
                            value={this.state.firstName}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder='User Name'
                            placeholderTextColor="#999"
                            onChangeText={text => this.setState({ userName: text })}
                            value={this.state.userName}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder='Phone Number'
                            placeholderTextColor="#999"
                            keyboardType="phone-pad"
                            onChangeText={text => this.setState({ phoneNumber: text })}
                            value={this.state.phoneNumber}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder='Address'
                            placeholderTextColor="#999"
                            onChangeText={text => this.setState({ address: text })}
                            value={this.state.address}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder='Password'
                            placeholderTextColor="#999"
                            secureTextEntry
                            onChangeText={text => this.setState({ password: text })}
                            value={this.state.password}
                        />
                    </View>

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
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 50,
    },

    registerText: {
        fontWeight: 'bold',
        fontSize: 30,
        color: "blue",
        marginBottom: 40,
    },

    inputContainer: {
        width: "80%",
        marginBottom: 20,
    },

    input: {
        width: "100%",
        backgroundColor: "gray",
        height: 50,
        borderRadius: 25,
        paddingHorizontal: 20,
        color: "#fff",
        fontSize: 16,
    },

    button: {
        backgroundColor: "blue",
        width: "80%",
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },

    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    }
});