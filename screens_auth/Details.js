import {  Bookmark, CaretLeft, MapPin } from 'phosphor-react-native';
import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from '../styles/Details';


function Details() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.headerImage} source={require("../assets/Image 1.png")} />

        <View style={styles.headerInfoButtons}>
          <CaretLeft size={32} />

          <Text style={styles.headerInfoButtonsText}>Detalhes</Text>

          <View style={styles.headerInfoButtonsRight}>
            <Bookmark size={32} />
          </View>
        </View>

      </View>

      <Text style={styles.infoNameText}>Zango 3</Text>

      <View style={styles.contentAddress}>
        <MapPin size={36} color='#00FF38'/>
        <Text style={styles.contentAddressText}>Luanda, Zango 3, Rua da Dira</Text>
      </View>

      <View style={styles.separator} />

    </View>
  );
}

export default Details;