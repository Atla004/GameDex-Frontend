import { View, Text, Image, StyleSheet } from 'react-native';

interface MessageComponentProps {
  message: {
    text?: string;
    image?: string;
    timestamp: Date;
    isMine: boolean;
  };
}

export function MessageComponent({ message }: MessageComponentProps) {
  return (
    <View style={[
      styles.container,
      message.isMine ? styles.myMessage : styles.theirMessage
    ]}>
      <View style={[
        styles.bubble,
        message.isMine ? styles.myBubble : styles.theirBubble
      ]}>
        {message.image ? (
          <Image source={{ uri: message.image }} style={styles.image} />
        ) : (
          <Text style={[
            styles.text,
            message.isMine ? styles.myText : styles.theirText
          ]}>
            {message.text}
          </Text>
        )}
        <Text style={styles.time}>
          {message.timestamp.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
  },
  myMessage: {
    justifyContent: 'flex-end',
  },
  theirMessage: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '70%',
    borderRadius: 20,
    padding: 12,
  },
  myBubble: {
    backgroundColor: '#007AFF',
  },
  theirBubble: {
    backgroundColor: '#E8E8E8',
  },
  text: {
    fontSize: 16,
  },
  myText: {
    color: 'white',
  },
  theirText: {
    color: 'black',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  time: {
    fontSize: 12,
    color: '#666',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
});