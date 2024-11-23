import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { z } from "zod";

import { SettingOption } from "@/components/ProfileComponents/SettingOption";
import PasswordChangeModal from "@/components/mainInterfaceComponents/ProfileScreenComponents/PasswordChangeModal";
import EmailChangeModal from "@/components/mainInterfaceComponents/ProfileScreenComponents/EmailChangeModal";
import UsernameChangeModal from "@/components/mainInterfaceComponents/ProfileScreenComponents/UsernameChangeModal";
import DeleteAccountModal from "@/components/mainInterfaceComponents/ProfileScreenComponents/DeleteAccountModal";

import { router } from "expo-router";
import { ProfileImageSelectorModal } from "@/components/mainInterfaceComponents/ProfileScreenComponents/ProfileImageSelectorModal";
import { useToast, useUserData } from "../_layout";
import { validateEmail, validatePassword, validateUsername } from "@/utils/validation";

const backendUrl = process.env.EXPO_PUBLIC_API_URL as string;

interface ProfileData {
  profileImageUri: string;
  username: string;
  userLevel: number;
  reviews: number;
  favorites: number;
  email: string;
}



const ProfileScreen = () => {
  const { setToast } = useToast();
  const [mockData, setMockData] = useState<ProfileData>();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [showImageSelectorModal, setShowImageSelectorModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { _id } = useUserData()
        const response = await fetch(`${backendUrl}/api/user/${_id}`);
        const data = await response.json();
        setMockData(data);
      } catch (error) {
        setToast("Error getting profile data", true, 3000);
      }
    };

    fetchData();
  }, []);

  const handlePasswordChange = () => {

    const validation = validatePassword(newPassword);

    if (!validation.valid) {
      Alert.alert("Error", validation.errors?.[0]);
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords do not match!");
      return;
    }
    setShowPasswordModal(false);
    resetPasswordFields();
  };

  const handleEmailChange = () => {
    const validation = validateEmail(newEmail);
    if (!validation.valid) {
      Alert.alert("Error", validation.errors?.[0]);
      return;
    }
    setShowEmailModal(false);
    setNewEmail("");
  };

  const handleUsernameChange = () => {
    const validation = validateUsername(newUsername);
    if (!validation.valid) {
      Alert.alert("Error", validation.errors?.[0]);
      return;
    }
    setShowUsernameModal(false);
    setNewUsername("");
  };

  const handleLogout = () => {
    Alert.alert("Goodbye, Trainer!", "You have been logged out.", [
      { text: "OK", onPress: () => {
        router.dismissAll();
        router.replace("/LoginScreen");
      } },
    ]);
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation.toLowerCase() !== "delete") {
      Alert.alert("Error", 'Please type "delete" to confirm account deletion');
      return;
    }
    Alert.alert(
      "Goodbye, Trainer!",
      "Your account has been deleted. We hope to see you again in the future!",
      [{ text: "OK", onPress: () => setShowDeleteAccountModal(false) }]
    );
    router.dismissAll();
    router.replace("/LoginScreen");
  };

  const resetPasswordFields = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleChangeProfileImage = () => {
    setShowImageSelectorModal(true);
  };

  const handleSelectProfileImage = (imageUri: string) => {
    setMockData(prev => prev ? { ...prev, profileImageUri: imageUri } : prev);

  };

  return (
    <>
      <ScrollView style={styles.container}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: mockData?.profileImageUri }}
              style={styles.profileImage}
            />
            <TouchableOpacity 
              onPress={handleChangeProfileImage}
              style={styles.editImageButton}
            >
              <Ionicons name="camera" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.username}>{mockData?.username}</Text>
          <Text style={styles.userLevel}>Level {mockData?.userLevel} Trainer</Text>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{mockData?.reviews}</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{mockData?.favorites}</Text>
              <Text style={styles.statLabel}>Favorites</Text>
            </View>
          </View>
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <SettingOption
            icon="master-ball"
            title="Change Username"
            subtitle={mockData?.username}
            onPress={() => setShowUsernameModal(true)}
          />
          <SettingOption
            icon="quick-ball"
            title="Change Email"
            subtitle={mockData?.email}
            onPress={() => setShowEmailModal(true)}
          />
          <SettingOption
            icon="ultra-ball"
            title="Change Password"
            subtitle="********"
            onPress={() => setShowPasswordModal(true)}
          />
        </View>

        {/* Help & Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Help & Information</Text>
          <SettingOption
            icon="luxury-ball"
            title="About Us"
            subtitle="Learn about our mission"
            onPress={() => {}}
          />
          <SettingOption
            icon="premier-ball"
            title="FAQ"
            subtitle="Common questions and answers"
            onPress={() => {}}
          />
        </View>

        {/* Account Management */}
        <View style={styles.accountManagement}>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}   
          >
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteAccountButton}
            onPress={() => setShowDeleteAccountModal(true)}
          >
            <Text style={styles.deleteAccountText}>Delete Account</Text>
          </TouchableOpacity>
        </View>

        {/* Modals */}
        <PasswordChangeModal
          visible={showPasswordModal}
          onClose={() => {
            setShowPasswordModal(false);
            resetPasswordFields();
          }}
          currentPassword={currentPassword}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          setCurrentPassword={setCurrentPassword}
          setNewPassword={setNewPassword}
          setConfirmPassword={setConfirmPassword}
          onChange={handlePasswordChange}
        />
        <EmailChangeModal
          visible={showEmailModal}
          onClose={() => {
            setShowEmailModal(false);
            setNewEmail("");
          }}
          newEmail={newEmail}
          setNewEmail={setNewEmail}
          onChange={handleEmailChange}
        />
        <UsernameChangeModal
          visible={showUsernameModal}
          onClose={() => {
            setShowUsernameModal(false);
            setNewUsername("");
          }}
          newUsername={newUsername}
          setNewUsername={setNewUsername}
          onChange={handleUsernameChange}
        />
        <DeleteAccountModal
          visible={showDeleteAccountModal}
          onClose={() => {
            setShowDeleteAccountModal(false);
            setDeleteConfirmation("");
          }}
          deleteConfirmation={deleteConfirmation}
          setDeleteConfirmation={setDeleteConfirmation}
          onDelete={handleDeleteAccount}
        />
        <ProfileImageSelectorModal
          visible={showImageSelectorModal}
          onClose={() => setShowImageSelectorModal(false)}
          onSelectImage={handleSelectProfileImage}
        />
      </ScrollView>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {},
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ef4444",
  },
  profileImageContainer: {
    position: "relative",
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
    backgroundColor: "#fff",
    borderWidth: 4,
    borderColor: "#fff",
  },
  editImageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#3b82f6",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  userLevel: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.9,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 16,
    width: "100%",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  statLabel: {
    fontSize: 12,
    color: "#fff",
    opacity: 0.9,
  },
  section: {
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
  },
  accountManagement: {
    padding: 16,
    gap: 12,
  },
  logoutButton: {
    padding: 16,
    backgroundColor: "#dc2626",
    borderRadius: 12,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteAccountButton: {
    padding: 16,
    backgroundColor: "#1f2937",
    borderRadius: 12,
    alignItems: "center",
  },
  deleteAccountText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});