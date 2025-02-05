// interface IUser {
//     id: number;
//     name: string;
// }

// // declare global {
// //     namespace Express {
// //         interface Request {
// //             user?: IUser; 
// //         }
// //     }
// // }


// export interface AuthRequest extends Request {
//     user?: IUser;
// }


import { Request } from "express";
import { UserRoles } from "../shared/enum/user.enum";

export interface IUser {
    id: number;
    name: string;
    role:UserRoles
}

export interface AuthRequest extends Request {
    user?: IUser;
}
