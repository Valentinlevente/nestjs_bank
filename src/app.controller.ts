/* eslint-disable prettier/prettier */
import { Patch } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { AppService } from './app.service';
import AccountDto from './dtos/account.dto';
import OwnerDto from './dtos/owner.dto';
import TransitionDto from './dtos/transition.dto';
import { Account } from './entities/account.entity';
import { Owner } from './entities/owner.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }

  @Post('account/create')
  async createAccount(@Body() AccountDto: AccountDto) {
    const accountRepo = this.dataSource.getRepository(Account);
    const account = new Account();
    account.accountNumber = AccountDto.accountNumber;
    account.balance = AccountDto.balance;
    account.owner = AccountDto.owner;
    return await accountRepo.save(account);
  }

  @Get('accounts')
  getAllAccounts() {
    const accountRepo = this.dataSource.getRepository(Account);
    return accountRepo.find();
  }

  @Get('accounts/get/:id')
  getAccountById(@Param('id') id: number) {
    const accountRepo = this.dataSource.getRepository(Account);
    return accountRepo.findOneBy({ id: id });
  }

  @Patch('accounts/update/:id')
  async updateAccountById(@Param('id') id: number, @Body() AccountDto: AccountDto) {
    const accountRepo = this.dataSource.getRepository(Account);
    const account = await accountRepo.findOneBy({ id: id });
    account.accountNumber = AccountDto.accountNumber;
    account.balance = AccountDto.balance;
    account.owner = AccountDto.owner;

    return accountRepo.save(account);
  }

  @Delete('accounts/delete/:id')
  async removeAccountById(@Param('id') id: number) {
    const accountRepo = this.dataSource.getRepository(Account);
    const account = await accountRepo.findOneBy({ id: id })
    return accountRepo.delete(account);
  }

  @Post('owner/create')
  async createOwner(@Body() OwnerDto: OwnerDto) {
    const ownerRepo = this.dataSource.getRepository(Owner);
    const owner = new Owner();
    owner.fullName = OwnerDto.fullName;
    owner.business = OwnerDto.business;
    return await ownerRepo.save(owner);
  }

  @Get('owners')
  getAllOwners() {
    const accountRepo = this.dataSource.getRepository(Owner);
    return accountRepo.find();
  }

  @Get('owners/get/:id')
  getOwnerById(@Param('id') id: number) {
    const accountRepo = this.dataSource.getRepository(Owner);
    return accountRepo.findOneBy({ id: id });
  }

  @Patch('owners/update/:id')
  async updateOwnerById(@Param('id') id: number, @Body() OwnerDto: OwnerDto) {
    const ownerRepo = this.dataSource.getRepository(Owner);
    const owner = await ownerRepo.findOneBy({ id: id });
    owner.fullName = OwnerDto.fullName;
    owner.business = OwnerDto.business;

    return ownerRepo.save(owner);
  }

  @Delete('owners/delete/:id')
  async removeOwnerById(@Param('id') id: number) {
    const accountRepo = this.dataSource.getRepository(Owner);
    const account = await accountRepo.findOneBy({ id: id })
    return accountRepo.delete(account);
  }

  @Post('transfer/:sourceId/:targetId')
  async transfer(@Param('sourceId') sourceId : number, @Param('targetId') targetId : number, @Body() TransitionDto: TransitionDto, ){
    const accountRepo = this.dataSource.getRepository(Account);
    const amount: number = TransitionDto.amount; 
    const sourceAccount =  await accountRepo.findOneBy({id: sourceId}); 
    const targetAccount =  await accountRepo.findOneBy({id: targetId});
      if(sourceAccount == null) {
        throw new NotFoundException();
      }

      if((sourceAccount.balance -= amount) < 0){
        throw new ConflictException();
      }
    sourceAccount.balance -= amount;
    targetAccount.balance += amount;
    accountRepo.save(sourceAccount);
    accountRepo.save(targetAccount);

  }

}
