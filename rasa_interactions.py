import socketio
from rasa.core.agent import Agent

sio = socketio.Client()

# Carga el modelo Rasa entrenado desde el directorio donde se encuentra el modelo
model_path = "C:\Users\david\OneDrive\Documentos\MÁSTER Letras Digitales\TFM\testing\Entrenamiento 2 Prueba 1 SocketIo\models\20230721-115232-crimson-yaw.tar.gz"
agent = Agent.load(model_path)

# Función para enviar el mensaje del usuario al modelo Rasa y obtener la respuesta
def rasa_response(message):
    response = agent.handle_text(message)
    return response[0]['text']

# Ahora puedes utilizar la función rasa_response en la función handle_message
@sio.on('user_message')
def handle_message(sid, message):
    response = rasa_response(message)
    sio.emit('bot_response', response)
