import { InvalidMinLength } from '@/validation/errors/min-length-error'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minLenght: number) {}
  validate(value: string): Error {
    return value.length >= this.minLenght
      ? null
      : new InvalidMinLength(this.field, this.minLenght)
  }
}
