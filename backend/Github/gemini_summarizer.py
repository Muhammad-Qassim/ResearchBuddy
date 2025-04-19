import os
import requests
import google.generativeai as genai

genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

def summarize_repo(model, readme_text):
    """
    Summarizes the README text of a GitHub repository using gemini API with prompt engineering.
    """

    prompt = f"""
    You are a summarization assistant. Given the README of a GitHub repository, produce a structured, concise summary in **Markdown format** using the following sections:

    **Purpose:**  
    Explain the main goal of the repository.

    **Key Features:**  
    - Feature 1  
    - Feature 2  
    - Feature 3  

    **Installation & Usage:**  
    - Step 1  
    - Step 2  
    - Step 3  

    **Target Users:**  
    Who is this repository designed for?

    **Status & Maintenance:**  
    Is it actively maintained, archived, or deprecated?

    ---

    Here are some examples:

    ---

    **Purpose:**  
    A collection of Unet-based deep learning models for image segmentation, particularly in the medical domain.

    **Key Features:**  
    - Implements 5 variants of Unet: standard, RCNN, Attention, Nested, and hybrids  
    - Visualizations for model layers, filters, and performance metrics like Dice score  
    - Includes references to academic papers for each architecture  

    **Installation & Usage:**  
    - Python 3.6+, PyTorch 0.4+, install via `requirements.txt`  
    - Modify file paths for training and prediction inputs  
    - Visualization tools require Visdom or TensorboardX  

    **Target Users:**  
    ML researchers and practitioners working on biomedical image segmentation

    **Status & Maintenance:**  
    Actively maintained at the time of writing; includes citation and results

    ---

    **Purpose:**  
    An ecosystem of Rust libraries for running LLMs like LLaMA, GPT-NeoX, etc., using the GGML backend.

    **Key Features:**  
    - CLI tools for inference, chat, model quantization, and performance testing  
    - Supports several model formats and Hugging Face tokenizers  
    - Focuses on local, CPU-based inference with plans for GPU support  

    **Installation & Usage:**  
    - Requires Rust and C toolchain  
    - Add as a dependency via Cargo or clone from GitHub  
    - Prebuilt CLI is also available  

    **Target Users:**  
    Rust developers and systems programmers interested in local LLM inference

    **Status & Maintenance:**  
    Archived as of [date]; users are pointed to better-maintained alternatives

    ---

    **Purpose:**  
    Interactive tutorials and programming exercises to learn quantum computing and Q# programming.

    **Key Features:**  
    - Covers basics of quantum theory, gates, algorithms (e.g., Grover's, Simon's)  
    - Self-paced with hints, tests, reference solutions  
    - Includes beginner-friendly learning paths and visualization tools  

    **Installation & Usage:**  
    - Can run online via Jupyter or locally with QDK and .NET  
    - Multiple entry points: VSCode, Visual Studio, Docker  

    **Target Users:**  
    Students, educators, and developers learning quantum computing

    **Status & Maintenance:**  
    Actively maintained by Microsoft with regular updates and a modernized online experience

    ---

    Now summarize the following GitHub README using the same structure and markdown styling shown above.

    **Important:**  
    - Do **not** wrap the output in triple backticks (` ``` `).  
    - Do **not** use code blocks like ` ```markdown ` or ` ```python `.  
    - Just return plain Markdown-formatted text with bold headers and bullet points.
    
    \"\"\"
    {readme_text}
    \"\"\"
    """


    
    # Call the gemini API with the prompt
    model = genai.GenerativeModel(model)
    response = model.generate_content(prompt)

    return response.text.strip()