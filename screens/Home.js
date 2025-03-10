import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, Image, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/Home';
import { StatusBar } from 'expo-status-bar';
import { MagnifyingGlass, PlusSquare } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://192.168.23.151:3000/user', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUserData(data);
        } else {
          alert(data.message);
        }
      } catch (error) {
        alert('Erro ao buscar dados do usuário');
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    // Redirecionar para a tela de login ou reiniciar a navegação
    alert('Você saiu com sucesso!');
  };



const cards = [
  { id: 1, title: 'Vivenda T4', subtitle: 'Zango 3', price: '$2,500.00' },
  { id: 2, title: 'Vivenda T4', subtitle: 'Zango 3', price: '$2,500.00' },
  { id: 3, title: 'Vivenda T4', subtitle: 'Zango 3', price: '$2,500.00' },
  { id: 4, title: 'Vivenda T4', subtitle: 'Zango 3', price: '$2,500.00' },
  { id: 5, title: 'Vivenda T4', subtitle: 'Zango 3', price: '$2,500.00' },
  { id: 6, title: 'Vivenda T4', subtitle: 'Zango 3', price: '$2,500.00' },
  { id: 7, title: 'Vivenda T4', subtitle: 'Zango 3', price: '$2,500.00' },
  { id: 8, title: 'Vivenda T4', subtitle: 'Zango 3', price: '$2,500.00' },
  { id: 9, title: 'Vivenda T4', subtitle: 'Zango 3', price: '$2,500.00' },
  { id: 10, title: 'Vivenda T4', subtitle: 'Zango 3', price: '$2,500.00' },
];


const navigation = useNavigation();

function handleDetails() {

        navigation.reset({
          index: 0,
          routes: [{ name: 'Details' }], // Redireciona para a tela principal após login
        });
    }

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.header}>

        <View style={styles.headerLeft}></View>
        <View style={styles.headerRight}></View>

      </View>
      

      <View style={styles.inputContainer}>
        <MagnifyingGlass size={30} weight="duotone" />
        <TextInput 
          style={styles.input}
          placeholder='Pesquise sua casa'
          placeholderTextColor={"#606060"}
        />

      </View>
      
      <View style={styles.content}> 

      <ScrollView contentContainerStyle={styles.cardContainer}>
        <View style={styles.gridContainer}>
        {cards.map((card) => (
              <View key={card.id} style={styles.card}>
                <Pressable style={styles.cardButton} onPress={handleDetails}>
                  <Image style={styles.cardImage} source={require("../assets/Image 1.png")} />
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardInfoTitle}>{card.title}</Text>
                    <Text style={styles.cardInfoSubTitle}>{card.subtitle}</Text>
                  </View>
                </Pressable>
                <View style={styles.cardInfoBuy}>
                  <Text style={styles.cardInfoText}>{card.price}</Text>
                  <PlusSquare size={40} color='#00FF38' weight='fill' />
                </View>
              </View>
            ))}

        </View>

      </ScrollView>
      </View>
      
    </View>
  );
};

export default Home;
