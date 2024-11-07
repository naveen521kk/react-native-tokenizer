import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

interface EncodedText {
  ids: BigInt[];
  attentionMask: BigInt[];
  tokens: string[];
}

export interface Spec extends TurboModule {
  encode(
    modelPath: string,
    text: string,
    addSpecialTokens?: boolean,
    withOverflowingTokens?: boolean
  ): EncodedText;
  batchEncode(
    modelPath: string,
    texts: string[],
    addSpecialTokens?: boolean,
    withOverflowingTokens?: boolean
  ): EncodedText[];
  decode(modelPath: string, ids: BigInt[], skipSpecialTokens?: boolean): string;
  batchDecode(
    modelPath: string,
    ids: BigInt[][],
    skipSpecialTokens?: boolean
  ): string[];
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeTokenizer');
