import {getRepository, getManager} from "typeorm"
import {NextFunction, Request, Response, response} from "express"
import { Task } from '../entity/Task'
import { Project } from '../entity/Project'

export class TaskController {

    private projectRepository = getRepository(Project);
    private taskRepository = getRepository(Task);
    private manager = getManager();

    async findByProject(req: Request, res: Response) {

        let findedProject = await this.projectRepository.findOne(req.body.idProject);

        let tasks = await this.manager.find(Project,{
            where: { tasks: findedProject }
        });

        if(tasks.length >= 0) return res.status(200).json({
            message: 'No se encontraron tasks'
        });

        return res.status(200).json({
            tasks
        });

    }

    async create(req: Request, res: Response) {

        let project = await this.manager.findOne(Project,req.body.idProject);

        let newTask = new Task();
        newTask.name = req.body.name;
        newTask.project = project;

        let createdTask = await this.taskRepository.save(newTask);

        if(!createdTask) return res.status(404).json({
            message: 'No se pudo crear el task'
        });

        return res.status(200).json({
            message: 'Task creado',
            createdTask
        });

    }

}