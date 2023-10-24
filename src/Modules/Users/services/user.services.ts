import env from "../../../Core/utils/env";
import {
    IUser,
    IUserDto,
    IUserRepository,
    IUserService
} from "../entity/user.entity";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class UserServices implements IUserService {

    constructor(private userRepository: IUserRepository) {}

    loginUser(user: IUser, password: string): Promise<IUser> {
        return new Promise(async (resolve, reject) => {
            try {
                const isMatch = bcrypt.compareSync(password, user.password);
                if (!isMatch) throw new Error("Invalid credentials");

                return resolve(user);
            }
            catch (error) {
                reject(error);
            }
        })
    }

    public async getUser(credential: string): Promise<IUser> {
       return new Promise(async (resolve, reject) => {
           try {
               const user = await this.userRepository.findUserById(credential);
               return resolve(user);
           } catch (error) {
               reject(error);
           }
       })
    }

    public async createUser(data: IUserDto): Promise<IUser> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await this.userRepository.create({
                    ...data,
                    password: bcrypt.hashSync(data.password, 10)
                });
                return resolve(user);
            } catch (error) {
                reject(error);
            }
        })
    }

    public async updateUser(id: string, data: Partial<IUserDto>): Promise<IUser> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await this.userRepository.update(id, data);
                return resolve(user);
            } catch (error) {
                reject(error);
            }
        })
    }


    public async generateAccessToken(user: IUser): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                const token = jwt.sign({ id: user.id, email: user.email}, env.ACCESS_TOKEN_SECRET, {
                    expiresIn: env.ACCESS_TOKEN_EXPIRY
                });
                return resolve(token);
            } catch (error) {
                reject(error);
            }
        })
    }




}