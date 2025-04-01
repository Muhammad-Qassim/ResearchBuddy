# Introduction

Following the success of Phase 1, Phase 2 of ResearchBuddy focused on overcoming the limitation inherent in Phase 1 by scaling up both the model capacity and the dataset. Previously, I chose models like t5-small, t5 base, and t5 large that were restricted by token limits of 512 for output and 1024 for inputs, which limited their ability to capture the full context necessary for comprehensive summaries. 

To address this, I expanded the dataset to 1000 research papers, each with a larger summary size of about 1200 tokens and input length exceeding 15000 tokens. This aimed to leverage a broader context window, thereby enhancing the model's capacity to produce more informative summaries.

# Hardware and Resource Requirements

To serve the larger context window and larger output with a larger dataset, I rented an NVIDIA RTX 8000 with 45 GB VRAM. This significant upgrade from my RTX 4050 which is 6GB VRAM was necessary to process:

1. Input sequences of 9500 tokens (approximately 7000-8000 words)
2. Output summaries of 1200 tokens (approximately 900 words)
3. The parameter-heavy FLAN-T5-large model (780M parameters)

While this deviated from my initial goal of creating a free, locally runnable solution, it was a necessary step to test the hypothesis that larger context windows would produce better summaries.

```
# Key configuration parameters used
MAX_INPUT_LENGTH = 9500  
MAX_TARGET_LENGTH = 1200  
BATCH_SIZE = 1
GRADIENT_ACCUMULATION_STEPS = 8
EPOCHS = 1.5
```
The above configuration pushed the limits of even the 45GB VRAM card, requiring careful memory optimization to prevent out-of-memory errors during training.


# Expanded Dataset and context Window

In phase 1, I worked with a context window of only 1024 tokens for input and 512 tokens for output. That was proven insufficient for comprehensive research paper summarization since:

1. Most research papers exceed 5,000- 10,000 words (6,500-15,500 tokens)
2. With the previous limitations, my models could only see approximately 10-15% of each paper
3. Critical sections like methodology details, results, and discussions were often truncated

To address these limitations, I expanded the dataset from 560 to 988 papers and significantly increased the token limits:

1. Input context expanded from 1,024 to 9,500 tokens (9.3x increase)
2. Output summary expanded from 512 to 1,200 tokens (2.3x increase)

This expansion ensured the model could process nearly entire papers while keeping structural integrity and allowing cross-references.

# Why token length matters critically in scientific paper summarization

The larger token context window addresses several critical limitations that were hindering the previously fine-tuned models:

1. **Structural Understanding**: 
    - Scientific papers follow specific structures (introduction, methods, results, discussion)
    - Shorter context windows force models to work with fragmented structures
    - The expanded 9,500 token window enables processing nearly complete papers, maintaining structural integrity

2. **Cross-referential Content**:
    - Scientific writing frequently references earlier sections
    - Claims in the discussion often refer back to specific results
    - Limited context prevents models from connecting these related elements

3. **Technical Depth vs. conciseness**:
    - With insufficient context, models tend to produce generic summaries lacking technical depth
    - Expanded context allows models to identify and preserve key technical contributions

# Memory Optimization Techniques

Working with such large context windows on FLAN-T5-large required several memory optimization techniques:

1. **8-bit Quantization**: Reduced model memory footprint by approximately 4x.

```
 model = AutoModelForSeq2SeqLM.from_pretrained(
 model_id,
 load_in_8bit=True,  # Use 8-bit quantization to reduce memory usage
 device_map="auto"
 )
```
2. **LoRA (Low-Rank Adaptation)**: Used rank=16 adaptation for query and value matrices only.

```
 lora_config = LoraConfig(
 r=16,  # Rank
 lora_alpha=32,
 target_modules=["q", "v"], 
 lora_dropout=0.05,
 bias="none",
 task_type=TaskType.SEQ_2_SEQ_LM
 )
```

3. **Gradient Checkpointing**: Traded computation for memory by not storing all activations

