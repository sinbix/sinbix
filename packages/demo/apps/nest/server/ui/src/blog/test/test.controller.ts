import { validator } from '@sinbix-common/validator';
import {
  HttpValidator,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
} from '@sinbix-nest/common';
import { MsClient } from '@sinbix-nest/microservices';
import { BLOG_CLIENT } from '@sinbix/demo/apps/nest/server/utils';

@Controller('blog/test')
export class TestController {
  constructor(@Inject(BLOG_CLIENT) private readonly blogClient: MsClient) {}

  @Post('array')
  testArray(@Body() args) {
    this.blogClient.send('testArray', args).subscribe((item) => {
      console.log(item);
    });
  }

  @Post('array/validator-ms')
  testValidator(@Body() args) {
    const res = this.blogClient.send('testArrayValidator', args);

    res.subscribe(
      (next) => {
        console.log('next: ', next);
      },
      (error) => {
        console.log('res error: ', error);
      }
    );
  }

  @Post('validator-ms')
  validatorMs(@Body() args) {
    return this.blogClient.asyncSend('validatorMs', args);
  }

  @Post('not-exist-ms')
  notExistMs() {
    return this.blogClient.asyncSend('notExist');
  }

  @Get('validator')
  @HttpValidator(
    validator.object({
      demo: validator.string().min(2),
    })
  )
  getValidatorTest(@Query() args) {
    console.log(args, 'valid');
  }

  @Post('validator')
  @HttpValidator(
    validator.object({
      demo: validator.string().min(2).required(),
    })
  )
  postTest(@Body() args) {
    console.log(args, 'valid');
  }
}
