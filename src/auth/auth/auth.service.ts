import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

interface User {
    id: number;
    username: string;
    password: string;
    role: string;
}

const users: User[] = [
    {
        id: 1,
        username: 'Melqui',
        password: '$2b$10$Xx.XsK4a9E/tKABsl.KwMOxC6Fix7TPc4Ib6xhCe8ayh1SCrSAgpm',
        role: 'admin'
    },
    {
        id: 2,
        username: 'Melqui2',
        password: '$2b$10$Xx.XsK4a9E/tKABsl.KwMOxC6Fix7TPc4Ib6xhCe8ayh1SCrSAgpm',
        role: 'user'
    },
    {
        id: 3,
        username: 'Melqui3',
        password: '$2b$10$Xx.XsK4a9E/tKABsl.KwMOxC6Fix7TPc4Ib6xhCe8ayh1SCrSAgpm',
        role: 'user'
    }
]

interface RequestProps {
    username: string;
    password: string;
}

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    private validateUser({ username, password }: RequestProps): User {
        const userExists = users.find(user => user.username === username)

        if (!userExists)
            throw new Error('user not found!')

        const validatePassword = bcrypt.compareSync(userExists.password, password)

        if (!validatePassword)
            throw new Error('Credentios not match !')

        return userExists
    }

    login({ username, password }: RequestProps) {

        try {
            const { id, username: name, role } = this.validateUser({ username, password })

            const payload = {
                sub: id,
                username: name,
                role
            }

            return this.jwtService.sign(payload)
        } catch (err) {
            throw new Error(err.message)
        }


    }
}
