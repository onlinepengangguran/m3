declare module "node-cache" {
  export default class NodeCache {
    constructor(options?: {
      stdTTL?: number
      checkperiod?: number
      useClones?: boolean
    })

    set(key: string, value: any, ttl?: number): boolean
    get(key: string): any
    del(key: string): number
    flushAll(): void
    keys(): string[]
    getStats(): {
      hits: number
      misses: number
      keys: number
      size: number
    }
  }
}

