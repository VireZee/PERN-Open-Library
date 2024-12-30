import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('collection')
export default class Book {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    collection_id: number
    @Column({ type: "bigint" })
    user_id: number
    @Column({ unique: true })
    isbn: string
    @Column({ nullable: true })
    @Column({ type: "timestamptz" })
    created: Date
}