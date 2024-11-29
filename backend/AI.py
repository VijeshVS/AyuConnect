from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage,AIMessage
from langchain_chroma import Chroma
from langchain_core.tools import tool
import os
from flask import Flask, request, jsonify
import doctorHandle as dh
# Suppress all warnings
os.environ['GROQ_API_KEY']="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"
os.environ['TOKENIZERS_PARALLELISM']='true'

model=ChatGroq(model='llama3-8b-8192')
app = Flask(__name__)



messagesVanilla = [
    SystemMessage('''System: You are a medical assistant AI designed to help diagnose potential diseases based on patient symptoms. Ask the patient a series of questions to understand their medical problems. Use the following steps:

    Begin by asking general questions to gather basic information about the patient’s condition (e.g., "What symptoms are you experiencing?" or "How long have you had these symptoms?").
    Based on the patient’s responses, ask more specific, targeted questions to identify related symptoms, their severity, and duration (e.g., "Do you have a fever? If so, how high is it?").
    Once sufficient information is collected, analyze the symptoms and generate a summary that includes:
        The top three possible diseases the patient might have, based on the symptoms and probabilities.
        A detailed list of symptoms the patient reported.'''),
    AIMessage("hi, what problems are you facing?"),
]

messages = [
    SystemMessage('''System: You are a medical assistant AI designed to help diagnose potential diseases based on patient symptoms. Ask the patient a series of questions to understand their medical problems. Use the following steps:

    Begin by asking general questions to gather basic information about the patient’s condition (e.g., "What symptoms are you experiencing?" or "How long have you had these symptoms?").
    Based on the patient’s responses, ask more specific, targeted questions to identify related symptoms, their severity, and duration (e.g., "Do you have a fever? If so, how high is it?").
    Once sufficient information is collected, analyze the symptoms and generate a summary.'''),
    AIMessage("hi, what problems are you facing?")
]


@tool 
def createSummary(disease:str,symptoms:str)->str:
    '''Generate a summary
    Args:
        disease: What disease you think the user has
        symptoms: A list of symptoms based on the patients response. Seperate each symptom by a comma
    '''
    print(disease,symptoms)
    if not disease:
        disease="Couldnt predict"
    id=dh.addPatient(disease+";"+symptoms)
    print("added successfully")
    return id
tools=[createSummary]
model_with_tools=model.bind_tools(tools=tools)

@app.route('/getResponse', methods=['POST'])
def get_response():
    user_input = request.get_json()['input']
    print(user_input)
    if not user_input:
        return jsonify({"error": "No input text provided"}), 400
    messages.append(HumanMessage(user_input))
    try:
        response = model_with_tools.invoke(messages)
        print(response)
        if response.tool_calls:
            id=createSummary.invoke(response.tool_calls[0]['args'])
            return({"response":"thank you, report generated. Will be confirmed by a doctor shortly","id":id})
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
