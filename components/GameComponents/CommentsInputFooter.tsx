import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';


interface CommentData {
  content: string;
  score: number;
  publication: string;
}

interface CommentInputFooterProps {
  onSubmit: ({content,score,publication}:CommentData) => void;
}

export const CommentInputFooter: React.FC<CommentInputFooterProps> = ({ onSubmit }) => {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [commentData, setCommentData] = useState<CommentData>({
    content: '',
    score: 50,
    publication: '',
  });

  const handleSubmit = () => {

    console.log(commentData);
    if (commentData.content.trim() && commentData.publication.trim()) {
      onSubmit(commentData);
      setCommentData({
        content: '',
        score: 50,
        publication: '',
      });
      setBottomSheetVisible(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <TouchableOpacity
        style={styles.container}
        onPress={() => setBottomSheetVisible(true)}
      >
        <View style={styles.inputPlaceholder}>
          <Text style={styles.placeholderText}>Write a comment...</Text>
        </View>
        <View style={styles.iconContainer}>
          <Ionicons name="chatbox-outline" size={24} color="#6b7280" />
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isBottomSheetVisible}
        onRequestClose={() => setBottomSheetVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setBottomSheetVisible(false)}
        >
          <Pressable style={styles.bottomSheet} onPress={e => e.stopPropagation()}>
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle}>New Comment</Text>
              <TouchableOpacity
                onPress={() => setBottomSheetVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#374151" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Title</Text>
              <TextInput
                style={styles.titleInput}
                placeholder="Enter comment title"
                value={commentData.publication}
                onChangeText={(text) => setCommentData(prev => ({ ...prev, publication: text }))}
                maxLength={100}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Content</Text>
              <TextInput
                style={styles.contentInput}
                placeholder="Write your comment here"
                value={commentData.content}
                onChangeText={(text) => setCommentData(prev => ({ ...prev, content: text }))}
                multiline
                maxLength={500}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Score: {commentData.score}</Text>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={100}
                step={1}
                value={commentData.score}
                onSlidingComplete={(value) => setCommentData(prev => ({ ...prev, score: value }))}
                minimumTrackTintColor="#3b82f6"
                maximumTrackTintColor="#e5e7eb"
                thumbTintColor="#3b82f6"
              />
            </View>

            <TouchableOpacity
              style={[
                styles.submitButton,
                (!commentData.content.trim() || !commentData.publication.trim()) && 
                styles.submitButtonDisabled
              ]}
              onPress={handleSubmit}
              disabled={!commentData.content.trim() || !commentData.publication.trim()}
            >
              <Text style={styles.submitButtonText}>Submit Comment</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'center',
    gap: 8,
  },
  inputPlaceholder: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  placeholderText: {
    color: '#6b7280',
    fontSize: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  closeButton: {
    padding: 4,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  titleInput: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
  },
  contentInput: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  submitButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#e5e7eb',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});