import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("User")
export default class User {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;
    @Column({ type: "bytea", nullable: true })
    photo: Buffer;
    @Column({ length: 30 })
    name: string;
    @Column({ length: 10 })
    username: string;
    @Column()
    email: string;
    @Column()
    pass: string;
}