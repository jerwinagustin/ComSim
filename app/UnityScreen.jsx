import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';
import * as Asset from 'expo-asset';
import { View, StyleSheet } from 'react-native';

const UnityScreen = () => {
  const [html, setHtml] = useState(null);

  useEffect(() => {
    const loadHtml = async () => {
      const indexAsset = Asset.fromModule(require('../assets/Unity/index.html'));
      await indexAsset.downloadAsync();

      const htmlContent = await FileSystem.readAsStringAsync(indexAsset.localUri, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      setHtml(htmlContent);
    };

    loadHtml();
  }, []);

  if (!html) return null;

  return (
    <View style={{ flex: 1, backgroundColor: 'blue' }}>
      <WebView
        style={{ flex: 1, backgroundColor: 'lime' }}
        originWhitelist={['*']}
        source={{ html: '<h1 style="color: white">✅ WebView is working</h1>' }}
      />
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
  },
});

export default UnityScreen;
