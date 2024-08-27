import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from 'typeorm'
import Book from './Book'

@Entity("User")
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
    @OneToMany(() => Book, book => book.user)
    books: Book[]
    @Column({ type: "timestamptz" })
    created: Date
    @Column({ type: "timestamptz", nullable: true })
    updated: Date
}