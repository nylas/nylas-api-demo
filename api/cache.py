from abc import ABCMeta
from typing import Any, Dict, List, Optional

from expiringdict import ExpiringDict

MAX_AGE = 60 * 60 * 2  # 2 hours

ITEM_KEY = 'item_data'
REFRESH_KEY = 'needs_refresh'


class BaseCache(metaclass=ABCMeta):

    def __init__(self, max_len: int, max_age_seconds: int) -> None:
        self.cache = ExpiringDict(max_len=max_len,
                                  max_age_seconds=max_age_seconds)  # type: ExpiringDict[str, Dict[str, Any]]

    def add(self, item_id: str, item: Any) -> None:
        """Add an item to cache"""
        self.cache[item_id] = {ITEM_KEY: item,
                               REFRESH_KEY: False}

    def get(self, item_id: str) -> Any:
        """Get item from cache, if existing"""
        if item_id in self.cache:
            return self.cache[item_id][ITEM_KEY]
        return None

    def get_if_fresh(self, item_id: str) -> Any:
        """Get item from cache, if existing and REFRESH_KEY is False"""
        if item_id in self.cache and self.cache[item_id][REFRESH_KEY] is False:
            return self.cache[item_id][ITEM_KEY]
        return None

    def set_refresh(self, item_id: str) -> None:
        """Set REFRESH_KEY to True if item_id in cache"""
        if item_id in self.cache:
            self.cache[item_id][REFRESH_KEY] = True
        return None

    def update(self, item_id: str, item: Any) -> None:
        """Update item if item_id in cache"""
        if item_id in self.cache:
            self.cache[item_id] = {ITEM_KEY: item,
                                   REFRESH_KEY: False}
        return None


class ObjectCache(BaseCache):
    """Caches objects"""

    def add(self, item_id: str, item: Dict[str, Any]) -> None:
        return super().add(item_id, item)

    def get(self, item_id: str) -> Optional[Dict[str, Any]]:
        return super().get(item_id)

    def get_if_fresh(self, item_id: str) -> Optional[Dict[str, Any]]:
        return super().get_if_fresh(item_id)

    def update(self, item_id: str, item: Dict[str, Any]) -> None:
        return super().update(item_id, item)


class ObjectListCache(BaseCache):
    """Caches lists of objects. Initialized with a single object."""

    def add(self, item_id: str, item: Dict[str, Any]) -> None:
        return super().add(item_id, [item])

    def get(self, item_id: str) -> Optional[List[Dict[str, Any]]]:
        return super().get(item_id)

    def get_if_fresh(self, item_id: str) -> Optional[List[Dict[str, Any]]]:
        return super().get_if_fresh(item_id)

    def update(self, item_id: str, item: List[Dict[str, Any]]) -> None:
        return super().update(item_id, item)
