import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

interface EncodedText {
    ids: BigInt[];
    attentionMask: BigInt[];
    tokens: string[];
}

export interface Spec extends TurboModule {
    encode(modelPath:string, text: string, ): EncodedText;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeTokenizer');
