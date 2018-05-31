from setuptools import find_packages, setup

setup(
    name='nylas-api-demo',
    version='1.0',
    packages=find_packages(),
    install_requires=[
        'click',
        'cryptography',
        'Flask',
        'Flask-Session',
        'Flask-SQLAlchemy',
        'itsdangerous',
        'Jinja2',
        'MarkupSafe',
        'python-dotenv',
        'pyNaCl',
        'SQLAlchemy',
        'Werkzeug'
    ],
    entry_points={
        'console_scripts': ['nylas_demo=api.scripts.nylas_demo_cli:cli']
    }
)
