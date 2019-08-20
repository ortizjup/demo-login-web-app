import { ICountry } from '../ICountry';
import { ICity } from '../ICity';
import { IState } from '../IState';

export interface IRegisterUser {
    userName: string;
    password: string;
    email: string;
    phone: string;
    adress: string;
    adress2: string;
    country: ICountry;
    city: ICity;
    state: IState;
    zip: string;
}
