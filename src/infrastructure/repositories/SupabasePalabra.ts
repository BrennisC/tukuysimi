import { CreatePalabraRequest, Palabra, UpdatePalabraRequest } from "@/domain/entities/Palabra";
import { PalabraRepository } from "@/domain/repositories/PalabraRepository";
import { supabase } from "../database/supabase";

export class SupabasePalabra implements PalabraRepository {
    async findById(id: number): Promise<Palabra | null> {
        const { data, error } = await supabase
            .from('palabras')
            .select('*')
            .eq('id', id)
            .single();


        if (error || !data) return null;
        return {
            id: data.id,
            palabra: data.palabra,
            nombre: data.nombre,
            codigo_iso: data.codigo_iso,
            region: data.region,
            descripcion: data.descripcion,
            created_at: new Date(data.created_at)
        };
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