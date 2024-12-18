import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface EncodedText {
  ids: BigInt[];
  attentionMask: BigInt[];
  tokens: string[];
}

export interface Spec extends TurboModule {
  encode(modelPath: string, text: string): Promise<EncodedText>;
  encodeWithExtra(
    modelPath: string,
    text: string,
    addSpecialTokens: boolean,
    withOverflowingTokens: boolean
  ): Promise<EncodedText>;
  batchEncode(modelPath: string, texts: string[]): Promise<EncodedText[]>;
  batchEncodeWithExtra(
    modelPath: string,
    texts: string[],
    addSpecialTokens: boolean,
    withOverflowingTokens: boolean
  ): Promise<EncodedText[]>;
  decode(modelPath: string, ids: BigInt[]): Promise<string>;
  decodeWithExtra(
    modelPath: string,
    ids: BigInt[],
    skipSpecialTokens: boolean
  ): Promise<string>;
  batchDecode(modelPath: string, ids: BigInt[][]): Promise<string[]>;
  batchDecodeWithExtra(
    modelPath: string,
    ids: BigInt[][],
    skipSpecialTokens: boolean
  ): Promise<string[]>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Tokenizer');
