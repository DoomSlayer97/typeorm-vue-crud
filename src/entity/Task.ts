import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, JoinColumn} from "typeorm";
import { Project } from "./Project"
import { User } from "./User"

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => Project, project => project.tasks)
    project: Project;

    @ManyToMany(type => User, user => user.tasks)
    @JoinTable()
    users: User[];

}