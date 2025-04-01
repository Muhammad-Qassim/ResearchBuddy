# INTRODUCTION

In this phase, I focused on summarizing research papers using the fine-tuned model. Initially, I used a hugging face dataset with around 200k entries, but the model performed poorly with repetitive sentences and a low ROUGE evaluation of 18%. To improve results I created a custom dataset of 560 papers with a preferred summary format that includes objective, methodology, key finding, and a conclusion. I finetuned FLAN-T5-base using LoRA. This approach not only reduced the training time from 10 hours to 10 minutes but also improved the ROUGE score to 50%, producing much better summaries.

Additionally, I practiced approaches to retrieve top-rated papers using the semantic scholar API, download PDFs, extract text from PDFs using pdfminer.six, and feed the extracted text into a fine-tuned model for summarization.


# Important Links

1. https://huggingface.co/docs/peft/en/package_reference/lora
2. https://huggingface.co/docs/transformers/en/main_classes/trainer
3. https://huggingface.co/docs/transformers/en/main_classes/quantization
4. https://huggingface.co/google-t5/t5-small
5. https://huggingface.co/google/flan-t5-base
6. https://huggingface.co/google/flan-t5-large
7. https://huggingface.co/datasets/ccdv/arxiv-summarization
8. https://www.semanticscholar.org/product/api
9. https://info.arxiv.org/help/api/basics.html

# Dataset Creation

