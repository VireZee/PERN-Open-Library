import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm'
import User from './User'

@Entity('book')
export default class Book {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    book_id: number
    @Column({ nullable: true })
    cover_i: number
    @Column()
    title: string
    @Column({ nullable: true })
    author: string
    @Column({ unique: true })
    isbn: string
    @ManyToMany(() => User)
    @JoinTable({
        name: 'user_books',
        joinColumn: {
            name: 'book_id',
            referencedColumnName: 'book_id'
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'user_id'
        }
    })
    users: User[]
    @Column({ type: "timestamptz" })
    created: Date
}