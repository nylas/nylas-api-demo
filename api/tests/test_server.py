import os
from unittest.mock import patch

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

    def test_logout_valid_credentials(self):
        # Test that logout is handled correctly
        self._login_user()
        result = self.app.post('/logout')
        assert result.status_code == 200
        bad_result = self.app.get('/calendars')
        assert bad_result.status_code == 401

    def test_logout_invalid_credentials(self):
        # Test that logout from unauthenticated user is handled correctly
        bad_result = self.app.post('/logout')
        assert bad_result.status_code == 401

    def test_create_event_invalid_credentials(self):
        # test that unauthenticated users cannot access endpoint
        result = self.app.post('/events', json={'x': 'y'})
        assert result.status_code == 401

    @responses.activate
    def test_create_event(self):
        # test that authenticated users get correct data
        self._login_user()
        responses.add(responses.POST, 'https://api.nylas.com/events', json={'id': 'bar'}, status=200)
        result = self.app.post('/events', json={'x': 'y'})
        assert result.json == {'id': 'bar'}
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

    @responses.activate
    def test_get_threads_with_email(self):
        # test that authenticated users get correct data
        self._login_user()
        responses.add(responses.GET,
                      'https://api.nylas.com/threads?any_email=demo@nylas.com',
                      json={'foo': 'bar'},
                      status=200)
        result = self.app.get('/threads?any_email=maria@nylas.com')
        assert result.json == {'foo': 'bar'}
        assert result.status_code == 200
        responses.add(responses.GET,
                      'https://api.nylas.com/threads',
                      json={'notfoo': 'notbar'},
                      status=200)
        result2 = self.app.get('/threads?any_email=maria@nylas.com')
        assert result2.json == {'foo': 'bar'}

    def test_send_mail_invalid_credentials(self):
        # test that unauthenticated users cannot access endpoint
        result = self.app.post('/send', json={'x': 'y'})
        assert result.status_code == 401

    @responses.activate
    def test_send_mail(self):
        # test that authenticated users get correct data
        self._login_user()
        responses.add(responses.POST, 'https://api.nylas.com/send', json={'thread_id': 'bar'}, status=200)
        result = self.app.post('/send', json={'x': 'y'})
        assert result.json == {'thread_id': 'bar'}
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
        result = self.app.put('/user/1', json={'companyText': 'Company Name',
                                               'companyLogo': 'http://fake_company.com/logo.png',
                                               'defaultCalendar': 'as7fbds3gjsdbf'})
        assert result.status_code == 200
        assert result.json['companyText'] == 'Company Name'
        assert result.json['companyLogo'] == 'http://fake_company.com/logo.png'
        assert result.json['defaultCalendar'] == 'as7fbds3gjsdbf'

    def test_update_user_bad_user(self):
        # test that update requests to user data aren't executed if provided user_id doesn't match logged_in user
        self._login_user()
        result = self.app.put('/user/2', json={'companyText': 'Company Name',
                                               'companyLogo': 'http://fake_company.com/logo.png',
                                               'defaultCalendar': 'as7fbds3gjsdbf'})
        assert result.status_code == 401

    def test_webhook_challenge(self):
        # test that webhook responds with challenge param to unauthenticated GET requests
        result = self.app.get('/webhook?challenge=You shall not pass')
        assert result.status_code == 200
        assert result.data == b'You shall not pass'

    @patch('api.server.verify_signature')
    def test_webhook_post_no_login(self, verify_signature_mock):
        # test that webhook post requests don't require user login
        verify_signature_mock.return_value = True
        result = self.app.post('/webhook', json={'deltas': []})
        assert result.status_code == 200

    def test_webhook_post_no_verification(self):
        # test that webhook post requests require header verification
        result = self.app.post('/webhook', json={'deltas': []})
        assert result.status_code == 401

    def test_webhook_post_header_verification(self):
        # test webhook header verification
        os.environ['NYLAS_OAUTH_CLIENT_SECRET'] = 'secret'

        result = self.app.post('/webhook',
                               json={'deltas': []},
                               headers={'X-Nylas-Signature': 'b06c6d76bbe35c0a91269fe1f626d0f1ec8b9106a7740ef07d48084e1e3583ce'})
        assert result.status_code == 200

    @responses.activate
    def test_webhook_event_update(self):
        # test that events are persisted to cache and updated following event.updated webhook
        initial_event = {'id': 'foo', 'account_id': 'bar'}
        updated_event = {'id': 'foo', 'account_id': 'not_bar'}
        os.environ['NYLAS_OAUTH_CLIENT_SECRET'] = 'secret'

        from api.server import event_cache
        assert event_cache.get('foo') is None

        # create event `foo`
        self._login_user()
        responses.add(responses.POST,
                      'https://api.nylas.com/events',
                      json=initial_event,
                      status=200)
        self.app.post('/events', json={'x': 'y'})

        # test `foo` object is persisted in the event cache
        cached_new_event = event_cache.get_if_fresh('foo')
        assert cached_new_event == initial_event

        # process `event.updated` webhook for `foo` event
        with patch('api.server.verify_signature') as verify_signature_mock:
            verify_signature_mock.return_value = True

            result = self.app.post('/webhook', json={'deltas': [{'date': 'x',
                                                                 'type': 'event.updated',
                                                                 'object': 'event',
                                                                 'object_data': {'id': 'foo'}}]})

        # test `foo` is marked for refresh after webhook processed
        assert result.status_code == 200
        cached_stale_event = event_cache.get('foo')
        cached_fresh_event = event_cache.get_if_fresh('foo')
        assert cached_stale_event == initial_event
        assert cached_fresh_event is None

        responses.add(responses.GET,
                      'https://api.nylas.com/events/foo',
                      json=updated_event,
                      status=200)

        # test `foo` is refreshed when marked for refresh
        self.app.get('/events/foo', json={'x': 'y'})
        cached_fresh_event = event_cache.get_if_fresh('foo')
        assert cached_fresh_event == updated_event

    @responses.activate
    def test_webhook_event_no_update(self):
        # test that events not created in app are not persisted to cache
        os.environ['NYLAS_OAUTH_CLIENT_SECRET'] = 'secret'

        from api.server import event_cache
        assert event_cache.get('foobar') is None

        with patch('api.server.verify_signature') as verify_signature_mock:
            verify_signature_mock.return_value = True

            result = self.app.post('/webhook', json={'deltas': [{'date': 'x',
                                                                 'type': 'event.updated',
                                                                 'object': 'event',
                                                                 'object_data': {'id': 'foobar'}}]})

        assert event_cache.get('foobar') is None
        assert result.status_code == 200

    @responses.activate
    def test_webhook_thread_update(self):
        # test that threads are persisted to cache and updated following thread.replied webhook
        initial_message_in_thread = {'id': '1', 'thread_id': 'foo'}
        updated_thread_messages = [{'id': '1', 'thread_id': 'foo'}, {'id': '2', 'thread_id': 'foo'}]
        os.environ['NYLAS_OAUTH_CLIENT_SECRET'] = 'secret'

        from api.server import thread_messages_cache
        assert thread_messages_cache.get('foo') is None

        # send mail, create new thread `foo`
        self._login_user()
        responses.add(responses.POST,
                      'https://api.nylas.com/send',
                      json=initial_message_in_thread,
                      status=200)
        self.app.post('/send', json={'x': 'y'})

        # test `foo` message array is persisted in the messages in thread cache

        cached_new_event = thread_messages_cache.get_if_fresh('foo')
        assert cached_new_event == [initial_message_in_thread]

        # process `thread.replied` webhook for `foo` thread
        with patch('api.server.verify_signature') as verify_signature_mock:
            verify_signature_mock.return_value = True

            result = self.app.post('/webhook', json={'deltas': [{'date': 'x',
                                                                 'type': 'thread.replied',
                                                                 'object': 'thread',
                                                                 'object_data': {'id': 'foo'}}]})

        # test `foo` is marked for refresh after webhook processed
        cached_stale_event = thread_messages_cache.get('foo')
        cached_fresh_event = thread_messages_cache.get_if_fresh('foo')
        assert result.status_code == 200
        assert cached_fresh_event is None
        assert cached_stale_event == [initial_message_in_thread]

        responses.add(responses.GET,
                      'https://api.nylas.com/messages?thread_id=foo',
                      json=updated_thread_messages,
                      status=200)

        # test `foo` is refreshed when marked for refresh
        self.app.get('/messages?thread_id=foo', json={'x': 'y'})
        cached_fresh_event = thread_messages_cache.get_if_fresh('foo')
        assert cached_fresh_event == updated_thread_messages

    @responses.activate
    def test_webhook_thread_no_update(self):
        # test that threads not created in app are not persisted to cache
        os.environ['NYLAS_OAUTH_CLIENT_SECRET'] = 'secret'

        from api.server import thread_messages_cache
        assert thread_messages_cache.get('foobar') is None

        with patch('api.server.verify_signature') as verify_signature_mock:
            verify_signature_mock.return_value = True

            result = self.app.post('/webhook', json={'deltas': [{'date': 'x',
                                                                 'type': 'thread.replied',
                                                                 'object': 'thread',
                                                                 'object_data': {'id': 'foobar'}}]})

        assert result.status_code == 200
        assert thread_messages_cache.get('foobar') is None
