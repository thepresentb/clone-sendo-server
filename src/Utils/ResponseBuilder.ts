import { ResponseCodeEnum } from 'src/constant/responseCode.enum';
import { ResponsePayload } from './ResponsePayload';
import { ErrorMessageEnum } from 'src/constant/errorMessage.enum';

export class ResponseBuilder {
  private payload: ResponsePayload = {
    statusCode: ResponseCodeEnum.SUCCESS,
  };

  constructor(data?: any) {
    if (data) {
      this.payload.data = data;
    }
  }

  withCode(code: ResponseCodeEnum, withMessage = true): ResponseBuilder {
    this.payload.statusCode = code;
    if (withMessage) {
      this.payload.message = ErrorMessageEnum[ResponseCodeEnum[code]];
    }

    return this;
  }

  withMessage(message: string): ResponseBuilder {
    this.payload.message = message;
    return this;
  }

  withData(data: any): ResponseBuilder {
    this.payload.data = data;
    return this;
  }

  build(): ResponsePayload {
    return this.payload;
  }
}
