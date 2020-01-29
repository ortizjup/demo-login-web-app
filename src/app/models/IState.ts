import { IBaseEntity } from './IBaseEntity';

export interface IState extends IBaseEntity {
    description: string;
    stateCode: string;
}
