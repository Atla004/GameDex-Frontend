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
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import {SecureInput} from "@/components/basic/MyComponents";
import { usePokedex } from "./_layout";
import { z } from "zod";

// Define validation schema using Zod
const schema = z.object({
  username: z.string().min(1, "Trainer Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters"),
});

interface Errors {
  username?: { _errors: string[] };
  email?: { _errors: string[] };
  password?: { _errors: string[] };
  confirmPassword?: { _errors: string[] };
}

const RegisterScreen = () => {
  const { isTransitioning, closePokedex, openPokedex } = usePokedex();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  
  const handleRegister = () => {
    const result = schema.safeParse({ username, email, password, confirmPassword });
    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors(formattedErrors);
      return;
    }
    closePokedex();
    setTimeout(() => {
      router.push("LoginScreen");
    }, 600);
  };

  const goBackToLogin = () => {
    closePokedex();
    setTimeout(() => {
      router.push("LoginScreen");
    }, 600);
  };

  useEffect(() => {
    if (isTransitioning) {
      // Close animation
      openPokedex();
    }
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Image
              source={{
                uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/premier-ball.png",
              }}
              style={styles.logo}
              resizeMode="contain"
            />

            <Text style={styles.title}>New Trainer Registration</Text>

            <TextInput
              style={styles.input}
              placeholder="Trainer Name"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
            {errors.username && <Text style={styles.errorText}>{errors.username._errors[0]}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email._errors[0]}</Text>}

            <SecureInput
              value={password}
              onChangeText={setPassword}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password._errors[0]}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword._errors[0]}</Text>}

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
    fontSize: 12
  },
});
