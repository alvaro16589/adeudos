export interface Job {
    id: number;
    title: string;
    detail: string;
    date: string;
    price: number;
    idtype: number;
    iduser: number;
    idstate: number;
    created_at: string;
    updated_at: string;
    type: string;
    name: string;
    lastname: string;
    state: string;

}
export interface SaveJob {
    title: string;
    detail: string;
    date: string;
    price: number;
    idtype: number;
    iduser: number;
    idstate: number;
}