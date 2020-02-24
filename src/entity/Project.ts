import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable} from "typeorm";
import { User } from "./User"
import { Task } from './Task'


@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(type => User, user => user.projects)
    user: User;

    @OneToMany(type => Task, task => task.project)
    tasks: Task[];
    
}