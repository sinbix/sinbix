import {
  ArgumentsHost,
  BadRequestException,
  Body,
  Catch,
  Controller,
  ExceptionFilter,
  Get,
  HttpException,
  Inject,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { HttpValidator, validator } from '@sinbix-nest/validator';
import { GameService } from '@sinbix/demo/apps/nest/server/services';
import { AUTH_CLIENT } from '@sinbix/demo/apps/nest/server/utils';
import {
  IAuthToken,
  ISigninArgs,
  ISigninGateway,
} from '@sinbix/demo/apps/shared/utils';
import { timeout } from 'rxjs/operators';

@Controller()
export class GameController implements ISigninGateway {
  constructor(
    private gameService: GameService,
    @Inject(AUTH_CLIENT) private readonly authClient: ClientProxy
  ) {}

  @Get('games')
  games() {
    return this.gameService.games();
  }

  // These points exist only for test validator work

  @Post('signIn')
  signin(@Body() args: ISigninArgs): Promise<IAuthToken> {
    return this.authClient
      .send('signin', args ?? {})
      .pipe(timeout(5000))
      .toPromise()
      .catch((err) => {
        throw new BadRequestException(err.message);
      });
  }

  @Get('validator')
  @HttpValidator({
    demo: validator.string().min(2),
  })
  getValidatorTest(@Query() args) {
    console.log(args, 'valid');
  }

  @Post('validator')
  @HttpValidator({
    demo: validator.string().min(2),
  })
  postTest(@Body() args) {
    console.log(args, 'valid');
  }
}
