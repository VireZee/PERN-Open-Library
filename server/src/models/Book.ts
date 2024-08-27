import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import User from './User'

@Entity('Book')
export default class Book {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    book_id: number
    @Column({ nullable: true })
    cover_i: number
    @Column()
    title: string
    @Column({ nullable: true })
    author: string
    @ManyToOne(() => User, user => user.books)
    user: User
}