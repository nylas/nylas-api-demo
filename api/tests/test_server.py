import responses

from api.tests.test_utils import NylasApiDemoTest


class TestAPI(NylasApiDemoTest):

    def _login_user(self):
        return self.app.post('/login',
                             json={'email': self.default_user['email'],
                                   'password': self.default_user['password']})

    def test_404_authenticated_user(self):
        # test that authenticated users get 404 Not Found responses on invalid paths
        self._login_user()
        result = self.app.get('/not_a_route')
        assert result.status_code == 404

    def test_404_unauthenticated_user(self):
        # test that unauthenticated users get 401 Unauthorized responses on invalid paths
        result = self.app.get('/not_a_route')
        assert result.status_code == 401

    def test_login_valid_credentials(self):
        # Test that requests with valid credentials are handled correctly
        good_result = self._login_user()
        assert good_result.status_code == 200

    def test_login_missing_credentials(self):
        # Test that requests missing email/password credentials are handled correctly
        incomplete_result = self.app.post('/login')
        assert incomplete_result.status_code == 401

    def test_login_invalid_credentials(self):
        # Test that requests with incorrect credentials are handled correctly
        bad_result = self.app.post('/login',
                                   json={'email': self.default_user['email'],
                                         'password': 'wrong_password'})
        assert bad_result.status_code == 401

    def test_create_event_invalid_credentials(self):
        # test that unauthenticated users cannot access endpoint
        result = self.app.post('/events', json={'x': 'y'})
        assert result.status_code == 401

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
        assert result.status_code == 401

    @responses.activate
    def test_get_calendars(self):
        # test that authenticated users get correct data
        self._login_user()
        responses.add(responses.GET, 'https://api.nylas.com/calendars', json={'foo': 'bar'}, status=200)
        result = self.app.get('/calendars')
        assert result.json == {'foo': 'bar'}
        assert result.status_code == 200

    def test_get_event_invalid_credentials(self):
        # test that unauthenticated users cannot access endpoint
        result = self.app.get('/events/a7shakd9s')
        assert result.status_code == 401

    @responses.activate
    def test_get_event(self):
        # test that authenticated users get correct data
        self._login_user()
        responses.add(responses.GET, 'https://api.nylas.com/events/a7shakd9s', json={'foo': 'bar'}, status=200)
        result = self.app.get('/events/a7shakd9s')
        assert result.json == {'foo': 'bar'}
        assert result.status_code == 200

    @responses.activate
    def test_get_event_invalid_id(self):
        # test that authenticated users get 404s if the Nylas API returns a 404.
        self._login_user()
        responses.add(responses.GET, 'https://api.nylas.com/events/invalid_event_id', status=404)
        result = self.app.get('/events/invalid_event_id')
        assert result.status_code == 404

    def test_get_messages_invalid_credentials(self):
        # test that unauthenticated users cannot access endpoint
        result = self.app.get('/messages')
        assert result.status_code == 401

    @responses.activate
    def test_get_messages(self):
        # test that authenticated users get correct data
        self._login_user()
        responses.add(responses.GET, 'https://api.nylas.com/messages', json={'foo': 'bar'}, status=200)
        result = self.app.get('/messages')
        assert result.json == {'foo': 'bar'}
        assert result.status_code == 200

    @responses.activate
    def test_get_messages_from_thread(self):
        # test that authenticated users get correct data
        self._login_user()
        responses.add(responses.GET,
                      'https://api.nylas.com/messages?thread_id=1h6wfd9fkt2u47',
                      json={'foo': 'bar'},
                      status=200)
        result = self.app.get('/messages?thread_id=1h6wfd9fkt2u47')
        assert result.json == {'foo': 'bar'}
        assert result.status_code == 200

    def test_get_thread_invalid_credentials(self):
        # test that unauthenticated users cannot access endpoint
        result = self.app.get('/thread/1h6wfd9fkt2u47')
        assert result.status_code == 401

    @responses.activate
    def test_get_thread(self):
        # test that authenticated users get correct data
        self._login_user()
        responses.add(responses.GET, 'https://api.nylas.com/threads/1h6wfd9fkt2u47', json={'foo': 'bar'}, status=200)
        result = self.app.get('/threads/1h6wfd9fkt2u47')
        assert result.json == {'foo': 'bar'}
        assert result.status_code == 200

    def test_get_threads_invalid_credentials(self):
        # test that unauthenticated users cannot access endpoint
        result = self.app.get('/threads')
        assert result.status_code == 401

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
        assert result.status_code == 401

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
        assert result.status_code == 401

    @responses.activate
    def test_update_event(self):
        # test that authenticated users get correct data
        self._login_user()
        responses.add(responses.PUT, 'https://api.nylas.com/events/1h6wfd9fkt2u47', json={'foo': 'bar'}, status=200)
        result = self.app.put('/events/1h6wfd9fkt2u47', json={'x': 'y'})
        assert result.json == {'foo': 'bar'}
        assert result.status_code == 200

    def test_update_user(self):
        # test that update requests to user data get properly executed
        self._login_user()
        result = self.app.put('/user/1', json={'display_text': 'Company Name',
                                               'display_logo': 'http://fake_company.com/logo.png',
                                               'default_calendar': 'as7fbds3gjsdbf'})
        assert result.status_code == 200
        assert result.json['displayText'] == 'Company Name'
        assert result.json['displayLogo'] == 'http://fake_company.com/logo.png'
        assert result.json['defaultCalendar'] == 'as7fbds3gjsdbf'

    def test_update_user_bad_user(self):
        # test that update requests to user data aren't executed if provided user_id doesn't match logged_in user
        self._login_user()
        result = self.app.put('/user/2', json={'display_text': 'Company Name',
                                               'display_logo': 'http://fake_company.com/logo.png',
                                               'default_calendar': 'as7fbds3gjsdbf'})
        assert result.status_code == 401
