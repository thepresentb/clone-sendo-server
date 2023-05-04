import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './Schemas/role.schema';
import { Account, AccountSchema } from './Schemas/account.schema';
import { AccountsController } from './account.controller';
import { AccountService, RoleService } from './account.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: Account.name, schema: AccountSchema },
    ]),
  ],
  controllers: [AccountsController],
  providers: [RoleService, AccountService],
})
export class AccountModule {}
