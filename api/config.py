import os

# In production, the environment variables `FLASK_SECRET` and `DATABASE_URI` will override these defaults.
DEFAULT_DATABASE_URI = 'sqlite:///nylasAPIDemo.db'
DEFAULT_SECRET_KEY = 'd7fjw6sv2afk2suid0n8'


class Config(object):
    DEBUG = False
    SECRET_KEY = os.environ.get('FLASK_SECRET', DEFAULT_SECRET_KEY)
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI', DEFAULT_DATABASE_URI)
