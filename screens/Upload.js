import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Switch, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/Upload';

export default function Upload() {
  const [image, setImage] = useState(null);
  const [houseSize, setHouseSize] = useState('');
  const [compartments, setCompartments] = useState('');
  const [typology, setTypology] = useState('Apartamento');
  const [hasWater, setHasWater] = useState(false);
  const [hasElectricity, setHasElectricity] = useState(false);
  const [location, setLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [price, setPrice] = useState('');
  const navigation = useNavigation();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos da permissão para acessar a galeria!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      console.log('URI da imagem selecionada:', result.assets[0].uri); // Verifique a URI da imagem
      setImage(result.assets[0].uri); // Atualize o estado da imagem
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos da permissão para acessar a câmera!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      console.log('URI da imagem capturada:', result.assets[0].uri); // Verifique a URI da imagem
      setImage(result.assets[0].uri); // Atualize o estado da imagem
    }
  };

  const getLocation = async () => {
    setIsLoadingLocation(true);

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos da permissão para acessar a localização!');
      setIsLoadingLocation(false);
      return;
    }

    let { coords } = await Location.getCurrentPositionAsync({});
    let address = await Location.reverseGeocodeAsync(coords);

    if (address.length > 0) {
      const { city, district } = address[0];
      setLocation(`${city}, ${district}`);
    } else {
      alert('Não foi possível obter o endereço.');
    }

    setIsLoadingLocation(false);
  };

  const handleSubmit = async () => {
    console.log('URI da imagem no estado:', image); // Verifique o estado da imagem
    if (!image) {
      alert('Por favor, adicione uma imagem da residência.');
      return;
    }

    const residenceData = {
      id: Math.random().toString(36).substr(2, 9), // Gerar um ID único
      image, // URI da imagem
      houseSize,
      compartments,
      typology,
      resources: {
        water: hasWater,
        electricity: hasElectricity,
      },
      location,
      price,
    };

    console.log('Dados da residência a serem salvos:', residenceData); // Verifique os dados antes de salvar

    try {
      const savedResidencesData = await AsyncStorage.getItem('savedResidences');
      const savedResidences = savedResidencesData ? JSON.parse(savedResidencesData) : [];

      savedResidences.push(residenceData);
      await AsyncStorage.setItem('savedResidences', JSON.stringify(savedResidences));

      console.log('Dados salvos:', savedResidences); // Verifique os dados salvos
      alert('Residência cadastrada com sucesso!');

      // Navegar de volta para a tela de Home
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao salvar residência', error);
      alert('Erro ao cadastrar residência');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Cover para adicionar imagem */}
        <TouchableOpacity style={styles.cover} onPress={takePhoto}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.coverContent}>
              <MaterialIcons name="add-a-photo" size={40} color="#666" />
              <Text style={styles.coverText}>Adicione uma imagem</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Formulário */}
        <View style={styles.form}>
          <Text style={styles.label}>Tamanho da casa (m²)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 120"
            keyboardType="numeric"
            value={houseSize}
            onChangeText={setHouseSize}
          />

          <Text style={styles.label}>Número de compartimentos</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 4 (2 quartos, 1 sala, 1 cozinha)"
            value={compartments}
            onChangeText={setCompartments}
          />

          <Text style={styles.label}>Tipologia da casa</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={typology}
              onValueChange={(itemValue) => setTypology(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Apartamento" value="Apartamento" />
              <Picker.Item label="Vivenda" value="Vivenda" />
              <Picker.Item label="Moradia" value="Moradia" />
              <Picker.Item label="Outro" value="Outro" />
            </Picker>
          </View>

          <Text style={styles.label}>Recursos</Text>
          <View style={styles.switchContainer}>
            <Text>Água</Text>
            <Switch
              value={hasWater}
              onValueChange={setHasWater}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
          </View>
          <View style={styles.switchContainer}>
            <Text>Energia Elétrica</Text>
            <Switch
              value={hasElectricity}
              onValueChange={setHasElectricity}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
          </View>

          <Text style={styles.label}>Localização</Text>
          <TouchableOpacity style={styles.locationButton} onPress={getLocation}>
            {isLoadingLocation ? (
              <ActivityIndicator color="#6200ee" />
            ) : (
              <Text style={styles.locationButtonText}>
                {location || 'Obter Localização'}
              </Text>
            )}
          </TouchableOpacity>

          <Text style={styles.label}>Preço (€)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 150000"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />

          {/* Botão de envio */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Cadastrar Residência</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}