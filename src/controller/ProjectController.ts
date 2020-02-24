import {getRepository, getManager, Repository, EntityManager, ReplSet} from "typeorm"
import {NextFunction, Request, Response, response} from "express"
import  * as validator  from 'validatorjs'
import {Project}  from "../entity/Project"
import { User } from "../entity/User"

export class ProjectController {

    private projectRepository = getRepository(Project);
    private userRepository = getRepository(User);
    private manager = getManager();

    async findByUser(req: Request, res: Response) {

        let findedUser = await this.userRepository.findOne(req.params.iduser);

        let projects = await this.manager.find(Project,{
            where: { user: findedUser }
        });

        if(projects.length <= 0) return res.status(200).json({
            message: 'Este usuario no tiene proyectos'
        });

        return res.status(200).json({
            projects
        });

    }

    async findOne(req: Request, res: Response) {

        let findedProject = await this.projectRepository.findOne(req.params.id);

        if(!findedProject) return res.status(404).json({
            message: 'project not founded'
        });

        return res.status(200).json({
            project: findedProject
        });

    }

    async create(req: Request, res: Response) {
        
        let reqParams = req.body;
        
        let validation = new validator(reqParams ,{
            name: 'required',
            description: 'required',
            idUser: 'required'
        });
        
        if(validation.fails()) return res.status(500).json({
            message: 'Validation error',
            errors: validation.errors.errors
        });
        
        let user = await this.manager.findOne(User, req.body.idUser);
        let newProject = new Project();
        
        newProject.name = req.body.name;
        newProject.description = req.body.description;
        newProject.user = user;
        
        let createdProject = await this.manager.save(newProject);
        
        if(!createdProject) return res.status(404).json({
            message: 'Error al crear'
        });

        return res.status(200).json({
            message: 'project creado',
            createdProject
        });

    }
    
    async delete(req: Request, res: Response) {

        let id = req.params.id;

        if(!id) return res.status(404).json({
            message: 'Parametro no recibido'
        });

        let deletedProject = await this.manager.delete(Project, id);

        if(!deletedProject) return res.status(500).json({
            message: 'Error al eliminar'
        });

        return res.status(200).json({
            message: 'Eliminado'
        });

    }

}
