export interface IPasswordService {
  hash: (password: string) => Promise<string>
  verify: (hashedPassword: string, password: string) => Promise<boolean>
}
