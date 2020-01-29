import { IState } from './../IState';
import { ICountry } from './../ICountry';
import { ICity } from './../ICity';
export interface IUpdateUserDto {
    id: number,
    introduction: string,
    lookingFor: string,
    interests: string,
    State: IState,
    City: ICity,
    Country: ICountry
}

