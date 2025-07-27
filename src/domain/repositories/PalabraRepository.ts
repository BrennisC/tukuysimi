import { CreatePalabraRequest, Palabra, UpdatePalabraRequest } from "@domain/entities/Palabra";

export interface PalabraRepository {
    findById(id: number): Promise<Palabra | null>;
    findByPalabra(palabra: string): Promise<Palabra | null>;
    create(palabra: CreatePalabraRequest): Promise<Palabra>;
    update(id: number, palabra: UpdatePalabraRequest): Promise<Palabra>;
    delete(id: number): Promise<boolean>;
    findAll(): Promise<Palabra[]>;
}

