import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';

@Injectable()
export class UserService {
  private alphabetKey = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890+*é-.,<>@#:;?ì^';
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
  }

  hashingPassword(password: string) {

    const arr = password.split('');
    let hash = "";
    for (let i = 0; i < arr.length; i++) {
      const char = arr[i];
      const index = this.alphabetKey.indexOf(char);
      if (index) {
        hash += String(index);
      }
    }
    return hash;
  }

  async create(createUserDto: CreateUserDto) {
    const password = createUserDto.password;
    const hashPass = this.hashingPassword(password);
    createUserDto.password = hashPass;
    console.log(hashPass);
    const user = await this.userRepository.save(createUserDto);
    return user;
  }

  async findAll() {
    const users = await this.userRepository.find(
      {
        select: ["name", "surname", "email"]
      }
    );
    return users;
  }

  async findOne(userId: number) {
    const singleUser = await this.userRepository.findOne(
      {
        where: {
          id: userId
        },
        select: ["name", "surname", "email"] //cosi selezioniamo solo i campi desiderati 
      }
    );
    return singleUser;
  }

  update(userId: number, updateUserDto: UpdateUserDto) {
    this.userRepository.update(
      {
        id: userId
      },
      updateUserDto
    );
  }

  remove(id: number) {
    this.userRepository.delete(id);
  }

  async logIn(email: string, password: string) {
    const user = await this.userRepository.findOne(
      {
        where: {
          email: email
        }
      }

    );
    if (this.hashingPassword(password) === user.password) {
      console.log(`sei riuscito a fare il login, benvenuto ${email}`);

    } else {
      throw new HttpException('email o password sbagliate', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
