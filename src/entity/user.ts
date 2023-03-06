import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Index,
} from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId: number

    @Index({ unique: true })
    @Column({ type: 'varchar', width: 36 })
    username: string

    @Column({ type: 'varchar', width: 36 })
    password: string

    @Column({ type: 'varchar', width: 10 })
    salt?: string
}
