package me.naveenmk.tokenizer;

import android.os.Bundle;
import android.content.Context;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;
import me.naveenmk.tokenizer.NativeTokenizerSpec;
import com.facebook.react.bridge.ReactApplicationContext;
import javax.annotation.Nullable;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;

import ai.djl.huggingface.tokenizers.Encoding;
import ai.djl.huggingface.tokenizers.HuggingFaceTokenizer;

public class NativeTokenizerModule extends NativeTokenizerSpec {
    public static final String NAME = "Tokenizer";
    private static final Logger log = LoggerFactory.getLogger(NativeTokenizerModule.class);

    public NativeTokenizerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    // readableArray to long[]
    private long[] toLongArray(ReadableArray array) {
        List<Long> list = new ArrayList<>();
        for (int i = 0; i < array.size(); i++) {
            list.add(array.getLong(i));
        }
        return list.stream().mapToLong(l -> l).toArray();
    }

    // a function to get the tokenizer
    private HuggingFaceTokenizer getTokenizer(String modelPath) {
        try {
            Path tokenizerModel = Paths.get(modelPath);
            return HuggingFaceTokenizer.newInstance(tokenizerModel);
        } catch (Exception e) {
            log.error("Error getting tokenizer", e);
            throw new RuntimeException(e);
        }
    }

    // formats the tokenized output
    private WritableMap formatOutput(Encoding e) {
        Bundle bundle = new Bundle();

        ArrayList<Long> ids = new ArrayList<Long>();
        for (long id : e.getIds()) {
            ids.add(id);
        }

        ArrayList<Long> attentionMask = new ArrayList<Long>();
        for (long mask : e.getAttentionMask()) {
            attentionMask.add(mask);
        }

        ArrayList<String> tokens = new ArrayList<String>(Arrays.asList(e.getTokens()));

        bundle.putSerializable("ids", ids);
        bundle.putSerializable("attentionMask", attentionMask);
        bundle.putSerializable("tokens", tokens);
        return Arguments.fromBundle(bundle);
    }

    @NonNull
    @Override
    public String getName() {
        return NAME;
    }

    @Override
    public void encode(String modelPath, String text, Promise promise) {
        try (HuggingFaceTokenizer tokenizer = getTokenizer(modelPath)) {
            promise.resolve(formatOutput(tokenizer.encode(text)));
        } catch (Exception e) {
            promise.reject("ERROR_CODE", "An error occurred", e);
        }
    }

    @Override
    public void encodeWithExtra(String modelPath, String text, boolean addSpecialTokens, boolean withOverflowingTokens,
            Promise promise) {
        try (HuggingFaceTokenizer tokenizer = getTokenizer(modelPath)) {
            promise.resolve(formatOutput(tokenizer.encode(text, addSpecialTokens, withOverflowingTokens)));
        } catch (Exception e) {
            promise.reject("ERROR_CODE", "An error occurred", e);
        }
    }

    @Override
    public void batchEncode(String modelPath, ReadableArray texts, Promise promise) {
        try (HuggingFaceTokenizer tokenizer = getTokenizer(modelPath)) {
            WritableArray output = Arguments.createArray();
            for (int i = 0; i < texts.size(); i++) {
                output.pushMap(formatOutput(tokenizer.encode(texts.getString(i))));
            }
            promise.resolve(output);
        } catch (Exception e) {
            promise.reject("ERROR_CODE", "An error occurred", e);
        }
    }

    @Override
    public void batchEncodeWithExtra(String modelPath, ReadableArray texts, boolean addSpecialTokens,
            boolean withOverflowingTokens, Promise promise) {
        try (HuggingFaceTokenizer tokenizer = getTokenizer(modelPath)) {
            WritableArray output = Arguments.createArray();
            for (int i = 0; i < texts.size(); i++) {
                output.pushMap(
                        formatOutput(tokenizer.encode(texts.getString(i), addSpecialTokens, withOverflowingTokens)));
            }
            promise.resolve(output);
        } catch (Exception e) {
            promise.reject("ERROR_CODE", "An error occurred", e);
        }
    }

    @Override
    public void decode(String modelPath, ReadableArray ids, Promise promise) {
        try (HuggingFaceTokenizer tokenizer = getTokenizer(modelPath)) {
            promise.resolve(tokenizer.decode(toLongArray(ids)));
        } catch (Exception e) {
            promise.reject("ERROR_CODE", "An error occurred", e);
        }
    }

    @Override
    public void decodeWithExtra(String modelPath, ReadableArray ids, boolean skipSpecialTokens, Promise promise) {
        try (HuggingFaceTokenizer tokenizer = getTokenizer(modelPath)) {
            promise.resolve(tokenizer.decode(toLongArray(ids), skipSpecialTokens));
        } catch (Exception e) {
            promise.reject("ERROR_CODE", "An error occurred", e);
        }
    }

    @Override
    public void batchDecode(String modelPath, ReadableArray ids, Promise promise) {
        try (HuggingFaceTokenizer tokenizer = getTokenizer(modelPath)) {
            WritableArray output = Arguments.createArray();
            for (int i = 0; i < ids.size(); i++) {
                output.pushString(tokenizer.decode(toLongArray(ids.getArray(i))));
            }
            promise.resolve(output);
        } catch (Exception e) {
            promise.reject("ERROR_CODE", "An error occurred", e);
        }
    }

    @Override
    public void batchDecodeWithExtra(String modelPath, ReadableArray ids, boolean skipSpecialTokens, Promise promise) {
        try (HuggingFaceTokenizer tokenizer = getTokenizer(modelPath)) {
            WritableArray output = Arguments.createArray();
            for (int i = 0; i < ids.size(); i++) {
                output.pushString(tokenizer.decode(toLongArray(ids.getArray(i)), skipSpecialTokens));
            }
            promise.resolve(output);
        } catch (Exception e) {
            promise.reject("ERROR_CODE", "An error occurred", e);
        }
    }
}
    