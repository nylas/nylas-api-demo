from flask_testing import TestCase

from api.server import app, db
from api.model import User


class NylasApiDemoTest(TestCase):

    default_user = {'first_name': 'Hello',
                    'last_name': 'World',
                    'email': 'name@email.com',
                    'password': 'secret',
                    'access_token': 'secret2'}

    def create_app(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        return app

    def setUp(self):
        self.app = self.create_app().test_client()
        db.create_all()
        user = User(self.default_user['first_name'],
                    self.default_user['last_name'],
                    self.default_user['email'],
                    self.default_user['password'],
                    self.default_user['access_token'])
        db.session.add(user)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
