package me.naveenmk.tokenizer;

import android.os.Bundle;
import android.content.Context;
import me.naveenmk.tokenizer.NativeTokenizerSpec;
import com.facebook.react.bridge.ReactApplicationContext;

import java.util.ArrayList;
import java.util.Arrays;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

import ai.djl.huggingface.tokenizers.Encoding;
import ai.djl.huggingface.tokenizers.HuggingFaceTokenizer;


public class NativeTokenizerModule extends NativeTokenizerSpec {

    public static final String NAME = "NativeTokenizer";

    public NativeTokenizerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return NAME;
    }

    @Override
    public WritableMap encode(String text) {

        // init tokenizer
        HuggingFaceTokenizer tokenizer = HuggingFaceTokenizer.newInstance("sentence-transformers/msmarco-distilbert-dot-v5");

        // encode text
        Encoding e = tokenizer.encode(text);

        Bundle bundle = new Bundle();

        // create an array of longs for ids
        ArrayList<Long> ids = new ArrayList<Long>();
        for (long id : e.getIds()) {
            ids.add(id);
        }

        // create an array of longs for attentionMask
        ArrayList<Long> attentionMask = new ArrayList<Long>();
        for (long mask : e.getAttentionMask()) {
            attentionMask.add(mask);
        }

        // create an array of strings
        ArrayList<String> tokens = new ArrayList<String>(Arrays.asList(e.getTokens()));

        bundle.putSerializable("ids", ids);
        bundle.putSerializable("attentionMask", attentionMask);
        bundle.putSerializable("tokens", tokens);


        // put array of integers
//        map.putArray("ids", arr);
//        map.putArray("attentionMask", arr);

        // put array of strings
//        map.putArray("tokens", arr2);

        return Arguments.fromBundle(bundle);
    }
}