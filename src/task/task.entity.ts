import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() //se non mettiamo nulla prende ilnome della classe
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  completed: boolean;
}