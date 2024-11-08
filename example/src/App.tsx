import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Tokenizer from '@naveen521kk/react-native-tokenizer';

import RNFS from 'react-native-fs';

const downloadUrls = [
  'https://github.com/chroma-core/onnx-embedding/raw/refs/heads/main/onnx/tokenizer.json',
  'https://github.com/chroma-core/onnx-embedding/raw/refs/heads/main/onnx/config.json',
  'https://github.com/chroma-core/onnx-embedding/raw/refs/heads/main/onnx/special_tokens_map.json',
  'https://github.com/chroma-core/onnx-embedding/raw/refs/heads/main/onnx/tokenizer_config.json',
  'https://github.com/chroma-core/onnx-embedding/raw/refs/heads/main/onnx/vocab.txt',
];

export default function App() {
  const [result, setResult] = React.useState<string | undefined>();
  React.useEffect(() => {
    const a = async () => {
      const tokenizerFilePath = RNFS.CachesDirectoryPath + '/tokenizer';

      // create tokenizer directory
      const exists = await RNFS.exists(tokenizerFilePath);
      if (!exists) {
        await RNFS.mkdir(tokenizerFilePath);
      }

      // Download files
      const downloadPromises = [];

      for (const url of downloadUrls) {
        const toFile = tokenizerFilePath + '/' + url.split('/').pop();

        // Check if file exists
        const fileExists = await RNFS.exists(toFile);
        if (fileExists) {
          console.log('File already exists, skipping download: ' + toFile);
          continue;
        }
        console.log(`Downloading ${url} to ${toFile}`);
        downloadPromises.push(
          RNFS.downloadFile({
            fromUrl: url,
            toFile: toFile,
          }).promise
        );
      }

      await Promise.all(downloadPromises);

      console.log('Completed downloading files');
      // Load tokenizer
      console.log('Loading tokenizer');
      try {
        const encoded = await Tokenizer.encode({
          modelPath: tokenizerFilePath,
          text: 'Hello World',
        });

        console.log('result', encoded);
        setResult(JSON.stringify(encoded));
      } catch (e) {
        console.error(e);
      }
    };
    a();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hello World: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
