import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm'

@Entity('user')
export default class User {
    @PrimaryGeneratedColumn({ type: "bigint" })
    user_id: number
    @Column({ type: "bytea" })
    photo: Buffer
    @Column({ length: 75 })
    name: string
    @Column({ length: 20 })
    @Index({ unique: true })
    username: string
    @Column({ type: "varchar" })
    @Index({ unique: true })
    email: string
    @Column({ type: "varchar" })
    pass: string
    @Column({ type: "bytea", nullable: true })
    api_key: Buffer
    @Column({ type: "timestamptz", nullable: true })
    updated: Date
    @Column({ type: "timestamptz" })
    created: Date
}