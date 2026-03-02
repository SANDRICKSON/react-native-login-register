import React, { useState } from 'react';
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

const Registration = ({ navigation }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        userName: "",
        email: "",           // დავამატოთ email ველი
        phoneNumber: "",
        address: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const doRegistration = async () => {
        setLoading(true);

        try {
            // მონაცემების მომზადება Django-ს ფორმატში
            const userData = {
                username: formData.userName,
                first_name: formData.firstName,
                email: formData.email || `${formData.userName}@example.com`, // თუ email არ არის
                phone_number: formData.phoneNumber,
                address: formData.address,
                password: formData.password
            };

            console.log('Sending data:', userData);

            const response = await fetch("http://10.0.2.2:8000/api/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(userData)
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
                setLoading(false);
                return;
            }

            console.log('Parsed response:', data);

            if (!response.ok) {
                // ვალიდაციის შეცდომების ჩვენება
                if (data.errors) {
                    const errorMessages = Object.entries(data.errors)
                        .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
                        .join('\n');
                    Alert.alert('შეცდომა', errorMessages);
                } else {
                    Alert.alert('შეცდომა', data.message || 'დაფიქსირდა შეცდომა');
                }
                setLoading(false);
                return;
            }

            Alert.alert(
                'წარმატება',
                'რეგისტრაცია დასრულდა!',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('Login')
                    }
                ]
            );

        } catch (error) {
            console.error('Network Error:', error);
            Alert.alert('შეცდომა', 'ქსელთან კავშირის პრობლემა: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const checkInput = () => {
        if (!formData.firstName) {
            Alert.alert('შეცდომა', 'გთხოვთ შეიყვანოთ სახელი');
        } else if (!formData.userName) {
            Alert.alert('შეცდომა', 'გთხოვთ შეიყვანოთ მომხმარებლის სახელი');
        } else if (!formData.phoneNumber) {
            Alert.alert('შეცდომა', 'გთხოვთ შეიყვანოთ ტელეფონის ნომერი');
        } else if (!formData.address) {
            Alert.alert('შეცდომა', 'გთხოვთ შეიყვანოთ მისამართი');
        } else if (!formData.password) {
            Alert.alert('შეცდომა', 'გთხოვთ შეიყვანოთ პაროლი');
        } else if (formData.password.length < 6) {
            Alert.alert('შეცდომა', 'პაროლი უნდა შედგებოდეს მინიმუმ 6 სიმბოლოსგან');
        } else {
            doRegistration();
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>რეგისტრაცია</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='სახელი'
                        placeholderTextColor="#9ca3af"
                        onChangeText={text => setFormData({...formData, firstName: text})}
                        value={formData.firstName}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='მომხმარებლის სახელი'
                        placeholderTextColor="#9ca3af"
                        onChangeText={text => setFormData({...formData, userName: text})}
                        value={formData.userName}
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='ელ. ფოსტა (არასავალდებულო)'
                        placeholderTextColor="#9ca3af"
                        keyboardType="email-address"
                        onChangeText={text => setFormData({...formData, email: text})}
                        value={formData.email}
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='ტელეფონის ნომერი'
                        placeholderTextColor="#9ca3af"
                        keyboardType="phone-pad"
                        onChangeText={text => setFormData({...formData, phoneNumber: text})}
                        value={formData.phoneNumber}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='მისამართი'
                        placeholderTextColor="#9ca3af"
                        onChangeText={text => setFormData({...formData, address: text})}
                        value={formData.address}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='პაროლი'
                        placeholderTextColor="#9ca3af"
                        secureTextEntry
                        onChangeText={text => setFormData({...formData, password: text})}
                        value={formData.password}
                    />
                </View>

                <TouchableOpacity
                    style={styles.linkContainer}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.linkText}>უკვე გაქვთ ანგარიში?</Text>
                    <Text style={styles.linkHighlight}>შესვლა</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={checkInput}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>რეგისტრაცია</Text>
                    )}
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
};

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
    }
});

export default Registration;