# @naveen521kk/react-native-tokenizer

Port of Huggingface's Tokenizer written in Rust for React Native. Only supports Android for now.

## Installation

```sh
npm install @naveen521kk/react-native-tokenizer
```

## Usage

See [example](https://github.com/naveen521kk/react-native-tokenizer/tree/main/example) for a full example.

```js
import { encode } from '@naveen521kk/react-native-tokenizer';

// ...
// modelPath is the path to the model directory
const result = encode(modelPath, "Hello World!");
```


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
