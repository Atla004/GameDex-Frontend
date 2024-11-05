import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RotatingPokeball } from '@/components/wraper/RotatingPokeball';


interface SettingOptionProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
}

const SettingOption: React.FC<SettingOptionProps> = ({ icon, title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.settingOption} onPress={onPress}>
    <View style={styles.settingIconContainer}>
      <Image
        source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${icon}.png` }}
        style={styles.settingIcon}
      />
    </View>
    <View style={styles.settingText}>
      <Text style={styles.settingTitle}>{title}</Text>
      {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
    </View>
    <Ionicons name="chevron-forward" size={24} color="#6b7280" />
  </TouchableOpacity>
);

const ProfileScreen = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match!');
      return;
    }
    setShowPasswordModal(false);
    resetPasswordFields();
  };

  const handleEmailChange = () => {
    setShowEmailModal(false);
    setNewEmail('');
  };

  const handleUsernameChange = () => {
    setShowUsernameModal(false);
    setNewUsername('');
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation.toLowerCase() !== 'delete') {
      Alert.alert('Error', 'Please type "delete" to confirm account deletion');
      return;
    }
    Alert.alert(
      'Goodbye, Trainer!',
      'Your account has been deleted. We hope to see you again in the future!',
      [{ text: 'OK', onPress: () => setShowDeleteAccountModal(false) }]
    );
  };

  const resetPasswordFields = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <RotatingPokeball>
      <ScrollView style={styles.container}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editImageButton}>
              <Ionicons name="camera" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.username}>Ash Ketchum</Text>
          <Text style={styles.userLevel}>Level 42 Trainer</Text>
          
          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>128</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>64</Text>
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
            subtitle="Ash Ketchum"
            onPress={() => setShowUsernameModal(true)}
          />
          <SettingOption
            icon="quick-ball"
            title="Change Email"
            subtitle="ash.ketchum@pokemon.com"
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
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.deleteAccountButton}
            onPress={() => setShowDeleteAccountModal(true)}
          >
            <Text style={styles.deleteAccountText}>Delete Account</Text>
          </TouchableOpacity>
        </View>

        {/* Password Change Modal */}
        <Modal
          visible={showPasswordModal}
          transparent
          animationType="slide"
          onRequestClose={() => {
            setShowPasswordModal(false);
            resetPasswordFields();
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Change Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Current Password"
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => {
                    setShowPasswordModal(false);
                    resetPasswordFields();
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.confirmButton]}
                  onPress={handlePasswordChange}
                >
                  <Text style={styles.confirmButtonText}>Change</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Email Change Modal */}
        <Modal
          visible={showEmailModal}
          transparent
          animationType="slide"
          onRequestClose={() => {
            setShowEmailModal(false);
            setNewEmail('');
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Change Email</Text>
              <TextInput
                style={styles.input}
                placeholder="New Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={newEmail}
                onChangeText={setNewEmail}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => {
                    setShowEmailModal(false);
                    setNewEmail('');
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.confirmButton]}
                  onPress={handleEmailChange}
                >
                  <Text style={styles.confirmButtonText}>Change</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Username Change Modal */}
        <Modal
          visible={showUsernameModal}
          transparent
          animationType="slide"
          onRequestClose={() => {
            setShowUsernameModal(false);
            setNewUsername('');
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Change Username</Text>
              <TextInput
                style={styles.input}
                placeholder="New Username"
                value={newUsername}
                onChangeText={setNewUsername}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => {
                    setShowUsernameModal(false);
                    setNewUsername('');
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.confirmButton]}
                  onPress={handleUsernameChange}
                >
                  <Text style={styles.confirmButtonText}>Change</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Delete Account Modal */}
        <Modal
          visible={showDeleteAccountModal}
          transparent
          animationType="slide"
          onRequestClose={() => {
            setShowDeleteAccountModal(false);
            setDeleteConfirmation('');
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Delete Account</Text>
              <Text style={styles.deleteWarning}>
                Warning: This action cannot be undone. All your data, including reviews, favorites, and achievements will be permanently deleted.
              </Text>
              <Text style={styles.deleteInstructions}>
                Type "delete" to confirm:
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Type 'delete' to confirm"
                value={deleteConfirmation}
                onChangeText={setDeleteConfirmation}
                autoCapitalize="none"
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => {
                    setShowDeleteAccountModal(false);
                    setDeleteConfirmation('');
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.deleteButton]}
                  onPress={handleDeleteAccount}
                >
                  <Text style={styles.deleteButtonText}>Delete Account</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </RotatingPokeball>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ef4444',
  },
  profileImageContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: '#fff',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3b82f6',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userLevel: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
  },
  section: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  settingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    marginRight: 12,
  },
  settingIcon: {
    width: 24,
    height: 24,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  accountManagement: {
    padding: 16,
    gap: 12,
  },
  logoutButton: {
    padding: 16,
    backgroundColor: '#dc2626',
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteAccountButton: {
    padding: 16,
    backgroundColor: '#1f2937',
    borderRadius: 12,
    alignItems: 'center',
  },
  deleteAccountText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  deleteWarning: {
    color: '#dc2626',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  deleteInstructions: {
    color: '#4b5563',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
  },
  confirmButton: {
    backgroundColor: '#3b82f6',
  },
  deleteButton: {
    backgroundColor: '#dc2626',
  },
  cancelButtonText: {
    color: '#4b5563',
    fontSize: 16,
    fontWeight: '500',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});