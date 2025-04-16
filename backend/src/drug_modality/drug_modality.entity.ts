import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class DrugModality {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true, type: 'longtext' })
    description: string;

    @CreateDateColumn()
    createdon: Date;

    @UpdateDateColumn()
    updatedon: Date;
}