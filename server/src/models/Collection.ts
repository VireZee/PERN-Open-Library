import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('collection')
export default class Book {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    collection_id: number
    @Column({ type: "bigint" })
    user_id: number
    @Column()
    cover_i: string
    @Column()
    isbn: string
    @Column()
    title: string
    @Column()
    author: string
    @Column({ type: "timestamptz" })
    created: Date
}