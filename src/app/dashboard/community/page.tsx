'use client';

import Card from '@components/Card';
import LoadingSpinner from '@components/LoadingSpinner';
import Navigation from '@components/Navigation';
import { useAuth } from '@hooks/useAuth';
import { useState } from 'react';

interface NativeSpeaker {
    id: string;
    name: string;
    location: string;
    languages: string[];
    specialties: string[];
    rating: number;
    totalSessions: number;
    isOnline: boolean;
    avatar: string;
    bio: string;
    culturalBackground: string;
}

interface CommunityPost {
    id: string;
    author: string;
    authorAvatar: string;
    title: string;
    content: string;
    language: string;
    type: 'question' | 'cultural' | 'practice' | 'story';
    likes: number;
    comments: number;
    timeAgo: string;
    tags: string[];
}

interface LanguageExchange {
    id: string;
    title: string;
    organizer: string;
    date: string;
    time: string;
    participants: number;
    maxParticipants: number;
    language: string;
    level: string;
    type: 'conversation' | 'cultural' | 'storytelling' | 'music';
    icon: string;
}

export default function CommunityPage() {
    const { isLoading } = useAuth();
    const [activeTab, setActiveTab] = useState<'speakers' | 'posts' | 'events'>('speakers');

    if (isLoading) {
        return <LoadingSpinner message="Conectando con la comunidad..." />;
    }

    const nativeSpeakers: NativeSpeaker[] = [
        {
            id: '1',
            name: 'Mama Rosa Quispe',
            location: 'Cusco, Perú',
            languages: ['Quechua', 'Español'],
            specialties: ['Textilería', 'Medicina tradicional', 'Cuentos ancestrales'],
            rating: 4.9,
            totalSessions: 127,
            isOnline: true,
            avatar: '👵🏽',
            bio: 'Maestra tejedora con 40 años preservando tradiciones andinas.',
            culturalBackground: 'Comunidad de Pisaq, guardiana de sabidurías ancestrales'
        },
        {
            id: '2',
            name: 'Tayta Carlos Mamani',
            location: 'Puno, Perú',
            languages: ['Aymara', 'Quechua', 'Español'],
            specialties: ['Música andina', 'Instrumentos tradicionales', 'Danzas ceremoniales'],
            rating: 4.8,
            totalSessions: 89,
            isOnline: false,
            avatar: '👨🏽',
            bio: 'Músico y danzante, custodio de melodías del altiplano.',
            culturalBackground: 'Nación Aymara, especialista en rituales de la Pachamama'
        },
        {
            id: '3',
            name: 'Shipibo Konibo María',
            location: 'Ucayali, Perú',
            languages: ['Shipibo', 'Español'],
            specialties: ['Arte kené', 'Plantas medicinales', 'Cosmología amazónica'],
            rating: 5.0,
            totalSessions: 56,
            isOnline: true,
            avatar: '🌺',
            bio: 'Artista y curandera, maestra en diseños sagrados shipibo.',
            culturalBackground: 'Pueblo Shipibo-Konibo, conocedora de la medicina de la selva'
        }
    ];

    const communityPosts: CommunityPost[] = [
        {
            id: '1',
            author: 'Ana Condori',
            authorAvatar: '👩🏽',
            title: '¿Cómo se dice &ldquo;esperanza&rdquo; en diferentes dialectos quechuas?',
            content: 'Estoy aprendiendo quechua cusqueño pero me gustaría conocer cómo expresan esta bella palabra en otras variantes...',
            language: 'Quechua',
            type: 'question',
            likes: 24,
            comments: 8,
            timeAgo: '2 horas',
            tags: ['vocabulario', 'dialectos', 'filosofía']
        },
        {
            id: '2',
            author: 'Mama Rosa Quispe',
            authorAvatar: '👵🏽',
            title: 'La ceremonia del Despacho: conectando con la Pachamama',
            content: 'Hoy quiero compartir sobre esta hermosa tradición andina donde ofrendamos a nuestra Madre Tierra...',
            language: 'Quechua',
            type: 'cultural',
            likes: 67,
            comments: 15,
            timeAgo: '1 día',
            tags: ['tradición', 'espiritualidad', 'pachamama']
        },
        {
            id: '3',
            author: 'Luis Ticona',
            authorAvatar: '👨🏽',
            title: 'Intercambio de conversación: Aymara por Inglés',
            content: 'Busco compañero/a para practicar aymara mientras ayudo con inglés. Nivel intermedio.',
            language: 'Aymara',
            type: 'practice',
            likes: 12,
            comments: 6,
            timeAgo: '3 horas',
            tags: ['intercambio', 'práctica', 'inglés']
        }
    ];

    const languageExchanges: LanguageExchange[] = [
        {
            id: '1',
            title: 'Círculo de Conversación Quechua',
            organizer: 'Mama Rosa Quispe',
            date: '2025-01-28',
            time: '19:00',
            participants: 8,
            maxParticipants: 12,
            language: 'Quechua',
            level: 'Intermedio',
            type: 'conversation',
            icon: '💬'
        },
        {
            id: '2',
            title: 'Noche de Cuentos Amazónicos',
            organizer: 'Shipibo Konibo María',
            date: '2025-01-29',
            time: '20:00',
            participants: 15,
            maxParticipants: 20,
            language: 'Shipibo',
            level: 'Todos los niveles',
            type: 'storytelling',
            icon: '📚'
        },
        {
            id: '3',
            title: 'Taller de Música Andina',
            organizer: 'Tayta Carlos Mamani',
            date: '2025-01-30',
            time: '18:30',
            participants: 6,
            maxParticipants: 10,
            language: 'Aymara',
            level: 'Principiante',
            type: 'music',
            icon: '🎵'
        }
    ];

    const getPostTypeColor = (type: string) => {
        const colors = {
            question: 'bg-blue-100 text-blue-800',
            cultural: 'bg-purple-100 text-purple-800',
            practice: 'bg-green-100 text-green-800',
            story: 'bg-orange-100 text-orange-800'
        };
        return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const getPostTypeLabel = (type: string) => {
        const labels = {
            question: 'Pregunta',
            cultural: 'Cultural',
            practice: 'Práctica',
            story: 'Historia'
        };
        return labels[type as keyof typeof labels] || type;
    };

    const getEventTypeIcon = (type: string) => {
        const icons = {
            conversation: '💬',
            cultural: '🎭',
            storytelling: '📚',
            music: '🎵'
        };
        return icons[type as keyof typeof icons] || '🌟';
    };

    const tabs = [
        { id: 'speakers', label: 'Hablantes Nativos', icon: '👥' },
        { id: 'posts', label: 'Comunidad', icon: '💬' },
        { id: 'events', label: 'Eventos', icon: '📅' }
    ];

    return (
        <div className="min-h-screen bg-cream">
            <Navigation currentPath="/dashboard/community" />

            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Card variant="cultural">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold mb-2">🤝 Ayllu - Comunidad</h1>
                            <p className="text-lg text-cream/90">
                                Conecta con hablantes nativos y comparte conocimientos
                            </p>
                        </div>
                    </Card>
                </div>

                {/* Tabs de Navegación */}
                <div className="mb-8">
                    <div className="flex space-x-4 bg-white rounded-lg p-2 shadow-sm">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${activeTab === tab.id
                                    ? 'bg-forest-green text-white shadow-md'
                                    : 'text-forest-green hover:bg-sage-green/10'
                                    }`}
                            >
                                <span>{tab.icon}</span>
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Contenido según tab activo */}
                {activeTab === 'speakers' && (
                    <div className="grid lg:grid-cols-3 gap-6">
                        {nativeSpeakers.map((speaker) => (
                            <Card key={speaker.id} className="relative">
                                <div className="absolute top-4 right-4">
                                    <div className={`w-3 h-3 rounded-full ${speaker.isOnline ? 'bg-green-400' : 'bg-gray-300'}`}></div>
                                </div>

                                <div className="text-center mb-4">
                                    <div className="text-6xl mb-3">{speaker.avatar}</div>
                                    <h3 className="text-xl font-semibold text-forest-green">{speaker.name}</h3>
                                    <p className="text-sage-green text-sm">{speaker.location}</p>
                                </div>

                                <div className="mb-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-forest-green">Idiomas</span>
                                        <div className="flex items-center space-x-1">
                                            <span className="text-golden-yellow">⭐</span>
                                            <span className="text-sm font-medium">{speaker.rating}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {speaker.languages.map((lang, index) => (
                                            <span key={index} className="px-2 py-1 bg-sage-green/20 text-forest-green text-xs rounded-full">
                                                {lang}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <span className="text-sm font-medium text-forest-green">Especialidades</span>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {speaker.specialties.map((specialty, index) => (
                                            <span key={index} className="px-2 py-1 bg-golden-yellow/20 text-forest-green text-xs rounded-full">
                                                {specialty}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <p className="text-sm text-sage-green mb-4 line-clamp-2">{speaker.bio}</p>

                                <div className="text-xs text-sage-green mb-4 italic">
                                    {speaker.culturalBackground}
                                </div>

                                <div className="flex justify-between items-center text-sm text-sage-green mb-4">
                                    <span>💬 {speaker.totalSessions} sesiones</span>
                                    <span className={speaker.isOnline ? 'text-green-600' : 'text-gray-500'}>
                                        {speaker.isOnline ? '🟢 En línea' : '⚫ Desconectado'}
                                    </span>
                                </div>

                                <button className="w-full bg-forest-green hover:bg-sage-green text-white py-2 rounded-lg font-medium transition-colors duration-200">
                                    Conectar
                                </button>
                            </Card>
                        ))}
                    </div>
                )}

                {activeTab === 'posts' && (
                    <div className="space-y-6">
                        {/* Crear nueva publicación */}
                        <Card title="Comparte con la comunidad" icon="✍️">
                            <div className="space-y-4">
                                <textarea
                                    placeholder="¿Qué quieres compartir hoy con la comunidad TukuySimi?"
                                    className="w-full p-3 border border-sage-green/20 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                                    rows={3}
                                />
                                <div className="flex justify-between items-center">
                                    <div className="flex space-x-2">
                                        <select className="px-3 py-2 border border-sage-green/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sage-green/50">
                                            <option>Tipo de publicación</option>
                                            <option value="question">Pregunta</option>
                                            <option value="cultural">Cultural</option>
                                            <option value="practice">Práctica</option>
                                            <option value="story">Historia</option>
                                        </select>
                                        <select className="px-3 py-2 border border-sage-green/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sage-green/50">
                                            <option>Idioma</option>
                                            <option value="quechua">Quechua</option>
                                            <option value="aymara">Aymara</option>
                                            <option value="shipibo">Shipibo</option>
                                            <option value="ashaninka">Asháninka</option>
                                        </select>
                                    </div>
                                    <button className="bg-forest-green hover:bg-sage-green text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                                        Publicar
                                    </button>
                                </div>
                            </div>
                        </Card>

                        {/* Publicaciones de la comunidad */}
                        {communityPosts.map((post) => (
                            <Card key={post.id}>
                                <div className="flex items-start space-x-4">
                                    <div className="text-3xl">{post.authorAvatar}</div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <h3 className="font-semibold text-forest-green">{post.author}</h3>
                                                <p className="text-sm text-sage-green">{post.timeAgo}</p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPostTypeColor(post.type)}`}>
                                                    {getPostTypeLabel(post.type)}
                                                </span>
                                                <span className="px-2 py-1 bg-forest-green/10 text-forest-green text-xs rounded-full">
                                                    {post.language}
                                                </span>
                                            </div>
                                        </div>

                                        <h4 className="text-lg font-medium text-forest-green mb-2">{post.title}</h4>
                                        <p className="text-sage-green mb-3 line-clamp-3">{post.content}</p>

                                        <div className="flex flex-wrap gap-1 mb-4">
                                            {post.tags.map((tag, index) => (
                                                <span key={index} className="px-2 py-1 bg-sage-green/10 text-sage-green text-xs rounded-full">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center space-x-6 text-sm text-sage-green">
                                            <button className="flex items-center space-x-1 hover:text-forest-green transition-colors">
                                                <span>❤️</span>
                                                <span>{post.likes}</span>
                                            </button>
                                            <button className="flex items-center space-x-1 hover:text-forest-green transition-colors">
                                                <span>💬</span>
                                                <span>{post.comments}</span>
                                            </button>
                                            <button className="hover:text-forest-green transition-colors">
                                                Compartir
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {activeTab === 'events' && (
                    <div className="space-y-6">
                        {/* Crear evento */}
                        <Card title="Organiza un evento" icon="🎉" subtitle="Crea encuentros para la comunidad">
                            <button className="w-full border-2 border-dashed border-sage-green/30 rounded-lg p-6 text-center hover:border-sage-green hover:bg-sage-green/5 transition-all duration-200">
                                <div className="text-3xl mb-2">➕</div>
                                <div className="font-medium text-forest-green">Crear nuevo evento</div>
                                <div className="text-sm text-sage-green">Organiza intercambios, talleres o charlas culturales</div>
                            </button>
                        </Card>

                        {/* Próximos eventos */}
                        <Card title="Próximos Eventos" icon="📅" subtitle="Únete a los encuentros de la comunidad">
                            <div className="grid md:grid-cols-2 gap-6">
                                {languageExchanges.map((event) => (
                                    <div key={event.id} className="border border-sage-green/20 rounded-lg p-6 hover:shadow-md transition-all duration-200">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <span className="text-2xl">{getEventTypeIcon(event.type)}</span>
                                                <div>
                                                    <h3 className="font-semibold text-forest-green">{event.title}</h3>
                                                    <p className="text-sm text-sage-green">Por {event.organizer}</p>
                                                </div>
                                            </div>
                                            <div className="text-right text-sm">
                                                <div className="font-medium text-forest-green">{event.language}</div>
                                                <div className="text-sage-green">{event.level}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-4 text-sm text-sage-green mb-4">
                                            <span className="flex items-center space-x-1">
                                                <span>📅</span>
                                                <span>{new Date(event.date).toLocaleDateString()}</span>
                                            </span>
                                            <span className="flex items-center space-x-1">
                                                <span>⏰</span>
                                                <span>{event.time}</span>
                                            </span>
                                        </div>

                                        <div className="mb-4">
                                            <div className="flex justify-between text-sm text-sage-green mb-1">
                                                <span>Participantes</span>
                                                <span>{event.participants}/{event.maxParticipants}</span>
                                            </div>
                                            <div className="w-full bg-sage-green/20 rounded-full h-2">
                                                <div
                                                    className="bg-gradient-to-r from-forest-green to-sage-green h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <button className="w-full bg-forest-green hover:bg-sage-green text-white py-2 rounded-lg font-medium transition-colors duration-200">
                                            Unirse al evento
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
