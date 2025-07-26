import { CreatePalabraRequest, Palabra, UpdatePalabraRequest } from "@/domain/entities/Palabra";
import { PalabraRepository } from "@/domain/repositories/PalabraRepository";

export class SupabasePalabra implements PalabraRepository {
    findById(id: number): Promise<Palabra | null> {
        throw new Error("Method not implemented.");
    }
    findByPalabra(palabra: string): Promise<Palabra | null> {
        throw new Error("Method not implemented.");
    }
    create(palabra: CreatePalabraRequest): Promise<Palabra> {
        throw new Error("Method not implemented.");
    }
    update(id: number, palabra: UpdatePalabraRequest): Promise<Palabra> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Palabra[]> {
        throw new Error("Method not implemented.");
    }
}   