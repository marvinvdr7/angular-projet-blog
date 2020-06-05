export interface User {
    id: number;
    username: string;
    lastname: string;
    firstname: string;
    email: string;
    image: string;
    birthdate: Date;
    userRoles: string[];
    authorities: string[];
}