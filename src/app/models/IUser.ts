import { ICountry } from './ICountry';
import { IState } from './IState';
import { ICity } from './ICity';
import { IBaseEntity } from './IBaseEntity';
import { IPhoto } from './IPhoto';

export interface IUser extends IBaseEntity {
    userName: string;
    password?:string;
    gender: string; 
    interests: string;
    age: number;
    knownAs: string;
    created: Date;
    lastActived: Date;
    introduction?: string; 
    lookingFor?: string;
    email: string;
    phone: string;
    adress: string;
    adress2: string;
    zip: string;
    photoUrl: string;
    city: ICity;
    state: IState;
    country?: ICountry;
    photos?: IPhoto[];
}
