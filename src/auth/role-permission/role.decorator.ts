import { SetMetadata } from "@nestjs/common";

export function Role(role: string) {
    return SetMetadata('role', role)
}