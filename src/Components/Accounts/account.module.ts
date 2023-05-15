import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './Schemas/role.schema';
import { Account, AccountSchema } from './Schemas/account.schema';
import { AccountsController } from './account.controller';
import { AccountService, AddressService, RoleService } from './account.service';
import { Address, AddressSchema } from './Schemas/address.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: Account.name, schema: AccountSchema },
      { name: Address.name, schema: AddressSchema },
    ]),
  ],
  controllers: [AccountsController],
  providers: [RoleService, AccountService, AddressService],
})
export class AccountModule {}
