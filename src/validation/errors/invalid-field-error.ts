export class InvalidFielError extends Error {
  constructor(fieldName: string) {
    super(`O campo ${fieldName} inválido.`)
  }
}
