import { IBaseEntity } from './IBaseEntity';

export interface ICity extends IBaseEntity {
    description: string;
    countryCode: string; 
    lat: string;
    lng: string;
}
