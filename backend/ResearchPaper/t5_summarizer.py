import os
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

def load_model(model_name):
    model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    token = os.getenv("HF_TOKEN")
    return model, tokenizer

def summarize_paper(model, tokenizer, text):
    inputs = tokenizer(
        "summarize: " + text,
        return_tensors="pt", 
        truncation=True, 
        max_length=1024, 
        padding="max_length")
    
    outputs = model.generate(
        inputs.input_ids, 
        max_new_tokens=512, 
        do_sample=True, 
        top_p=0.9)
    
    return tokenizer.decode(outputs[0], skip_special_tokens=True)