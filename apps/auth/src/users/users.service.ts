import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { UserDocument } from './models/user.schema'; 
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}


  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    await this.validateCreateUserDto(createUserDto);
    return this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password,10), 
    });
  }

  private async validateCreateUserDto(createUserDto: CreateUserDto){
    try{
      await this.usersRepository.findOne({email:createUserDto.email});
    }catch(err){
      return;
    }
    throw new UnprocessableEntityException('Email already exists')
  }
  async verifyUser(email: string, password: string): Promise<UserDocument> {
   
    const user = await this.usersRepository.findOne({ email });

  
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

  
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user; 
  }
  async getUser(getUserDto:GetUserDto){
    return this.usersRepository.findOne(getUserDto)
  }
}
