import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Text, Image, StyleSheet, ScrollView, View} from 'react-native';
import {newsData} from '../constant/NewsData';

export default function NewsDetailsScreen({route}: any): React.JSX.Element {
  const {article, itemID} = route.params;
  var selectedArtical = article;
  const {colors} = useTheme();

  if (!article) {
    selectedArtical = newsData.find(item => item.artical_id === itemID);
  }
  return (
    <ScrollView style={styles.container}>
      {selectedArtical.image_url ? (
        <Image source={{uri: selectedArtical.image_url}} style={styles.image} />
      ) : (
        <View style={styles.placeholderImage}>
          <Text>No Image</Text>
        </View>
      )}
      <Text style={[styles.title, {color: colors.text}]}>
        {selectedArtical.title}
      </Text>
      <Text style={[styles.metaData, {color: colors.primary}]}>
        {`Author: ${
          selectedArtical.source_name || 'No author found'
        } | Published at: ${selectedArtical.pubDate}`}
      </Text>
      <Text style={[styles.content, {color: colors.text}]}>
        {selectedArtical.description}
      </Text>
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
