# Nylas API Demo App

The Nylas email & calendar APIs power applications with email and scheduling features from any inbox in the world.


## How to run the Backend

The server code was developed on Python 3.6.5

### Download, create and activate your virtual environment:
```
pip3 install virtualenv
virtualenv .venv --python=python3
source .venv/bin/activate
```

### Install dependencies:
```
pip3 install -r requirements.txt
pip3 install .
```

### Create database and tables:
`nylas_demo create_tables`

### Seed database with user data:
`nylas_demo add_user <first_name> <last_name> <email> <password> <nylas_access_token>`

Please see our [API documentation](https://docs.nylas.com/reference#authentication) on hosted and native authentication for information on how to authenticate new users, and receive access tokens.

To use the API without implementing authentication, visit the [Nylas Dashboard]( https://dashboard.nylas.com/sign-in) and register for a developer account. After you have registered, you can click 'Auth Account' to sync a new email account, and get your access token.

### Export environment variables
If you plan on using webhooks, the app will need your client secret in order to verify incoming webhooks. You can find your secret in the [Nylas Dashboard]( https://dashboard.nylas.com/sign-in) in the Dashboard view. Click the eye icon beside App Secret to copy/paste.

`export NYLAS_OAUTH_CLIENT_SECRET=<nylas_client_secret>`

### Run:
`flask run`

### Lint:
`mypy api --ignore-missing-imports`

### Test:
`pytest -v`


## How to run the Frontend

### Run:
`npm start` runs the front-end at [http://localhost:3000](http://localhost:3000)

### Lint:
`npm run flow`
