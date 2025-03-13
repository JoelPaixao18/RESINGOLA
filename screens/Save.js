import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Save() {
  const [savedCards, setSavedCards] = useState([]);

  useEffect(() => {
    const fetchSavedCards = async () => {
      try {
        const savedCardsData = await AsyncStorage.getItem('savedCards');
        if (savedCardsData) {
          setSavedCards(JSON.parse(savedCardsData));
        }
      } catch (error) {
        console.error('Erro ao carregar os cards salvos', error);
      }
    };

    fetchSavedCards();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <ScrollView>
        {savedCards.length === 0 ? (
          <Text>Nenhum card salvo!</Text>
        ) : (
          savedCards.map((card, index) => (
            <View key={index} style={{ padding: 16, marginBottom: 8, backgroundColor: '#fff', borderRadius: 8 }}>
              <Text>{card.title}</Text>
              <Text>{card.subtitle}</Text>
              <Text>{card.price}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

export default Save;
