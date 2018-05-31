import os

from nacl.exceptions import InvalidkeyError
import nacl.pwhash
from sqlalchemy_utils import EncryptedType
from sqlalchemy_utils.types.encrypted.encrypted_type import AesEngine

from api.index import db


# In production, the `ENCRYPTION_KEY` environment variable will override this default
UNSECURE_DEFAULT_KEY = 's8vf63bslc8s52vspcmv84v1'
SECRET_ENCRYPTION_KEY = os.environ.get('ENCRYPTION_KEY', UNSECURE_DEFAULT_KEY)


class User(db.Model):

    __tablename__ = "users"

    id = db.Column(db.Integer(), autoincrement=True, primary_key=True)
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    email = db.Column(db.String(255), unique=True)
    password_hash = db.Column(db.String(255))
    nylas_access_token = db.Column(EncryptedType(db.String,
                                                 SECRET_ENCRYPTION_KEY,
                                                 AesEngine,
                                                 'pkcs5'))

    def __init__(self, first_name, last_name, email, password, nylas_access_token):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.nylas_access_token = nylas_access_token
        self.set_password(password)

    def set_password(self, password):
        pw_bytes = password.encode('utf-8')
        self.password_hash = nacl.pwhash.str(pw_bytes)

    def check_password(self, password):
        try:
            pw_bytes = password.encode('utf-8')
            # Will return True or raise `nacl.exceptions.InvalidkeyError`
            # See: http://pynacl.readthedocs.io/en/stable/password_hashing/
            return nacl.pwhash.verify(self.password_hash, pw_bytes)
        except InvalidkeyError:
            return False
