from flask import Flask, request, jsonify
import joblib

# Crear la aplicación Flask
app = Flask(__name__)

# Cargar el modelo entrenado
model = joblib.load('./models/modelo_entrenado.pkl')  # Ruta donde guardaste tu modelo

@app.route('/predict', methods=['POST'])
def predict():
    # Obtener los datos del frontend (por ejemplo, los BPM)
    data = request.get_json()
    bpm_values = data['bpm']
    
    # Realizar la predicción (asegúrate de que el modelo reciba datos en el formato adecuado)
    prediction = model.predict([bpm_values])  # Ajusta según tu modelo y los datos esperados
    
    # Devolver la predicción
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)