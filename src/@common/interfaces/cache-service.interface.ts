export interface ICacheService {
  set: (key: string, value: any, ttl: string) => Promise<any>
  get: (key: string) => Promise<any>
  del: (key: string) => Promise<any>
  exists: (key: string) => Promise<boolean>
}
