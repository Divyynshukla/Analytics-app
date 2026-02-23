import { randomUUID } from "crypto";
import { User } from "src/user/entities/user.entity";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from "typeorm";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true, nullable:true})
  projIdHash: string;

  @Column()
  name: string;

  @Column({unique: true})
  url: string;

  @Column({ unique: true })
  apiKey: string;

  @ManyToOne(() => User, (user) => user.projects, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userHash: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  generateUserHash() {
    this.projIdHash = randomUUID();
  }

}
