import React, { useState } from 'react';
import { 
  View, Text, TouchableOpacity, ScrollView, StyleSheet, 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TemplateScreen = ({ navigation }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('Modern');
  const [selectedPallet, setSelectedPallet] = useState('#1E3A5A');

  const templates = [
    { name: 'Modern', id: 'modern' },
    { name: 'Classic', id: 'classic' },
    { name: 'Compact', id: 'compact' },
  ];

  const pallets = [
    { name: 'Professional Blue/Gray', hex: '#1E3A5A', subText: '#1E3A5A' },
    { name: 'Minimal Black/White', hex: '#111527', subText: '#111527' },
    { name: 'Energetic Teal/Orange', hex: '#0F76BE', subText: '#0F76BE' },
    { name: 'Elegant Navy/Gold', hex: '#1E3A5A', subText: '#1E3A5A' }, // Example matching your image
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Universal Header */}
      <View style={styles.header}>
        <Text style={styles.menuIcon}>☰</Text>
        <Text style={styles.headerTitle}>Resume Genie</Text>
        <View style={styles.profileCircle} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.stepText}>Step 7 of 7   <Text style={styles.savedText}>saved 0s ago</Text></Text>
        
        {/* Progress Bar - 100% */}
        <View style={styles.progressBarBg}>
          <View style={[styles.progressFill, { width: '100%' }]} />
        </View>
        <Text style={styles.percentage}>100%</Text>

        <Text style={styles.sectionTitle}>Template & Pallet</Text>
        
        <Text style={styles.subLabel}>Choose a template</Text>
        <View style={styles.templateRow}>
          {templates.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={[
                styles.templateCard, 
                selectedTemplate === item.name && styles.selectedBorder
              ]}
              onPress={() => setSelectedTemplate(item.name)}
            >
              <Text style={styles.templateName}>{item.name}</Text>
              <View style={styles.previewBox}>
                <Text style={styles.previewText}>Preview</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.subLabel}>Color Pallets</Text>
        {pallets.map((pallet, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.palletCard,
              selectedPallet === pallet.hex && { backgroundColor: '#F0F5FF' }
            ]}
            onPress={() => setSelectedPallet(pallet.hex)}
          >
            <View style={[styles.colorSquare, { backgroundColor: pallet.hex }]} />
            <View>
              <Text style={styles.palletTitle}>{pallet.name}</Text>
              <Text style={styles.palletHex}>{pallet.subText}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.customColorButton}>
          <Text style={styles.customColorText}>+ Custom Color</Text>
        </TouchableOpacity>
        
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.previewButton} 
          onPress={() => navigation.navigate('Preview')}
        >
          <Text style={styles.previewButtonText}>Preview</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerTitle: { fontSize: 20, fontWeight: '600' },
  profileCircle: { width: 35, height: 35, borderRadius: 18, backgroundColor: '#E0E0E0' },
  content: { paddingHorizontal: 20 },
  progressBarBg: { height: 8, backgroundColor: '#E0E0E0', borderRadius: 4, marginTop: 10 },
  progressFill: { height: '100%', backgroundColor: '#0052CC', borderRadius: 4 },
  percentage: { fontSize: 12, color: '#0052CC', marginVertical: 5 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', color: '#000', marginBottom: 15 },
  
  subLabel: { fontSize: 16, fontWeight: '600', marginVertical: 10 },
  templateRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  templateCard: { 
    width: '31%', 
    height: 120, 
    backgroundColor: '#E8F0FE', 
    borderRadius: 8, 
    borderWidth: 1.5, 
    borderColor: '#0052CC', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  selectedBorder: { borderWidth: 3, borderColor: '#002D72' },
  templateName: { fontWeight: 'bold', marginBottom: 5 },
  previewBox: { width: '70%', height: '50%', backgroundColor: '#D1D9E6', justifyContent: 'center', alignItems: 'center' },
  previewText: { fontSize: 10, color: '#666' },

  palletCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F0F0F0', 
    padding: 12, 
    borderRadius: 10, 
    marginBottom: 10 
  },
  colorSquare: { width: 50, height: 40, borderRadius: 4, marginRight: 15 },
  palletTitle: { fontSize: 15, fontWeight: '500' },
  palletHex: { fontSize: 13, color: '#666' },

  customColorButton: { 
    borderWidth: 1.5, 
    borderColor: '#0052CC', 
    borderRadius: 8, 
    padding: 12, 
    alignItems: 'center', 
    marginTop: 10 
  },
  customColorText: { color: '#0052CC', fontWeight: 'bold' },

  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, backgroundColor: '#F8FAFF', position: 'absolute', bottom: 0, width: '100%' },
  backButton: { padding: 15, width: '45%', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: 10 },
  previewButton: { padding: 15, width: '45%', alignItems: 'center', backgroundColor: '#0052CC', borderRadius: 10 },
  previewButtonText: { color: '#FFF', fontWeight: 'bold' },
});

export default TemplateScreen;