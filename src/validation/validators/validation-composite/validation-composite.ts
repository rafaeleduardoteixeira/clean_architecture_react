import { Validation } from '@/presentation/protocols/validation'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class ValidationComposite implements Validation {
  constructor(private readonly validators: FieldValidation[]) {}
  validate(fieldName: string, value: string): string {
    this.validators.filter((validator) => validator.field === fieldName)
    for (const validator of this.validators) {
      const error = validator.validate(fieldName)
      if (error) {
        return error.message
      }
    }
  }
}
