import React from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export interface DeleteAccountModalProps {
  visible: boolean;
  onClose: () => void;
  deleteConfirmation: string;
  setDeleteConfirmation: (text: string) => void;
  onDelete: () => void;
}

const DeleteAccountModal = ({
  visible,
  onClose,
  deleteConfirmation,
  setDeleteConfirmation,
  onDelete,
}: DeleteAccountModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Delete Account</Text>
          <Text style={styles.deleteWarning}>
            Warning: This action cannot be undone. All your data, including
            reviews, favorites, and achievements will be permanently
            deleted.
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
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.deleteButton]}
              onPress={onDelete}
            >
              <Text style={styles.deleteButtonText}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteAccountModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f3f4f6",
  },
  cancelButtonText: {
    color: "#4b5563",
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  deleteWarning: {
    color: "#dc2626",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
    textAlign: "center",
  },
  deleteInstructions: {
    color: "#4b5563",
    fontSize: 14,
    marginBottom: 8,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  deleteButton: {
    backgroundColor: "#dc2626",
  },
});
