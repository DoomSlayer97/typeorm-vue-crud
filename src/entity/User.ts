import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany} from "typeorm";
import { Project } from "./Project"
import { Task } from "./Task"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    birthday: string;

    @OneToMany(type => Project, project => project.user)
    projects: Project[]; 

    @ManyToMany(type => Task, task => task.users)
    tasks: Task[];

}
