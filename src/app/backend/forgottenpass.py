import smtplib
from email.message import EmailMessage
from flask import Flask, request, jsonify
from flask_cors import CORS
import string
import random
from supabase import create_client

app = Flask(__name__)
CORS(app, origins="http://localhost:4200")

SMTP_HOST = 'smtp.gmail.com'
SMTP_PORT = 465
GMAIL_ADDRESS = 'vncajamarproyecto@gmail.com'
GMAIL_PASSWORD = 'nzwp kete plfm ttph'

SUPABASE_URL = 'https://pbjdatvfbfkhaqrxrzdg.supabase.co'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBiamRhdHZmYmZraGFxcnhyemRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0MzA0OTUsImV4cCI6MjAyOTAwNjQ5NX0.c-OqL72CZnVcBSMMRitbiN5VUzZF6SDrRuwLHA-i7jk'
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)  

def password_generator(longitud):
    caracteres_validos = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(random.sample(caracteres_validos, longitud))
    return password

@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    try:
        data = request.get_json()
        email = data.get('email')

        if not email:
            raise KeyError('El campo de correo electrónico es obligatorio')

        user_query = supabase.table('Registros').select().eq('email', email)
        user_result = user_query.execute()
        if user_result['count'] == 0:
            return jsonify({'error': 'No se encontró ningún usuario con este correo electrónico'}), 404
        

        new_password = password_generator(12)

        update_result = supabase.table('Registros').update({'password': new_password}).eq('email', email).execute()
        if update_result.get('error'):
            raise Exception(update_result['error'])

        msg = EmailMessage()
        msg.set_content(f'Se ha restablecido tu contraseña en Cajamar. Tu nueva contraseña es: {new_password}')

        msg['Subject'] = 'Restablecimiento de contraseña en Cajamar'
        msg['From'] = GMAIL_ADDRESS
        msg['To'] = email

        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT) as server:
            server.login(GMAIL_ADDRESS, GMAIL_PASSWORD)
            server.send_message(msg)

        return jsonify({'message': 'Se ha enviado un correo electrónico con la nueva contraseña'}), 200

    except Exception as e:
        return jsonify({'error': f'Error al procesar la solicitud: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