```
 training_args = Seq2SeqTrainingArguments(
 # other arguments
 gradient_checkpointing=True,
 )
```

4. **Micro-batch Training**: Used batch size of 1 with gradient accumulation steps of 8

```
 training_args = Seq2SeqTrainingArguments(
 # other arguments
 per_device_train_batch_size=1,
 gradient_accumulation_steps=8,
 )
```
5. **PyTorch Memory Configurations**: Set environment variables to optimize memory usage

```
 os.environ["PYTORCH_CUDA_ALLOC_CONF"] = "expandable_segments:True"
 os.environ["TRANSFORMERS_ENABLE_GRAD_CHECKPOINT"] = "true"
```

These techniques allowed training with 9,500 token inputs, which would otherwise require over 100 GB of VRAM using the standard finetuning approach.

# The token performance paradox

Despite achieving a ROUGE score of 55.18% (compared to 50% with FLAN T5-base), the quality of summaries did not improve proportionally to the 9.3x increase in the context window. This Unexpected outcome revealed what I have termed the " token performance paradox" :

1. **Attention Dilution**: When the context became larger, the model seemed to spread its attention across too much information, causing important points to be overlooked.
2. **Structural Comprehension**: When processing more content, the model sometimes had trouble keeping the summary clear and easy to follow.
3. **Information Overload**:  Instead of giving better summaries, the model sometimes gave long answers that didn't focus on the main points.
4. **Diminishing Returns**: As the amount of information increases, the quality of the summary doesn't improve much after a certain point.

This suggests that the transformer-based models that I have chosen are facing fundamental limitations in effectively utilizing very long contexts possibly due to the:

- Quadratic attention complexity makes it difficult to model relationships across thousands of tokens.  
 [Detailed explanation](https://arxiv.org/abs/2209.04881)  

- Pre-training predominantly on shorter contexts creates a mismatch when fine-tuning on long documents.  
 [Detailed explanation](https://arxiv.org/abs/2109.09115)  

- Difficulty in determining relative importance across very long sequences.  
 [Detailed explanation](https://arxiv.org/abs/2310.12442)  


# Formatting and Quality Issues

The newly fine-tuned model had formatting inconsistencies:

1. Sometimes the structured format (objective, methodology, findings, conclusion) was not maintained
2. Bullet points and section headers were sometimes messy or not well-structured.
3. Lists sometimes had different numbering styles or uneven spacing.
4. Some section titles were missing or repeated.

To fix these issues, I could develop a post-processing pipeline using regular expressions and rule-base formatting to fix all the issues but I am not satisfied with the summary in general.

# Evaluation Result

The evaluation on a subset of 30 test samples gave the following ROUGE scores:

```
ROUGE-1: 55.18%
ROUGE-2: 22.03%
ROUGE-L: 23.69%
ROUGE-Lsum: 23.65%
```
While these metrics look good and show improvement over previous models that I fine-tuned, they don't fully capture the qualitative issues found in the generated summaries. This highlights the limitation of ROUGE as an evaluation metric for complex summarization tasks.

# Future Directions

Based on the problems found in past models, I am now planning to test new models made for summarizing long documents. These models have improved designs that can handle long texts better without needing to split them into smaller parts first.

## New Model I am considering 

1. Mistral 7B
2. LongT5
3. Mixtral 8x7B

## Resource Optimization

While the goal of making the summarization process entirely cost-free remains unfulfilled, I am committed to minimizing costs to make this technology accessible. Renting high-performance GPUs when necessary, coupled with efficient training techniques, will be key to achieving this balance.


# Conclusion

All in all, while larger models and longer context windows have improved ROUGE scores, there's still a need for better approaches to summarize scientific papers.

In the next phase, I will focus on:

1. Testing models such as Mistral 7B, LongT5, and potentially Mixtral 8x7B.
2. Refining summary quality
3. Research different sets of evaluation metrics to better assess research paper summaries

These efforts will help deliver summaries that are not only more accurate but also clearer and more insightful.