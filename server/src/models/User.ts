import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity("User")
export default class User {
    @PrimaryGeneratedColumn({ type: "bigint" })
    user_id: number;
    @Column({ type: "bytea", nullable: true })
    photo: Buffer;
    @Column({ length: 30 })
    name: string;
    @Column({ length: 20 })
    @Index({ unique: true })
    username: string;
    @Column()
    @Index({ unique: true })
    email: string;
    @Column()
    pass: string;
    @Column({ type: "timestamptz" })
    created: Date;
    @Column({ type: "timestamptz", nullable: true })
    updated: Date;
}