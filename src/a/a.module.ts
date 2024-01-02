import { Module } from '@nestjs/common';
import { AService } from './a.service';
import { AController } from './a.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AController],
  providers: [AService],
})
export class AModule {}
