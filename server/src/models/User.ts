import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm'

@Entity("user")
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
    @Column()
    @Index({ unique: true })
    email: string
    @Column()
    pass: string
    @Column()
    api_key: string
    @Column({ type: "timestamptz" })
    created: Date
    @Column({ type: "timestamptz", nullable: true })
    updated: Date
}