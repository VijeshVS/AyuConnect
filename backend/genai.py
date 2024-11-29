import pandas as pd
from groq import Groq
import random

class Symptoms:
    def __init__(self, data, model_name="llama-3.1"):
        self.df = pd.read_csv(data)
        self.symptoms = self.df["Symptoms"].tolist()
        self.diseases = self.df["Diseases"].tolist()
        self.user_symptoms = []
        self.user_data = []
        self.model = Groq(model_name=model_name)
    def str_to_list_converter(self,sym_list_str):
        res=['']
        cur_pos=0
        for i in sym_list_str:
            if cur_pos>=len(res):
                res.append('')
            if i=='[' or i==']'or i=="'":
                pass
            elif i==',':
                cur_pos+=1
            else:
                res[cur_pos]+=i

        return res
    def basic_info_ask(self):
        prompt = "Ask the user for basic information such as their name, age, and gender."
        response = self.model.generate(prompt, max_tokens=50)
        return response

    def get_basic_info(self, user_input):
        info = user_input.split(", ")
        self.user_data = {
            "Name": info[0] if len(info) > 0 else None,
            "Age": int(info[1]) if len(info) > 1 and info[1].isdigit() else None,
            "Gender": info[2] if len(info) > 2 else None,
        }
        return self.user_data
    def process_response(self,response,symptom):
        prompt=f" based on response {response}, does the person have the symptom {symptom}"
        processed_response=self.model.generate(prompt,response)
    def get_sym(self, asked_symptoms):
        self.sym_list=[s for l in self.symptoms for s in self.str_to_list_converter(l)]
        avail_sym=[s for s in self.sym_list if s not in asked_symptoms]
        if not avail_sym:
            return None
        symptom= random.choice(avail_sym)
        return symptom
    
    def ask_question(self):
        asked_sym=[] 
        while True:
            symptom=self.get_sym(asked_sym)
            if symptom==None:
                break
            prompt=f"ask in a descriptive way if they have {symptom}"
            response=self.model.generate(prompt,max_tokens=500)


