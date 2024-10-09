import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

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
    @Column()
    user_id: number
    @Column({ type: "timestamptz" })
    created: Date
}