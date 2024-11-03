import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Checkbox, SecureInput } from "@/components/basic/MyComponents";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

export const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [staySignedIn, setStaySignedIn] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    // go to home screen
    router.push("../(mainInterface)/HomeScreen");

  };

  const handleRegister = () => {
    // go to register screen
    router.push("RegisterScreen");

  };

  const handleForgot = () => {
    // go to forgot password screen
    router.push("ForgotScreen");
  };

  return (
    <>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView>
          <View style={styles.card}>
            <Image
              source={{
                uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
              }}
              style={styles.logo}
              resizeMode="contain"
            />

            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />

            <SecureInput value={password} onChangeText={setPassword} />

            <View style={styles.checkboxContainer}>
              <Checkbox value={staySignedIn} setValue={setStaySignedIn} />
              <Text style={styles.checkboxLabel}>Stay signed in</Text>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkButton}
              onPress={handleRegister}
            >
              <Text style={styles.linkText}>Register as New Trainer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkButton} onPress={handleForgot}>
              <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  card: {
    backgroundColor: "white",
    marginTop: 24,
    borderRadius: 12,
    padding: 24,
    marginHorizontal: 16,
    borderWidth: 4,
    borderColor: "#1f2937",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  input: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#4b5563",
  },
  loginButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    width: "100%",
    marginBottom: 16,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  linkButton: {
    marginVertical: 4,
  },
  linkText: {
    color: "#3b82f6",
    fontSize: 16,
    textAlign: "center",
  },
});
