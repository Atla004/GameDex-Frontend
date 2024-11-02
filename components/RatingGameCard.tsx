import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { PokeBallRating } from '@/components/PokeballRating';

interface RatingGameCardProps {
  imageUrl: string;
  title: string;
  description: string;
  criticScore: number;
  userScore: number;
  ranking: number;
}

export const RatingGameCard: React.FC<RatingGameCardProps> = ({
  imageUrl,
  title,
  description,
  criticScore,
  userScore,
  ranking,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.rankingContainer}>
        <Text style={styles.rankingNumber}>#{ranking}</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
            <Text style={styles.description} numberOfLines={2}>
              {description}
            </Text>
          </View>
        </View>
        
        <View style={styles.ratingsContainer}>
          <PokeBallRating score={criticScore} type="critic" />
          <PokeBallRating score={userScore} type="user" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#2563eb',
    overflow: 'hidden',
    margin: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  rankingContainer: {
    width: 40,
    backgroundColor: '#1d4ed8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankingNumber: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  image: {
    width: 80,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 16,
  },
  ratingsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
});