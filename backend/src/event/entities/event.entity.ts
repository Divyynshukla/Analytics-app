import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    projectId: number;

    @Column()
    eventName: string;

    @Column()
    projIdHash: string;

    @Column('simple-json', { nullable: true })
    metaData?: any;

    @CreateDateColumn()
    createdAt: Date;

}
