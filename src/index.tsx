import NativeTokenizer from './NativeTokenizer';

export type { EncodedText } from './NativeTokenizer';
export interface EncodeParams {
  modelPath: string;
  text: string;
  addSpecialTokens?: boolean;
  withOverflowingTokens?: boolean;
}

export function encode({
  modelPath,
  text,
  addSpecialTokens,
  withOverflowingTokens,
}: EncodeParams) {
  if (addSpecialTokens && withOverflowingTokens) {
    return NativeTokenizer.encodeWithExtra(
      modelPath,
      text,
      addSpecialTokens,
      withOverflowingTokens
    );
  }
  return NativeTokenizer.encode(modelPath, text);
}

export interface BatchEncodeParams {
  modelPath: string;
  texts: string[];
  addSpecialTokens?: boolean;
  withOverflowingTokens?: boolean;
}

export function batchEncode({
  modelPath,
  texts,
  addSpecialTokens,
  withOverflowingTokens,
}: BatchEncodeParams) {
  if (addSpecialTokens && withOverflowingTokens) {
    return NativeTokenizer.batchEncodeWithExtra(
      modelPath,
      texts,
      addSpecialTokens,
      withOverflowingTokens
    );
  }
  return NativeTokenizer.batchEncode(modelPath, texts);
}

export interface DecodeParams {
  modelPath: string;
  ids: BigInt[];
  skipSpecialTokens?: boolean;
}

export function decode({ modelPath, ids, skipSpecialTokens }: DecodeParams) {
  if (skipSpecialTokens) {
    return NativeTokenizer.decodeWithExtra(modelPath, ids, skipSpecialTokens);
  }
  return NativeTokenizer.decode(modelPath, ids);
}

export interface BatchDecodeParams {
  modelPath: string;
  ids: BigInt[][];
  skipSpecialTokens?: boolean;
}

export function batchDecode({
  modelPath,
  ids,
  skipSpecialTokens,
}: BatchDecodeParams) {
  if (skipSpecialTokens) {
    return NativeTokenizer.batchDecodeWithExtra(
      modelPath,
      ids,
      skipSpecialTokens
    );
  }
  return NativeTokenizer.batchDecode(modelPath, ids);
}

export default {
  encode,
  batchEncode,
  decode,
  batchDecode,
};
