import React, { useEffect, useState } from 'react';
import { View, Button, Image, Text, Platform } from 'react-native';
import * as Camera from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

const Upload = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const getPermissions = async () => {
      // Solicitar permissões para a câmera
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      // Solicitar permissões para a galeria
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    };

    getPermissions();
  }, []);

  const takePhoto = async () => {
    if (hasCameraPermission) {
      const photo = await Camera.takePictureAsync();
      setImageUri(photo.uri);
    } else {
      alert('Você precisa conceder permissão para a câmera!');
    }
  };

  const pickImage = async () => {
    if (hasGalleryPermission) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.cancelled) {
        setImageUri(result.uri);
      }
    } else {
      alert('Você precisa conceder permissão para a galeria!');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {hasCameraPermission === null || hasGalleryPermission === null ? (
        <Text>Carregando permissões...</Text>
      ) : hasCameraPermission === false || hasGalleryPermission === false ? (
        <Text>Permissões negadas!</Text>
      ) : (
        <>
          <Button title="Tirar Foto" onPress={takePhoto} />
          <Button title="Escolher Imagem" onPress={pickImage} />
          {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginTop: 20 }} />}
        </>
      )}
    </View>
  );
};

export default Upload;
