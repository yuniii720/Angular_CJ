import time
import pyotp
import qrcode

key = pyotp.random_base32()

uri = pyotp.totp.TOTP(key).provisioning_uri(name="Josh",
                                            issuer_name="Proyecto cajamar")

print(uri)

qrcode.make(uri).save("totp.png")