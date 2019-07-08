import { IBaseEntity } from './IBaseEntity';

export interface IUser extends IBaseEntity {
    userName: string;
    password: string;
    email: string;
    phone: string;
    adress: string;
    adress2: string;
    zip: string;
    city: number;
    state: number;
    country: number;
}
