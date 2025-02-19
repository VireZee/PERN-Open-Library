import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('collection')
export default class Book {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    collection_id: number
    @Column({ type: "bigint" })
    user_id: number
    @Column({ type: 'varchar', array: true })
    author_key: string[]
    @Column()
    cover_edition_key: string
    @Column({ type: "int" })
    cover_i: number
    @Column()
    title: string
    @Column()
    author_name: string
    @Column({ type: "timestamptz" })
    created: Date
}