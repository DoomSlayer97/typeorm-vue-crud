import {UserController} from "./controller/UserController";
import { ProjectController } from './controller/ProjectController';
import {TaskController} from './controller/TaskController'

export const Routes = [
    
    //rutas de la api de users
    {
        method: "get",
        route: "/users/find/:id",
        controller: UserController,
        action: "findOne"
    }, 
    {
        method: "get",
        route: "/users/all",
        controller: UserController,
        action: "getAll"
    }, 
    {
        method: "post",
        route: "/users",
        controller: UserController,
        action: "crear"
    },
    
    {
        method: "get",
        route: "/projects/all/:iduser",
        controller: ProjectController,
        action: "findByUser"
    },
    {
        method: "get",
        route: "/projects/findone/:id",
        controller: ProjectController,
        action: "findOne"
    },
    {
        method: "post",
        route: "/projects",
        controller: ProjectController,
        action: "create"
    },
    {
        method: 'delete',
        route: '/projects/:id',
        controller: ProjectController,
        action: "delete"
    },
    {
        method: "get",
        route: "/tasks/all/:idProject",
        controller: TaskController,
        action: "findByProject"
    },
    {
        method: "post",
        route: "/tasks",
        controller: TaskController,
        action: "create"
    }
];