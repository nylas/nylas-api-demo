import hashlib
import hmac
from typing import Union


def verify_signature(message: Union[bytes, bytearray, None], key: Union[bytes, bytearray], signature: str) -> bool:
    """Used to authenticate the header signature Nylas sends in webhooks."""
    digest = hmac.new(key, msg=message, digestmod=hashlib.sha256).hexdigest()
    return digest == signature
