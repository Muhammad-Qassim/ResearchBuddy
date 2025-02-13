# INTRODUCTION

In this phase, I focused on summarizing research papers using the fine-tuned model. Initially, I used a hugging face dataset with around 200k entries, but the model performed poorly with repetitive sentences and a low ROUGE evaluation of 18%. To improve results I created a custom dataset of 560 papers with a preferred summary format that includes objective, methodology, key finding, and a conclusion. I finetuned FLAN-T5-base using LoRA. This approach not only reduced the training time from 10 hours to 10 minutes but also improved the ROUGE score to 50%, producing much better summaries.

Additionally, I practiced approaches to retrieve top-rated papers using the semantic scholar API, download PDFs, extract text from PDFs using pdfminer.six, and feed the extracted text into a fine-tuned model for summarization.

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

## 2. Fine-tuning FLAN-T5-base with LoRA

To overcome the limitations of T5-small, I fine-tuned FLAN-T5-base using LoRA (Low-Rank Adaptation). The process included:

1. Applying LoRA, which allowed training only a small subset of parameters, drastically reducing computational requirements
2. The fine-tuning time was reduced from 10 hours to just 10 minutes, making the process significantly more efficient.
3. The model produced structured summaries with clear sections, detailing research objectives, methodologies, findings, and conclusions.
4. Evaluation with ROUGE metrics showed nearly 2.8 times better than the t5-small model.


## 3. Comparison B/W Fine-tuned Models

| Feature |  T5-small | FLAN-T5-base with LoRA |
|:-----|:--------:|------:|
| Fine-Tuning Approach   | Full-parameter tuning | LoRA (Efficient tuning) |
| Training Time   |  ~10 hours  |   ~10 minutes |
| Output Quality   | Repetitive, lacks structure | Well-structured, concise |
| ROUGE Score   | 18% |    50% |

## 4. Why LoRA Outperformed Standard Fine-Tuning

LoRA (Low-Rank Adaptation) significantly improved the efficiency and output quality by:

1. Reducing the number of trainable parameters, making fine-tuning faster and less resource-intensive.
2. Maintaining the original pre-trained weights while adapting specific layers to the summarization task.
3. Preventing overfitting and redundancy by focusing on task-specific learning rather than updating the entire model.

Compared to T5-small, FLAN-T5 with LoRA proved to be the superior approach, offering faster training, lower computational costs, and significantly better summarization performance.

## Comparision B/W Abstract, T5-small, and FLAN-T5-base

**Article:** A Mathematical Explanation of UNet (https://arxiv.org/abs/2410.04434)

**Abstract:**  

In this technical report, we demonstrate our solution forthe 2019 COCO panoptic segmentation task. Our methodfirst performs instance segmentation and semantic segmen-tation separately, then combines the two to generate panop-tic segmentation results. To enhance the performance, weadd several expert models of Mask R-CNN in instance seg-mentation to tackle the data imbalance problem in the train-ing data; also HTC model is adopted yielding our best in-stance segmentation results. In semantic segmentation, wetrained several models with various backbones and use anensemble strategy which further boosts the segmentation re-sults. In the end, we analyze various combinations of in-stance and semantic segmentation, and report on their per-formance for the final panoptic segmentation results. Ourbest model achieves P Q 47.1 on 2019 COCO panoptic test-dev data.

**T5-small summary:**

in this technical report, we demonstrate our solution for 2019 COCO panoptic segmentation task. we use instance segmentation and semantic segmen- tation as a method which performs the s c in- stance and semantic segmen- tation separately, then combines the two to generate panop-tic segmentation results. our technique performs the instance segmentation and semantic segmen- tation separately, then combines the two to generate panop-tic segmentation results. to facilitate the results in this results, we use the same way as we have achieved an impressive re- sult, we compare the results of


**FLAN-T5-base summary:** 

**Main Research Objective:** To develop a joint COCO/Mapillary Workshop strategy for the 2019 COCO panoptic segmentation challenge. 

**Methodology:** * Created a dynamic model, Mask R-CNN, to extract the pixel-level category labels of a given image. * Recommendations to a network architecture for mask segmentation and semantic segmentation. * Contested several combinations of in-stance and semantic segmentation to achieve a strong performance. 

**Key Findings:** * Mask R-CNN was the best model for in-stance segmentation. * Mask R-CNN extended fast R-CNN (Fast R-CNN) to achieve the highest possible performance. * HTC model provided the best in-stance segmentation results for both the mask segmentation task and the semantic segmentation task. * The combined model was optimized for the best results on the Coco-Mapillary Workshop dataset. * The model achieved an optimal performance in the Coco-Mapillary Workshop task, achieving an overall performance of 47.1 based on Coco-Mapillary Workshop data. 

**Conclusions:** * The proposed approach improved the accuracy of the task by using an ensemble strategy. * It combined features of mask segmentation with semantic segmentation to create superior performance on the Coco-Mapillary Workshop dataset. * The ensemble strategy significantly enhanced the segmentation performance. * The model obtained the best in-stance segmentation result for the Coco-Mapillary Workshop dataset.







## Retrieving TOP-RATED Papers

To retrieve the top cited papers and summarize them I researched:

1. **Semantic Scholar:** I used it to retrieve top-rated papers based on citation count and relevance by querying papers from highly cited authors and filtering results based on impact metrics.
2. **arXiv:** I used it to fetch research papers by querying specific domains (e.g., AI, computational linguistics) and retrieving the latest and most referenced works.
3. **PDF Processing:** I used pdfminer.six to extract text efficiently, ensuring high-quality data input for fine-tuning.



