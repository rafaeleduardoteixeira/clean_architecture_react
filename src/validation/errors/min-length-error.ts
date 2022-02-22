export class InvalidMinLength extends Error {
  constructor(fieldName: string, minLenght: number) {
    super(`O campo ${fieldName} deve conter mais de ${minLenght} caracteres.`)
  }
}
