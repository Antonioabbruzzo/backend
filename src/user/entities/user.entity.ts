import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  surname: string;
  @Column()
  email: string;
  @Column()
  age: number;
  @Column()
  password: string;
}
