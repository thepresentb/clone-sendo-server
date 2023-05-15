import { AccountService, AddressService, RoleService } from './account.service';
import { Body, Controller, Post, Req, Get } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { ResponseBuilder } from 'src/Utils/ResponseBuilder';
import { ResponseCodeEnum } from 'src/constant/responseCode.enum';
import { Secret, sign, verify } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { ResponsePayload } from 'src/Utils/ResponsePayload';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { CreateAddressDto } from './dto/createAddress.dto';
import { ObjectId } from 'mongoose';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly roleService: RoleService,
    private readonly accountService: AccountService,
    private readonly addressService: AddressService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<ResponsePayload> {
    try {
      if (registerDto.username.length < 6) {
        return new ResponseBuilder()
          .withCode(ResponseCodeEnum.BAD_REQUEST)
          .withMessage('Username must be at least 6 characters long!!!')
          .build();
      }

      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(registerDto.email)
      ) {
        return new ResponseBuilder()
          .withCode(ResponseCodeEnum.BAD_REQUEST)
          .withMessage('You have entered an invalid email address!!!')
          .build();
      }

      if (!(await this.roleService.findOne({ _id: registerDto.roleId }))) {
        return new ResponseBuilder()
          .withCode(ResponseCodeEnum.BAD_REQUEST)
          .withMessage('roleId not found')
          .build();
      }

      const existingUser =
        (await this.accountService.findOne({
          username: registerDto.username,
        })) ||
        (await this.accountService.findOne({ email: registerDto.email }));
      if (existingUser) {
        return new ResponseBuilder()
          .withCode(ResponseCodeEnum.BAD_REQUEST)
          .withMessage(
            `${
              existingUser.username === registerDto.username
                ? 'username'
                : 'email'
            } already exists!!!`,
          )
          .build();
      }

      const hashPassword = await bcrypt.hash(registerDto.password, 10);

      const newUser = await this.accountService.create({
        username: registerDto.username,
        email: registerDto.email,
        password: hashPassword,
        roleId: registerDto.roleId,
      });

      const { password, ...resUser } = newUser['_doc'];

      const accessToken = sign(
        { _id: newUser._id },
        process.env.ACCESS_TOKEN_KEY as Secret,
        {
          expiresIn: '1h',
        },
      );

      return new ResponseBuilder({
        accessToken,
        user: resUser,
      }).build();
    } catch (err) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.BAD_REQUEST)
        .withMessage(err.message)
        .build();
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ResponsePayload> {
    try {
      const existingUser = await this.accountService.findOne({
        email: loginDto.email,
      });
      if (!existingUser) {
        return new ResponseBuilder()
          .withCode(ResponseCodeEnum.BAD_REQUEST)
          .withMessage('username or password incorrect')
          .build();
      }

      if (!(await bcrypt.compare(loginDto.password, existingUser.password))) {
        return new ResponseBuilder()
          .withCode(ResponseCodeEnum.BAD_REQUEST)
          .withMessage('username or password incorrect')
          .build();
      }

      const { password, ...resUser } = existingUser['_doc'];

      const accessToken = sign(
        { _id: existingUser._id },
        process.env.ACCESS_TOKEN_KEY as Secret,
        {
          expiresIn: '1h',
        },
      );

      return new ResponseBuilder({
        accessToken,
        user: resUser,
      }).build();
    } catch (err) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.BAD_REQUEST)
        .withMessage(err.message)
        .build();
    }
  }

  @Get('refresh')
  async refresh(@Req() request: Request): Promise<ResponsePayload> {
    try {
      const accessToken = request.headers.authorization.split(' ')[1];
      const decoded = await verify(
        accessToken,
        process.env.ACCESS_TOKEN_KEY as Secret,
      );
      const user = await this.accountService.findOne({ _id: decoded._id });
      const { password, ...resUser } = user['_doc'];
      return new ResponseBuilder(resUser).build();
    } catch (err) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.BAD_REQUEST)
        .withMessage(err.message)
        .build();
    }
  }

  @Post('find_address_by_accountId')
  async getAddress(@Body() { accountId }: { accountId: ObjectId }) {
    try {
      const addressList = await this.addressService.find({
        accountId: accountId,
      });
      return new ResponseBuilder(addressList).build();
    } catch (err) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.BAD_REQUEST)
        .withMessage(err.message)
        .build();
    }
  }

  @Post('create_address')
  async createAddress(@Body() createAddressDto: CreateAddressDto) {
    try {
      const addressList = await this.addressService.find({
        accountId: createAddressDto.accountId,
      });
      if (createAddressDto?.isDefault) {
        for (const address of addressList) {
          await this.addressService.update(
            { _id: address._id },
            { isDefault: false },
          );
        }
        const newAddress = await this.addressService.create(createAddressDto);
        return new ResponseBuilder([...addressList, newAddress]).build();
      } else {
        const newAddress = await this.addressService.create({
          ...createAddressDto,
          isDefault: addressList.length === 0 ? true : false,
        });
        return new ResponseBuilder([...addressList, newAddress]).build();
      }
    } catch (err) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.BAD_REQUEST)
        .withMessage(err.message)
        .build();
    }
  }
}
