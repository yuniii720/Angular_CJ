import pyotp
from flask import Flask, request, jsonify

app = Flask(__name__)


key = pyotp.random_base32()
totp = pyotp.TOTP(key)

@app.route('/verify-2fa', methods=['POST'])
def verify_2fa():
    code = request.json.get('code') 

    if totp.verify(code):
        return jsonify({"success": True}), 200
    else:
        return jsonify({"success": False}), 403

if __name__ == '__main__':
    app.run(debug=True)
