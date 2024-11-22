import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Checkbox, SecureInput } from "@/components/basic/MyComponents";
import { useRouter } from "expo-router";
import { usePokedex } from "./_layout";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const LoginScreen = () => {
  const { isTransitioning, closePokedex, openPokedex } = usePokedex();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const router = useRouter();

  const handleLogin = () => {
    const result = loginSchema.safeParse({ username, password });
    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors({
        username: formattedErrors.username?._errors[0] || "",
        password: formattedErrors.password?._errors[0] || "",
      });
      return;
    }
    
    // go to home screen
    closePokedex();
    setTimeout(() => {
      router.push("../../(mainInterface)/HomeScreen");
    }, 600);
  };

  const handleRegister = () => {
    // go to register screen
    closePokedex();
    setTimeout(() => {
      router.push("RegisterScreen");
    }, 600);
  };

  const handleForgot = () => {
    closePokedex();
    setTimeout(() => {
      router.push("/ForgotScreen");
    }, 600);
  };

  useEffect(() => {
    if (isTransitioning) {
      // Close animation
      openPokedex();
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.card}>
        <Image
          source={{
            uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
          }}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Log in</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

        <SecureInput value={password} onChangeText={setPassword} />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        <View style={styles.checkboxContainer}>
          <Checkbox value={staySignedIn} setValue={setStaySignedIn} />
          <Text style={styles.checkboxLabel}>Stay signed in</Text>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={handleRegister}>
          <Text style={styles.linkText}>Register as New Trainer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={handleForgot}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 24,
    textAlign: "center",
  },
  keyboardAvoid: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
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
  errorText: {
    color: "red",
    fontSize: 14,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
