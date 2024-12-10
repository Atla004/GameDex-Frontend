import React, { useEffect, useState } from "react";
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
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { usePokedex } from "./_layout";
import { z } from "zod";

const backendUrl = process.env.EXPO_PUBLIC_API_URL as string;

const ForgotScreen = () => {
  const { isTransitioning, closePokedex, openPokedex } = usePokedex();
  const [email_or_username, setUsernameOrEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchData = async (email: string) => {
    try {
      const response = await fetch(`${backendUrl}/api/user/send-reset-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }) 
      });
      const data = await response.json();
      // setMockData(data);
    } catch (error) {
      // setToast("Error getting profile data", true, 3000);
    }
  };

  const handleResetPassword = () => {
    const emailSchema = z.string().email("Invalid email format");
    const usernameSchema = z.string().min(1, "Username is required");

    const isEmail = emailSchema.safeParse(email_or_username).success;
    const isUsername = usernameSchema.safeParse(email_or_username).success;

    if (!isEmail && !isUsername) {
      setError("Please enter a valid email or username");
      return;
    }

    setError("");
    console.log("Reset password");
    fetchData(email_or_username).then(() => {
      closePokedex();
      setTimeout(() => {
        router.push({pathname: "/EnterCodeScreen", params: { email: email_or_username }});
      }, 600)
    })
  };

  const goBackToLogin = () => {
    closePokedex();
    setTimeout(() => {
    router.push("/LoginScreen");
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
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Image
              source={{
                uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
              }}
              style={styles.logo}
              resizeMode="contain"
            />

            <Text style={styles.title}>Reset Password</Text>

            <TextInput
              style={styles.input}
              placeholder="Email or username"
              value={email_or_username}
              onChangeText={setUsernameOrEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleResetPassword}
            >
              <Text style={styles.resetButtonText}>Reset Password</Text>
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

export default ForgotScreen;

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
    marginBottom: 16,
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    width: "100%",
    marginBottom: 16,
  },
  resetButtonText: {
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
    marginBottom: 16,
  },
});
