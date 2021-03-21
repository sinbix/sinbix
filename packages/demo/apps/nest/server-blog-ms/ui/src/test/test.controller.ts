import { validator } from '@sinbix-common/validator';
import { Body, Controller } from '@sinbix-nest/common';
import { MessagePattern, RpcValidator } from '@sinbix-nest/microservices';
import { from, of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

@Controller()
export class TestController {
  constructor() {}

  @MessagePattern('testArray')
  array(@Body() arr: any[]) {
    return from(arr).pipe(concatMap((val) => of(val).pipe(delay(1000))));
  }

  @RpcValidator(validator.array().max(1))
  @MessagePattern('testArrayValidator')
  testValidator(@Body() arr: any[]) {
    return this.array(arr);
  }

  @RpcValidator(
    validator
      .object({
        data: validator.object().required(),
      })
      .required()
  )
  @MessagePattern('validatorMs')
  validatorMs(@Body() args) {
    return 'response';
  }
}
