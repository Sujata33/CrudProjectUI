import { IBanks } from './banks';

export interface IBranches {
    id?: number,
    ref_code: string,
    name: string,
    ifsc: string,
    address: string,
    bank_id: number,

    created_at?: Date,
    updated_at?: Date

}