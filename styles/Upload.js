import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      paddingVertical: 90,
    },
    container: {
      paddingHorizontal: 20,
    },
    cover: {
      width: '100%',
      height: 200,
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      overflow: 'hidden',
    },
    coverContent: {
      alignItems: 'center',
    },
    coverText: {
      marginTop: 10,
      fontSize: 16,
      color: '#666',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    form: {
      width: '100%',
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
      fontWeight: 600,
      color: '#333',
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 12,
    },
    pickerContainer: {
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 12,
      overflow: 'hidden',
    },
    picker: {
      height: 70,
    },
    switchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    locationButton: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
      backgroundColor: '#f0f0f0',
    },
    locationButtonText: {
      color: '#333',
    },
    submitButton: {
      backgroundColor: '#6200ee',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 20,
    },
    submitButtonText: {
      color: '#fff',
      fontSize: 16,
    },
  });

  export default styles;