Initially, I used the Hugging Face dataset called arxiv-summarization, containing 216,000 research papers with summaries. (https://huggingface.co/datasets/ccdv/arxiv-summarization)

This dataset provided a large-scale foundation for training but resulted in repetitive summaries and a low ROUGE evaluation score of 18%.

**The Dataset fields:**

 id: paper id
 article: a string containing the body of the paper
 abstract: a string containing the abstract of the paper

To improve performance, I created a custom dataset of 560 research papers. The process involved:

1. Fetching paper metadata using arXiv API.
2. Downloading and extracting text from PDFs using pdfminer.
3. Generating structured summaries using a manual annotation process to ensure high-quality summaries.
4. Storing the dataset in JSON format with research paper text, summaries, and timestamps.

**The custom dataset fields:**

 article: a string containing the body of the paper
 summary: a string containing the structured summary of the paper
 processed_at: time at which it was processed
 domain: domain of the paper such as AI, Atomic_Physics, etc


**Key Features:**

1. Improved ROUGE Score: Fine-tuning with the custom dataset significantly boosted performance.
2. Higher Quality Summaries: The custom dataset follows a structured format that improves model learning.

# Gemini AND OpenAI APIs

Initially, I considered using either the Gemini or open API for summarization and using prompt engineering techniques like one-shot, few-shot, or chain of thought. However, several limitations led to their exclusion i.e.

1. API dependency and rate limits could slow down processing, especially when handling summarization for multiple papers.
2. Customization was limited. A fine-tuned model allows better optimization for research paper summarization that fits my needed criteria, providing domain-specific summaries while running locally.

For these reasons, I opted to fine-tune my model, ensuring cost efficiency, scalability, and control over the summarization process.

# Model Fine-Tuning

To summarize articles, I have finetuned two different models i.e. T5-small and FLAN-T5-base with Lora.

## 1. Fine-tuning T5-small

Initially, I finetuned T5-small using standard finetune. The key steps included are:

1. Formatting the dataset with input text ( article ) and target output ( summary )
2. Training the m, model by updating all parameters, leading to higher computational costs
3. Evaluating performance using ROUGE metrics which showed mediocre results due to repetition and lack of coherence.
4. The finetuning process took approximately 10 hours on my local machine, and the resulting summaries often were redundant and lacked structured clarity.

### Training Arguments for T5-small

```
training_args = Seq2SeqTrainingArguments(
    output_dir="t5-small-finetuned-arxiv",
    evaluation_strategy="steps",
    eval_steps=1000,  
    save_steps=1000, 
    learning_rate=5e-5,
    per_device_train_batch_size=4,
    per_device_eval_batch_size=4,
    gradient_accumulation_steps=4,
    weight_decay=0.01,
    save_total_limit=2,
    num_train_epochs=1,
    predict_with_generate=True,
    fp16=True,
    load_best_model_at_end=True,
    logging_dir="./logs",
    report_to="none",
    push_to_hub=False
)
```
**Explaination of Training Arguments**

1. output_dir: Directory to save the fine-tuned model.
2. evaluation_strategy: Evaluate model performance every 1000 steps.
3. learning_rate: Set to 5e-5 for stable training.
4. per_device_train_batch_size: Batch size of 4 to fit within my local GPU's memory (NVIDIA RTX 4050 6GB VRAM).
5. fp16: Enable mixed-precision training to reduce memory usage.
6. predict_with_generate: Generate predictions during evaluation for ROUGE score calculation.


## 2. Fine-tuning FLAN-T5-base with LoRA

To overcome the limitations of T5-small, I fine-tuned FLAN-T5-base using LoRA (Low-Rank Adaptation). The process included:

1. Applying LoRA, which allowed training only a small subset of parameters, drastically reducing computational requirements
2. The fine-tuning time was reduced from 10 hours to just 10 minutes, making the process significantly more efficient.
3. The model produced structured summaries with clear sections, detailing research objectives, methodologies, findings, and conclusions.
4. Evaluation with ROUGE metrics showed nearly 2.8 times better than the t5-small model.


### LoRA Configuration for FLAN-T5-base

```
lora_config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q", "v"],
    lora_dropout=0.05,
    bias="none",
    task_type=TaskType.SEQ_2_SEQ_LM
)
```
**Explanation of LoRA Configuration:**

1. r=16: Rank of the low-rank matrices. A higher rank captures more complex patterns but increases parameters.
2. lora_alpha=32: Scaling factor for LoRA weights.
3. target_modules=["q", "v"]: Apply LoRA to query and value attention layers for efficient adaptation.
4. lora_dropout=0.05: Dropout rate to prevent overfitting.
5. task_type=TaskType.SEQ_2_SEQ_LM: Specifies the task as sequence-to-sequence language modeling.

### Training Arguments for FLAN-T5-base

```
training_args = Seq2SeqTrainingArguments(
    output_dir=output_dir,
		auto_find_batch_size=True,
    learning_rate=1e-3, # higher learning rate
    num_train_epochs=5,
    logging_dir=f"{output_dir}/logs",
    logging_strategy="steps",
    logging_steps=500,
    save_strategy="no",
    report_to="tensorboard",
)
```
**Explanation of Training Arguments:**

1. output_dir: Directory to save the fine-tuned model.
2. auto_find_batch_size: Automatically determine the maximum batch size that fits in GPU memory.
3. learning_rate: Set to 1e-3 for faster convergence.
4. num_train_epochs: Train for 5 epochs for sufficient learning.
5. logging_steps: Log metrics every 500 steps.


### Quantization for FLAN-T5-base

Since I trained FLAN-T5-base on my local machine with limited resources, I used 8-bit quantization to reduce memory usage:

```
model = AutoModelForSeq2SeqLM.from_pretrained(model_id, load_in_8bit=True, device_map="auto")
```

**Why Quantization?**

1. Memory Efficiency: Reduces memory footprint, allowing training on GPUs with limited VRAM.
2. Performance: Maintains model performance while reducing computational overhead.
3. Minimal impact on model quality

## 3. Fine-tuning FLAN-T5-base with LoRA

For larger-scale summarization tasks, I fine-tuned FLAN-T5-large using LoRA in Google Colab. Unlike FLAN-T5-base, I did not use quantization because Colab provided sufficient resources.

### LoRA Configuration for FLAN-T5-large

```
lora_config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q", "v"],
    lora_dropout=0.05,
    bias="none",
    task_type=TaskType.SEQ_2_SEQ_LM
)
```
**Explanation of LoRA Configuration:**

1. r=16: Same rank as FLAN-T5-base for consistency.
2. lora_alpha=32: Same scaling factor for balanced adaptation.
3. target_modules=["q", "v"]: Apply LoRA to query and value attention layers.


### Training Arguments for FLAN-T5-large

```
training_args = Seq2SeqTrainingArguments(
    output_dir=output_dir,
		auto_find_batch_size=True,
    learning_rate=1e-3,
    num_train_epochs=5,
    logging_dir=f"{output_dir}/logs",
    logging_strategy="steps",
    logging_steps=500,
    save_strategy="no",
    report_to="none",
)
```

**Explanation of Training Arguments:**

1. output_dir: Directory to save the fine-tuned model.
2. auto_find_batch_size: Automatically determine the maximum batch size that fits in GPU memory
3. learning_rate: Set to 1e-3 for faster convergence, similar to FLAN-T5-base.
4. num_train_epochs: Train for 5 epochs for sufficient learning.
5. logging_steps: Log metrics every 500 steps for monitoring progress.
6. save_strategy="no": Disable model checkpointing to save disk space since Colab storage is limited.
7. report_to="none": Disable external reporting to focus on local evaluation.

### Why No Quantization for FLAN-T5-large?

1. Google Colab Resources: Colab provided an t4 GPU with 16GB VRAM, which was sufficient to train FLAN-T5-large without quantization.
2. Performance: Avoiding quantization ensured that the model retained its full precision, leading to better summarization quality.
3. Scalability: Training without quantization allowed the model to leverage the full capabilities of the t4 GPU.


## 4. Comparison B/W Fine-tuned Models

| Feature |  T5-small | FLAN-T5-base with LoRA |FLAN-T5-large with LoRA |
|:-----|:--------|:------|:------|
| Fine-Tuning Approach   | Full-parameter tuning | LoRA (Efficient tuning) | LoRA (Efficient tuning) |
| Training Time   |  ~10 hours  |   ~10 minutes | ~1 hour |
| Output Quality   | Repetitive, lacks structure | Well-structured, concise | Highly structured, detailed  |
| ROUGE Score   | 18% |    50% |  54% |
| Hardware used   | NVIDIA 4050 6GB VRAM |    NVIDIA 4050 6GB VRAM | Colab T4 6GB VRAM |
| Quantization   | None |    8-bit |  None |

## 5. Why LoRA Outperformed Standard Fine-Tuning

LoRA (Low-Rank Adaptation) significantly improved the efficiency and output quality by:

1. LoRA trains only a small subset of parameters, making fine-tuning faster and less resource-intensive.
2. By freezing the base model and adapting only specific layers, LoRA reduces memory usage, enabling training on smaller GPUs like the RTX 4050 6GB.
3. Maintaining the original pre-trained weights while adapting specific layers to the summarization task.
4. Preventing overfitting and redundancy by focusing on task-specific learning rather than updating the entire model.
5. LoRA allows fine-tuning of larger models like FLAN-T5-large on high-resource environments like Google Colab without quantization


## 6. Comparision B/W Abstract, T5-small, and FLAN-T5-base

## **Article:** 

A Mathematical Explanation of UNet (https://arxiv.org/abs/2410.04434)

## **Abstract:**  

The UNet architecture has transformed image segmentation. UNet's versatility and accuracy have driven its widespread adoption, significantly advancing fields reliant on machine learning problems with images. In this work, we give a clear and concise mathematical explanation of UNet. We explain what is the meaning and function of each of the components of UNet. We will show that UNet is solving a control problem. We decompose the control variables using multigrid methods. Then, operator-splitting techniques are used to solve the problem, whose architecture exactly recovers the UNet architecture. Our result shows that UNet is a one-step operator-splitting algorithm for the control problem.

## **T5-small summary:**

we give a clear and concise mathematical ex-planation of UNet Xue-Cheng Tai, Hao Liu, Raymond H. Chan, Lingfeng Li Abstract The UNet architecture has transformed image segmentation. our results show that UNet is solving a control problem. we decompose the control variables using multigrid methods.

## **FLAN-T5-base summary:** 

**1. Main Research Objective:** To provide an explanation of the UNet architecture, the meaning and function of each component of UNet. 

**2. Methodology:** - Decompose the control variables into multiple grids. - Operational splits the control variables by applying operator-splitting techniques. - ODE techniques are used to solve the control problem. 

**3. Key Findings:** - UNet is a one-step operator-splitting algorithm for control problems. - It resembles UNet in both dimensions and width. 

**4. Conclusions:** - UNet is a unique operation for control problems. - The design is correct for UNet, and it is a unique operator-splitting algorithm for image segmentation.

## **FLAN-T5-large summary:** 

**Main Research Objective:** To describe the mathematical explanation of UNet, a widely used image segmentation network with a unique architecture.
 
**Methodology:** 

* Derived mathematical formulas for each UNet component.

* Presented a mathematical model for the network's components. 

* Used operator-splitting techniques to solve a control problem. 

**Key Findings:** 

* UNet is solving a control problem using the shortest linear approximation (LOR). 

* Operator-splitting techniques achieve exact LOR reproduction based on the LOR and the control variables. 

**Conclusions:** 

* UNet is a one-step operator-splitting algorithm for the control problem. 

* The LOR method in UNet accurately reproduces the UNet architecture and improves the accuracy and performance of image segmentation tasks.


## Retrieving TOP-RATED Papers

To retrieve the top cited papers and summarize them I researched:

1. **Semantic Scholar:** I used it to retrieve top-rated papers based on citation count and relevance by querying papers from highly cited authors and filtering results based on impact metrics.
2. **arXiv:** I used it to fetch research papers by querying specific domains (e.g., AI, computational linguistics) and retrieving the latest and most referenced works.
3. **PDF Processing:** I used pdfminer.six to extract text efficiently, ensuring high-quality data input for fine-tuning.



