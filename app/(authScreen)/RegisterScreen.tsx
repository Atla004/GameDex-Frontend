import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { SecureInput } from "@/components/basic/MyComponents";
import { validateEmail, validateUsername } from "@/utils/validation";
import { useToast } from "@/context/ToastContext";

const backendUrl = process.env.EXPO_PUBLIC_API_URL as string;

interface Errors {
  username?: string ;
  email?: string ;
  password?: string;
  confirmPassword?: string;
}

const RegisterScreen = () => {
  const { setToast } = useToast();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});


  const handleRegister = async () => {
    //limpiar errores
    setErrors({});


    const samePassword =
      password === confirmPassword
        ? { valid: true }
        : { valid: false, errors: ["Passwords do not match"] };

    const result2 = {
      username: validateUsername(username),
      password: validateUsername(password),
      confirmPassword: samePassword,
      email: validateEmail(email),
    };

    if (
      !result2.username.valid ||
      !result2.password.valid ||
      !result2.confirmPassword.valid ||
      !result2.email.valid
    ) {
      setErrors({
        username: result2.username.errors?.[0] || "",
        password: result2.password.errors?.[0] || "",
        confirmPassword: result2.confirmPassword.errors?.[0] || "",
        email: result2.email.errors?.[0] || "",
      });
      return;
    }


    router.push("LoginScreen");
    setToast("Registration successful!", true, 3000, "green");
    return;
    try {
      const response = await fetch(`${backendUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password,user_type: "player"}),
      });
  
      if (!response.ok) {
        setToast("Registration failed", true, 3000);
        return;
      }
      console.log("Registration successful");
  
        router.push("LoginScreen");
        setToast("Registration successful!", true, 3000, "green");
    } catch (error) {
      setToast("Registration failed", true, 3000);
    }
  
  
  };

  const goBackToLogin = () => {
      router.push("LoginScreen");
  };


  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>

            <Text style={styles.title}>New Trainer Registration</Text>

            <TextInput
              style={styles.input}
              placeholder="Trainer Name"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
            {errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <SecureInput value={password} onChangeText={setPassword} />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <SecureInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            {errors.confirmPassword && (
              <Text style={styles.errorText}>
                {errors.confirmPassword}
              </Text>
            )}

            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
            >
              <Text style={styles.registerButtonText}>Start Your Journey</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={goBackToLogin}>
              <Text style={styles.backButtonText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  card: {
    backgroundColor: "white",
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
    marginVertical: 5,
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    width: "100%",
    marginBottom: 16,
  },
  registerButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  backButton: {
    marginTop: 8,
  },
  backButtonText: {
    color: "#3b82f6",
    fontSize: 16,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});
