import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/Base/AbstractService.base';
import { Role } from './Schemas/role.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from './Schemas/account.schema';

@Injectable()
export class RoleService extends BaseService<Role> {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {
    super(roleModel);
  }
}

@Injectable()
export class AccountService extends BaseService<Account> {
  constructor(@InjectModel(Account.name) private accountModel: Model<Account>) {
    super(accountModel);
  }
}
