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
import { validatePassword, validateUsername } from "@/utils/validation";
import { useUserData } from "../_layout";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AsyncStorage } from 'react-native'

const backendUrl = process.env.EXPO_PUBLIC_API_URL as string;

export const LoginScreen = () => {
  const {
    setUser,
    username: us,
    email: em,
    _id: ide,
    token: tok,
  } = useUserData();
  const { isTransitioning, closePokedex, openPokedex } = usePokedex();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const router = useRouter();

  const handleLogin = () => {
    const result2 = {
      username: validateUsername(username),
      password: validatePassword(password),
    };
    if (!result2.username.valid || !result2.password.valid) {
      setErrors({
        username: result2.username.errors?.[0] || "",
        password: result2.password.errors?.[0] || "",
      });
      return;
    }

    fetch(`${backendUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        console.log(response.ok);
        if (!response.ok) {
          console.log(JSON.stringify(response, null, 4));

          setErrors({ username: "Invalid username or password", password: "" });
        }
        return response.json();
      })
      .then((response) => {
        if (response.error) {
          return;
        }
        console.log(JSON.stringify(response, null, 4));
        setUser({
          username: response.data.user.username,
          _id: response.data.user._id,
          email: response.data.user.email,
          token: response.data.token,
        });

        if (staySignedIn) {
          AsyncStorage.setItem("user", JSON.stringify(response.data))
            .then(() => console.log("User data saved in localStorage"))
            .catch((error) => console.log("Error saving user data", error));
        }

        closePokedex();
        setTimeout(() => {
          router.push("/HomeScreen");
        }, 600);
      })
      .catch((error) => {
        console.log(error);
        setErrors({ username: "", password: "Invalid username or password" });
      });
  };

  const handleRegister = () => {
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
    validateAutoLogin();
    if (isTransitioning) {
      // Close animation
      openPokedex();
    }
  }, []);

  const validateAutoLogin = async () => {
    AsyncStorage.getItem("user").then(async(tok) => {
      if (tok) {
        const parsedUser = JSON.parse(tok);
        console.log("User data retrieved from localStorage", parsedUser.user._id);

        const response = await fetch(`${backendUrl}/api/user/${parsedUser.user._id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${parsedUser.token}`,
          },
        });
        const data = await response.json();
        console.log("Refresh token response", data.data.username);
        if (data.error) {
          return;
        }
        setUser({
          username: data.data.username,
          _id: parsedUser.user._id,
          email: data.data.email,
          token: parsedUser.token,
        });
        closePokedex();
        setTimeout(() => {
          router.push("/HomeScreen");
        }, 600);

      }
    });
  };

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
        {errors.username && (
          <Text style={styles.errorText}>{errors.username}</Text>
        )}

        <SecureInput value={password} onChangeText={setPassword} />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}

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
