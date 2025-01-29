import NodeCache from 'node-cache';
import ICache from '../../../config/cache.interface';

export default class NodeCacheAdapter implements ICache {
  private cache: NodeCache;

  constructor(options?: NodeCache.Options) {
    this.cache = new NodeCache(options);
  }

  async get<T>(key: string): Promise<T | null> {
    const value = this.cache.get<T>(key);
    return value || null;
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<boolean> {
    if (ttl) {
      return this.cache.set(key, value, ttl);
    } else {
      return this.cache.set(key, value);
    }
  }

  async delete(key: string): Promise<void> {
    this.cache.del(key);
  }

  async clear(): Promise<void> {
    this.cache.flushAll();
  }

  async has(key: string): Promise<boolean> {
    return this.cache.has(key);
  }
}
