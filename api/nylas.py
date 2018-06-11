from random import uniform
from time import sleep
from typing import Any, Dict, Callable, Optional, Tuple

import requests
from urllib.parse import urljoin

BASE_NYLAS_API = 'https://api.nylas.com'
GET_METHOD = 'GET'
POST_METHOD = 'POST'
RETRIES = 3
RETRY_STATUS_CODES = {429, 500, 502, 503, 504}


class NylasAPI(object):
    """
    Facilitates interactions with the Nylas API.
    """

    def __init__(self, nylas_access_token: str) -> None:
        self.base_url = BASE_NYLAS_API
        self.nylas_access_token = nylas_access_token

    def _construct_headers(self, headers: Optional[Dict[str, str]] = None) -> Dict[str, str]:
        headers = headers or {}
        headers['authorization'] = self.nylas_access_token
        return headers

    def _call_api_endpoint(self,
                           endpoint: str,
                           method: str,
                           headers: Optional[Dict[str, str]] = None,
                           json: Optional[Dict[str, Any]] = None) -> Tuple[Dict[str, str], int]:

        headers = self._construct_headers(headers=headers)
        json = json or {}
        url = urljoin(self.base_url, endpoint)

        if method == GET_METHOD:
            request_func = requests.get  # type: Callable
        elif method == POST_METHOD:
            request_func = requests.post

        for attempt in range(1, RETRIES + 1):

            response = request_func(url,
                                    json=json,
                                    headers=headers)

            # Retry for 429 Too Many Requests and Server error codes
            if response.status_code in RETRY_STATUS_CODES:
                # Backoff before retrying
                max_sleep_time = 2 ** attempt
                sleep(uniform(max_sleep_time / 2, max_sleep_time))
            else:
                return response.json(), response.status_code

        return {'message': 'Unknown Error; Retries Exhausted.'}, response.status_code

    def get_thread(self, thread_id: str) -> Tuple[Dict[str, str], int]:
        """
        Query the Nylas API for a specific email thread.
        See:  https://docs.nylas.com/reference#threadsid
        """
        endpoint = 'thread/{id}'.format(id=thread_id)
        return self._call_api_endpoint(endpoint, GET_METHOD)

    def get_threads(self, json: dict) -> Tuple[Dict[str, str], int]:
        """
        Query the Nylas API for all email threads (can limit results by to/from/subject values).
        See: https://docs.nylas.com/reference#get-threads
        """
        return self._call_api_endpoint('threads', GET_METHOD, json=json)

    def send_email(self, json: dict) -> Tuple[Dict[str, str], int]:
        """
        Send an email through the Nylas API.
        See: https://docs.nylas.com/reference#sending-directly
        """
        return self._call_api_endpoint('send', POST_METHOD, json=json)
