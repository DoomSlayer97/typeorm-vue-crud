import {getRepository, getManager} from "typeorm"
import {NextFunction, Request, Response, response} from "express"
import {User} from "../entity/User"

export class UserController {
    
    private userRepository = getRepository(User);
    private manager = getManager();

    async getAll(req: Request, res: Response) {

        return await this.userRepository.find();

    }

    async findOne(req: Request, res: Response, next: NextFunction) {

        let id = req.params.id;

        let getUser = await this.userRepository.findOne(id);

        if(!getUser) return res.status(404).json({
            mensage: 'user no encontrado'
        });

        return res.status(200).json({
            user: getUser
        });

    }

    async crear(req: Request, res: Response) {

        let newUser = new User();
        
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.age = req.body.age;
        newUser.birthday = req.body.age;

        let createdUser = await this.userRepository.save(newUser);

        if(!createdUser) return res.status(404).json({
            message: 'Error al crear'
        });

        return res.status(200).json({
            message: 'Creado',
            user: createdUser
        });

    }

}