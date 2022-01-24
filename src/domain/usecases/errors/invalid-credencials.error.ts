export class InvalidCredentialsError extends Error {
  constructor() {
    super('Erro inexperado.')
    this.name = 'UnecpectedError'
  }
}
