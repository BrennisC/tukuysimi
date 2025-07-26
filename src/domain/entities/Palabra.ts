export interface Palabra {
    id: number
    palabra: string
    nombre: string
    codigo_iso: string
    region: string
    descripcion: string
    created_at?: string
}

export interface CreatePalabraRequest {
    palabra: string
    nombre: string
    codigo_iso: string
    region: string
    descripcion: string
    created_at?: string
}

export interface UpdatePalabraRequest {
    nombre?: string
    codigo_iso?: string
    region?: string
    descripcion?: string
    created_at?: string
}
