import React from 'react';
import {Text, Image, StyleSheet, ScrollView, View} from 'react-native';

export default function NewsDetailsScreen({route}: any): React.JSX.Element {
  const {article} = route.params;

  return (
    <ScrollView style={styles.container}>
      {article.image_url ? (
        <Image source={{uri: article.image_url}} style={styles.image} />
      ) : (
        <View style={styles.placeholderImage}>
          <Text>No Image</Text>
        </View>
      )}
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.metaData}>
        {`Author: ${article.source_name || 'No author found'} | Published at: ${
          article.pubDate
        }`}
      </Text>
      <Text style={styles.content}>{article.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  metaData: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    padding: 5,
  },
  placeholderImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 16,
  },
});
