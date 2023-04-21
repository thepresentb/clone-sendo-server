import { ResponseCodeEnum } from 'src/constant/responseCode.enum';

export interface ResponsePayload {
  statusCode: ResponseCodeEnum;
  message?: string;
  data?: any;
}
