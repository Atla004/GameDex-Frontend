import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CommentInputFooterProps {
  onSubmit: (comment: string) => void;
}

export const CommentInputFooter: React.FC<CommentInputFooterProps> = ({ onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment.trim());
      setComment('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          value={comment}
          onChangeText={setComment}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, !comment.trim() && styles.sendButtonDisabled]}
          onPress={handleSubmit}
          disabled={!comment.trim()}
        >
          <Ionicons
            name="send"
            size={24}
            color={comment.trim() ? '#fff' : '#9ca3af'}
          />
        </TouchableOpacity>
      </View>
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
    alignItems: 'flex-end',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingTop: 8,
    paddingRight: 40,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#3b82f6',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#e5e7eb',
  },
});