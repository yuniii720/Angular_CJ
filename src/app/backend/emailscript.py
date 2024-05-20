import smtplib
from email.message import EmailMessage
from flask import Flask, request, jsonify
from flask_cors import CORS
from random import sample
import string
from supabase import create_client, Client

app = Flask(__name__)
CORS(app, origins="http://localhost:4200")

SMTP_HOST = 'smtp.gmail.com'
SMTP_PORT = 465
GMAIL_ADDRESS = 'vncajamarproyecto@gmail.com'
GMAIL_PASSWORD = 'nzwp kete plfm ttph'

SUPABASE_URL = 'https://pbjdatvfbfkhaqrxrzdg.supabase.co'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBiamRhdHZmYmZraGFxcnhyemRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0MzA0OTUsImV4cCI6MjAyOTAwNjQ5NX0.c-OqL72CZnVcBSMMRitbiN5VUzZF6SDrRuwLHA-i7jk'
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def password_generator(longitud: int) -> str:
    caracteres_validos = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(sample(caracteres_validos, longitud))
    return password

@app.route('/send-email', methods=['POST'])
def send_email():
    try:
        data = request.get_json()
        email = data.get('email')
        username = data.get('username')

        if not email or not username:
            raise KeyError('Faltan campos obligatorios en la solicitud')

        # Generar la contraseña si no se proporciona
        password = password_generator(12) if 'password' not in data else data['password']

        # Configurar el mensaje de correo electrónico
        msg = EmailMessage()
        msg.set_content(f'Hola {username},\n\nBienvenido, hemos recibido tu registro en Cajamar. Aquí están tus credenciales:\n\nUsuario: {username}\nContraseña: {password}\n\n¡Gracias por registrarte! Si tienes algún problema para acceder, no dudes en contactar con soscajamar@viewnext.com')

        msg['Subject'] = 'Bienvenido a Cajamar'
        msg['From'] = GMAIL_ADDRESS
        msg['To'] = email

        # Enviar el correo electrónico
        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT) as server:
            server.login(GMAIL_ADDRESS, GMAIL_PASSWORD)
            server.send_message(msg)

        # Insertar el registro en Supabase
        supabase.table('Registros').insert([{'email': email, 'username': username, 'password': password}]).execute()

        return jsonify({'message': 'Correo electrónico enviado correctamente'}), 200
    except Exception as e:
        if isinstance(e, KeyError):
            return jsonify({'error': f'Faltan campos obligatorios en la solicitud: {str(e)}'}), 400
        elif isinstance(e, smtplib.SMTPException):
            return jsonify({'error': f'Error al enviar el correo electrónico: {str(e)}'}), 500
        else:
            return jsonify({'error': f'Error inesperado: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
