import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import {Article} from '../models/Article';
import {Colors} from '../constant/Colors';

const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const API_KEY = 'pub_516786e5700021db69c12fd9193baa501a35c';

export default function NewsListScreen({navigation}: any): React.FC {
  const [news, setNews] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNews, setFilteredNews] = useState<Article[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    filterNews();
  }, [searchQuery, news]);

  const fetchNews = async () => {
    try {
      const response = await axios.get(
        `https://newsdata.io/api/1/latest?apikey=${API_KEY}&q=donald%20trump`,
      );
      setNews(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const filterNews = () => {
    const filtered = news.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredNews(filtered);
  };
  console.log(filteredNews);
  const onRefresh = () => {
    setRefreshing(true);
    fetchNews().finally(() => setRefreshing(false));
  };

  const renderItem = ({item}: {item: Article}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('DetailsScreen', {article: item})}>
      <View style={styles.newContainer}>
        {item.image_url ? (
          <Image source={{uri: item.image_url}} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text>No Image</Text>
          </View>
        )}
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <Text style={styles.autherText}> {item.source_name}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search News..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredNews}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  newContainer: {flexDirection: 'row', alignItems: 'center'},
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: Colors.gray95,
    borderRadius: 12,
    padding: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  title: {
    fontSize: 14,
    flexShrink: 1,
    color: 'black',
    fontWeight: 'bold',
  },
  placeholderImage: {
    width: 80,
    height: 80,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 16,
  },
  autherText: {
    fontSize: 12,
    color: 'white',
    backgroundColor: Colors.secondary,
    borderRadius: 4,
    padding: 3,
  },
});

/*import {Button, Text, View} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';

export default function NewsListScreen({navigation}: any): React.JSX.Element {
  return (
    <View>
      <Text>news list</Text>
      <Button
        title="logout"
        onPress={async () => {
          await AsyncStorage.clear(); // Clear all stored data
          navigation.reset({
            index: 0,
            routes: [{name: 'LoginFormScreen'}],
          });
          /* await AsyncStorage.removeItem('hasLaunched');

          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'LoginFormScreen'}],
            }),
          );*/
// navigation.navigate('LoginFormScreen');
/*  }}
      />
    </View>
  );
}
async function handleButtonPress(navigation: any) {
  await AsyncStorage.setItem('hasLaunched', 'false');
  navigation.navigate('LoginFormScreen');
}*/
