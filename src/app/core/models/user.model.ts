export interface User{
    id: number;
    name:string;
    lastname:string;
    nameac: string;
    idtype: number;
    idstate: number;
    email: string;
    email_verified_at: string;
    password: string;
    remember_token: string;
    created_at: string;
    updated_at: string;
    type: string;   
    state: string;
   
}

export interface saveUser{
    name:string;
    lastname:string;
    nameac: string;
    idtype: number;
    idstate: number;
    email: string;
    password: string;
}
export interface updateUser{
    id: number;
    name:string;
    lastname:string;
    nameac: string;
    idtype: number;
    idstate: number;
    email: string;
    password: string;
    
}