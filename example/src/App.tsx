import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Tokenizer from '@naveen521kk/react-native-tokenizer';

export default function App() {
  const [result, setResult] = React.useState<string | undefined>();
  React.useEffect(() => {
    const text = 'Hello, world!';
    const result = Tokenizer.encode(text);
    console.log(result);
    setResult(JSON.stringify(result));
  }, []);
  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
