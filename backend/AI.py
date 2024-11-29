from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
from langchain_chroma import Chroma
from langchain_core.tools import tool
import os
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import doctorHandle as dh

# Suppress all warnings
os.environ['GROQ_API_KEY'] = "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"
os.environ['TOKENIZERS_PARALLELISM'] = 'true'

model = ChatGroq(model='llama3-8b-8192')
app = Flask(__name__)

# Enable CORS for the entire app, allowing all origins
CORS(app)  # This will allow all origins to access your API

# Initial system and AI messages
messagesVanilla = [
    SystemMessage('''You are a medical assistant AI designed to help diagnose potential diseases based on patient symptoms. Ask the patient a series of questions to understand their medical problems. Use the following steps:

Begin by asking general questions to gather basic information about the patient’s condition (e.g., "What symptoms are you experiencing?" or "How long have you had these symptoms?").
Based on the patient’s responses, ask more specific, targeted questions to identify related symptoms, their severity, and duration (e.g., "Do you have a fever? If so, how high is it?").
Once sufficient information is collected, analyze the symptoms and generate a summary starting with "SUMMARY" when you are confident about the diagnosis. The summary should include:
SUMMARY: The top three possible diseases the patient might have, based on the symptoms and probabilities.
A detailed list of symptoms the patient reported.
If you are unsure, ask further questions to gather more information before generating a conclusion.'''),
    AIMessage("hi, what problems are you facing?"),
]

messages = messagesVanilla.copy()

# Tool to generate a summary of the disease and symptoms
@tool
def createSummary(disease: str, symptoms: str) -> str:
    '''Generate a summary
    Args:
        disease: What disease you think the user has
        symptoms: A list of symptoms based on the patients' response. Separate each symptom by a comma
    '''
    print(disease, symptoms)
    if not disease:
        disease = "Couldn't predict"
    # Add patient to the system (your function to handle it)
    id = dh.addPatient(disease + ";" + symptoms)
    print("Added successfully")
    return id

tools = [createSummary]
model_with_tools = model.bind_tools(tools=tools)

@app.route('/getResponse', methods=['POST'])
def get_response():
    user_input = request.get_json().get('input')
    print(user_input)
    
    if not user_input:
        return jsonify({"error": "No input text provided"}), 400
    
    messages.append(HumanMessage(user_input))
    
    try:
        response = model_with_tools.invoke(messages)
        print(response)
        
        if response.tool_calls:
            # The tool call is handled by the model
            id = response.tool_calls[0]['result']
            return jsonify({
                "response": "Thank you, the report has been generated. It will be confirmed by a doctor shortly.",
                "id": id
            })
        
        # If no tool call, just return the AI response
        messages.append(response)
        return jsonify({"response": response.content})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/clear', methods=['GET'])
def clear_messages():
    global messages
    messages = messagesVanilla.copy()
    return jsonify({"status": "Messages reset to vanilla"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6000)
