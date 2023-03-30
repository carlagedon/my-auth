import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatesAt: Date

  @Column()
  email: string

  @Column({unique: true})
  username: string
  
  @Column()
  password: string

  @Column()
  lastName: string
}
