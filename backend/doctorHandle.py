import sqlite3
from flask import Flask, request

# Connect to SQLite database
conn = sqlite3.connect('doctorDB.db',check_same_thread=False)
app = Flask(__name__)

# Create a cursor object
cursor = conn.cursor()

# Check if the table exists and create it if it doesn't
cursor.execute('''
    CREATE TABLE IF NOT EXISTS doctors (
        Id INTEGER PRIMARY KEY,
        Patient_summary TEXT NOT NULL,
        status INTEGER NOT NULL,
        medicines TEXT
    )
''')
#Patient summary:
#[patientname, patientsex, patient age, disease predicted 1, disease predicted 2 , disease predicted 3. Symptom list. conversation list]
#convert array to string by seperating each field by a semicolon and sublist by a ,
def parse_patient_summary(summary):
    fields = summary.split(';')
    patient_info = {
        'patient_name': fields[0],
        'patient_sex': fields[1],
        'patient_age': fields[2],
        'disease_predicted_1': fields[3],
        'disease_predicted_2': fields[4],
        'disease_predicted_3': fields[5],
        'symptom_list': fields[6].split(','),
        'conversation_list': fields[7].split(','),
        'medicines': fields[8] if len(fields) > 8 else ''
    }
    return patient_info

def convert_patient_info_to_string(patient_info):
    summary = ';'.join([
        patient_info['patient_name'],
        patient_info['patient_sex'],
        patient_info['patient_age'],
        patient_info['disease_predicted_1'],
        patient_info['disease_predicted_2'],
        patient_info['disease_predicted_3'],
        ','.join(patient_info['symptom_list']),
        ','.join(patient_info['conversation_list']),
        patient_info['medicines']
    ])
    return summary

@app.route('/getPatients', methods=['GET'])
def getPatients():
    conn = sqlite3.connect('doctorDB.db', check_same_thread=False)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM doctors')
    patients = cursor.fetchall()
    conn.close()
    return patients,200

@app.route('/addPatient', methods=['POST'])
def addPatient():
    data = request.get_json()
    patient_summary = data['Patient_summary']
    
    # Reopen the database connection
    conn = sqlite3.connect('doctorDB.db', check_same_thread=False)
    cursor = conn.cursor()
    
    cursor.execute('''
    INSERT INTO doctors (Patient_summary, status, medicines)
    VALUES (?, ?, ?)
    ''', (patient_summary, 0, ""))

    conn.commit()
    conn.close()
    return {'Id': cursor.lastrowid}, 201
    

# Commit the changes and close the connection
conn.commit()
conn.close()

if __name__ == '__main__':
    app.run(debug=True)
