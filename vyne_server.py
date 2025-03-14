from flask import Flask, request, jsonify
from llama_cpp import Llama

app = Flask(__name__)

# Load the AI Models
MODEL_PATH_LLAMA = "/Users/vincentscomputer/.cache/huggingface/download/vicuna-7b-v1.5-16k.Q6_K.gguf"
MODEL_PATH_MISTRAL = "/System/Volumes/Data/Users/vincentscomputer/Desktop/vyne-backend/Mistral-7B-Instruct-v0.1-GGUF/mistral-7b-instruct-v0.1.Q4_K_M.gguf"

llm_llama = Llama(model_path=MODEL_PATH_LLAMA, n_gpu_layers=2, n_ctx=2048)
llm_mistral = Llama(model_path=MODEL_PATH_MISTRAL, n_gpu_layers=2, n_ctx=2048)

@app.route('/api/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message', '')

    # 🔹 Pick Mistral for general chat, LLaMA for deep logic
    if len(user_message) < 50:
        model = llm_mistral
    else:
        model = llm_llama

    # 🔹 Generate AI response
    prompt = f"You are Vyne, a cybernetic AI. Answer: {user_message}"
    response = model.create_completion(prompt=prompt, max_tokens=256, temperature=0.7)

    ai_reply = response["choices"][0].get("text", "").strip()

    return jsonify({"response": ai_reply})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

