import responses

from api.tests.test_utils import NylasApiDemoTest


class TestAPI(NylasApiDemoTest):

    def _login_user(self):
        return self.app.post('/login',
                             json={'email': self.default_user['email'],
                                   'password': self.default_user['password']})

    def test_login_valid_credentials(self):
        # Test that requests with valid credentials are handled correctly
        good_result = self._login_user()
        assert good_result.status_code == 200

    def test_login_missing_credentials(self):
        # Test that requests missing email/password credentials are handled correctly
        incomplete_result = self.app.post('/login')
        assert incomplete_result.status_code == 400

    def test_login_invalid_credentials(self):
        # Test that requests with incorrect credentials are handled correctly
        bad_result = self.app.post('/login',
                                   json={'email': self.default_user['email'],
                                         'password': 'wrong_password'})
        assert bad_result.status_code == 401

    def test_create_event_invalid_credentials(self):
        # test that unauthenticated users cannot access endpoint
        result = self.app.post('/events', json={'x': 'y'})
        assert result.status_code == 400

    @responses.activate
    def test_create_event(self):
        # test that authenticated users get correct data
        self._login_user()
        responses.add(responses.POST, 'https://api.nylas.com/events', json={'foo': 'bar'}, status=200)
        result = self.app.post('/events', json={'x': 'y'})
        assert result.json == {'foo': 'bar'}
        assert result.status_code == 200

    def test_get_calendars_invalid_credentials(self):
        # test that unauthenticated users cannot access endpoint
        result = self.app.get('/calendars')
        assert result.status_code == 400

    @responses.activate
    def test_get_calendars(self):
        # test that authenticated users get correct data
        self._login_user()
        responses.add(responses.GET, 'https://api.nylas.com/calendars', json={'foo': 'bar'}, status=200)
        result = self.app.get('/calendars')
        assert result.json == {'foo': 'bar'}
        assert result.status_code == 200

    def test_get_thread_invalid_credentials(self):
        # test that unauthenticated users cannot access endpoint
        result = self.app.get('/thread/1h6wfd9fkt2u47')
        assert result.status_code == 400

    @responses.activate
    def test_get_thread(self):
        # test that authenticated users get correct data
        self._login_user()
        responses.add(responses.GET, 'https://api.nylas.com/thread/1h6wfd9fkt2u47', json={'foo': 'bar'}, status=200)
        result = self.app.get('/thread/1h6wfd9fkt2u47')
        assert result.json == {'foo': 'bar'}
        assert result.status_code == 200

    def test_get_threads_invalid_credentials(self):
        # test that unauthenticated users cannot access endpoint
        result = self.app.get('/threads')
        assert result.status_code == 400

    @responses.activate
    def test_get_threads(self):
        # test that authenticated users get correct data
        self._login_user()
        responses.add(responses.GET, 'https://api.nylas.com/threads', json={'foo': 'bar'}, status=200)
        result = self.app.get('/threads')
        assert result.json == {'foo': 'bar'}
        assert result.status_code == 200

    def test_send_mail_invalid_credentials(self):
        # test that unauthenticated users cannot access endpoint
        result = self.app.post('/send', json={'x': 'y'})
        assert result.status_code == 400

    @responses.activate
    def test_send_mail(self):
        # test that authenticated users get correct data
        self._login_user()
        responses.add(responses.POST, 'https://api.nylas.com/send', json={'foo': 'bar'}, status=200)
        result = self.app.post('/send', json={'x': 'y'})
        assert result.json == {'foo': 'bar'}
        assert result.status_code == 200

    def test_update_event_invalid_credentials(self):
        # test that unauthenticated users cannot access endpoint
        result = self.app.put('/events/1h6wfd9fkt2u47', json={'x': 'y'})
        assert result.status_code == 400

    @responses.activate
    def test_update_event(self):
        # test that authenticated users get correct data
        self._login_user()
        responses.add(responses.PUT, 'https://api.nylas.com/events/1h6wfd9fkt2u47', json={'foo': 'bar'}, status=200)
        result = self.app.put('/events/1h6wfd9fkt2u47', json={'x': 'y'})
        assert result.json == {'foo': 'bar'}
        assert result.status_code == 200
