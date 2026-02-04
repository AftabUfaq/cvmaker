import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
   
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PDFPreviewScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Main Preview Area */}
      <View style={styles.previewContainer}>
        <Text style={styles.previewTitle}>PDF Preview</Text>
        <TouchableOpacity>
          <Text style={styles.linkText}>Link</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Actions */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.regenerateButton}
          onPress={() => navigation.navigate('Template')} // Go back to design
        >
          <Text style={styles.regenerateText}>Regenerate</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F0F5FF' // Light blue tint matching your splash/preview background
  },
  previewContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  previewTitle: { 
    fontSize: 24, 
    color: '#000', 
    marginBottom: 10 
  },
  linkText: { 
    fontSize: 20, 
    color: '#000', 
    textDecorationLine: 'underline' 
  },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 20, 
    paddingBottom: 40,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // Shadow for elevation
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  secondaryButton: { 
    backgroundColor: '#F0F0F0', 
    paddingVertical: 12, 
    paddingHorizontal: 15, 
    borderRadius: 8,
    width: '30%',
    alignItems: 'center'
  },
  buttonText: { 
    color: '#333', 
    fontWeight: '500' 
  },
  regenerateButton: { 
    backgroundColor: '#FFADAD', // Light red/salmon color from your image
    paddingVertical: 12, 
    paddingHorizontal: 15, 
    borderRadius: 8,
    width: '30%',
    alignItems: 'center'
  },
  regenerateText: { 
    color: '#D32F2F', // Darker red text for contrast
    fontWeight: 'bold' 
  },
});

export default PDFPreviewScreen;