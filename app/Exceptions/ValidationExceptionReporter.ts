import {
  ValidationException,
  MessagesBagContract,
  ErrorReporterContract,
} from '@ioc:Adonis/Core/Validator'

interface ErrorNode {
  field: string
  message: string
}

interface ErrorBody {
  message: string
  validationErrors: ErrorNode[]
  code: string
}

export default class ValidationExceptionReporter implements ErrorReporterContract<ErrorBody> {
  public hasErrors = false
  protected errors: ErrorNode[] = []
  public static message: string = 'Seu formulário possui erros de validação'

  constructor(private messages: MessagesBagContract, private bail: boolean) {}

  public report(
    pointer: string,
    rule: string,
    message: string,
    arrayExpressionPointer?: string,
    args?: any
  ): void {
    this.hasErrors = true
    const errorMessage = this.messages.get(pointer, rule, message, arrayExpressionPointer, args)
    this.errors.push({ message: errorMessage, field: pointer })

    if (this.bail) {
      throw this.toError()
    }
  }

  public toError() {
    throw new ValidationException(false, this.toJSON())
  }

  public toJSON() {
    return {
      message: ValidationExceptionReporter.message,
      validationErrors: this.errors,
      code: 'E_VALIDATION_EXCEPTION',
    }
  }
}
