'use client';

import Card from '@components/Card';
import LoadingSpinner from '@components/LoadingSpinner';
import Navigation from '@components/Navigation';
import { useAuth } from '@hooks/useAuth';
import { useState } from 'react';

interface Game {
    id: string;
    title: string;
    description: string;
    type: 'vocabulary' | 'pronunciation' | 'listening' | 'translation';
    difficulty: 'Fácil' | 'Medio' | 'Difícil';
    duration: number;
    points: number;
    icon: string;
    isNew?: boolean;
}

interface Exercise {
    id: string;
    title: string;
    progress: number;
    totalQuestions: number;
    answeredQuestions: number;
    type: string;
    icon: string;
}

export default function PracticePage() {
    const { isLoading } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    if (isLoading) {
        return <LoadingSpinner message="Preparando tus ejercicios..." />;
    }

    const games: Game[] = [
        {
            id: 'word-match',
            title: 'Asociación de Palabras',
            description: 'Conecta palabras en quechua con sus significados',
            type: 'vocabulary',
            difficulty: 'Fácil',
            duration: 10,
            points: 50,
            icon: '🧩'
        },
        {
            id: 'pronunciation-challenge',
            title: 'Desafío de Pronunciación',
            description: 'Practica la pronunciación correcta',
            type: 'pronunciation',
            difficulty: 'Medio',
            duration: 15,
            points: 75,
            icon: '🎙️',
            isNew: true
        },
        {
            id: 'listening-game',
            title: 'Escucha y Aprende',
            description: 'Identifica palabras por su sonido',
            type: 'listening',
            difficulty: 'Medio',
            duration: 12,
            points: 60,
            icon: '👂'
        },
        {
            id: 'translation-race',
            title: 'Carrera de Traducción',
            description: 'Traduce frases rápidamente',
            type: 'translation',
            difficulty: 'Difícil',
            duration: 20,
            points: 100,
            icon: '🏃‍♂️'
        },
        {
            id: 'cultural-quiz',
            title: 'Quiz Cultural',
            description: 'Aprende sobre tradiciones andinas',
            type: 'vocabulary',
            difficulty: 'Fácil',
            duration: 8,
            points: 40,
            icon: '🏔️',
            isNew: true
        },
        {
            id: 'memory-game',
            title: 'Memoria Ancestral',
            description: 'Juego de memoria con símbolos andinos',
            type: 'vocabulary',
            difficulty: 'Fácil',
            duration: 5,
            points: 30,
            icon: '🧠'
        }
    ];

    const dailyExercises: Exercise[] = [
        {
            id: 'vocab-review',
            title: 'Repaso de Vocabulario',
            progress: 70,
            totalQuestions: 20,
            answeredQuestions: 14,
            type: 'Vocabulario',
            icon: '📝'
        },
        {
            id: 'listening-practice',
            title: 'Práctica de Escucha',
            progress: 40,
            totalQuestions: 15,
            answeredQuestions: 6,
            type: 'Escucha',
            icon: '🎧'
        },
        {
            id: 'pronunciation-drill',
            title: 'Ejercicio de Pronunciación',
            progress: 0,
            totalQuestions: 10,
            answeredQuestions: 0,
            type: 'Pronunciación',
            icon: '🗣️'
        }
    ];

    const categories = [
        { id: 'all', label: 'Todos', icon: '🌟' },
        { id: 'vocabulary', label: 'Vocabulario', icon: '📚' },
        { id: 'pronunciation', label: 'Pronunciación', icon: '🎙️' },
        { id: 'listening', label: 'Escucha', icon: '👂' },
        { id: 'translation', label: 'Traducción', icon: '🔄' }
    ];

    const filteredGames = selectedCategory === 'all'
        ? games
        : games.filter(game => game.type === selectedCategory);

    const getDifficultyColor = (difficulty: string) => {
        const colors = {
            'Fácil': 'text-green-600 bg-green-100',
            'Medio': 'text-yellow-600 bg-yellow-100',
            'Difícil': 'text-red-600 bg-red-100'
        };
        return colors[difficulty as keyof typeof colors] || 'text-gray-600 bg-gray-100';
    };

    const getTypeColor = (type: string) => {
        const colors = {
            vocabulary: 'bg-blue-100 text-blue-800',
            pronunciation: 'bg-orange-100 text-orange-800',
            listening: 'bg-green-100 text-green-800',
            translation: 'bg-purple-100 text-purple-800'
        };
        return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="min-h-screen bg-cream">
            <Navigation currentPath="/dashboard/practice" />

            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Card variant="cultural">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold mb-2">🎯 Ruwana - Práctica</h1>
                            <p className="text-lg text-cream/90">
                                Fortalece tu conocimiento con juegos y ejercicios
                            </p>
                        </div>
                    </Card>
                </div>

                {/* Ejercicios Diarios */}
                <div className="mb-8">
                    <Card title="Ejercicios Diarios" icon="📅" subtitle="Completa tu rutina diaria de práctica">
                        <div className="space-y-4">
                            {dailyExercises.map((exercise) => (
                                <div key={exercise.id} className="border border-sage-green/20 rounded-lg p-4 hover:bg-sage-green/5 transition-colors">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-2xl">{exercise.icon}</span>
                                            <div>
                                                <h3 className="font-semibold text-forest-green">{exercise.title}</h3>
                                                <p className="text-sm text-sage-green">{exercise.type}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-medium text-forest-green">
                                                {exercise.answeredQuestions}/{exercise.totalQuestions}
                                            </div>
                                            <div className="text-xs text-sage-green">preguntas</div>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <div className="flex justify-between text-sm text-sage-green mb-1">
                                            <span>Progreso</span>
                                            <span>{exercise.progress}%</span>
                                        </div>
                                        <div className="w-full bg-sage-green/20 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-golden-yellow to-sage-green h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${exercise.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <button className="text-forest-green hover:text-sage-green font-medium text-sm transition-colors">
                                        {exercise.progress === 0 ? 'Comenzar' : 'Continuar'} →
                                    </button>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Filtros de Categoría */}
                    <div className="lg:col-span-1">
                        <Card title="Categorías" icon="🎲" subtitle="Filtra por tipo de juego">
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200 ${selectedCategory === category.id
                                            ? 'bg-forest-green text-white shadow-md'
                                            : 'text-forest-green hover:bg-sage-green/10'
                                            }`}
                                    >
                                        <span className="text-xl">{category.icon}</span>
                                        <span className="font-medium">{category.label}</span>
                                    </button>
                                ))}
                            </div>
                        </Card>

                        {/* Estadísticas Rápidas */}
                        <div className="mt-6">
                            <Card title="Hoy" icon="⚡" subtitle="Tu práctica de hoy">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-sage-green">Tiempo practicado</span>
                                        <span className="font-semibold text-forest-green">25 min</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-sage-green">Puntos ganados</span>
                                        <span className="font-semibold text-golden-yellow">180 pts</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-sage-green">Juegos completados</span>
                                        <span className="font-semibold text-forest-green">3</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-sage-green">Racha actual</span>
                                        <span className="font-semibold text-forest-green">🔥 7 días</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Juegos Disponibles */}
                    <div className="lg:col-span-3">
                        <Card title="Juegos Disponibles" icon="🎮" subtitle={`${filteredGames.length} juegos encontrados`}>
                            <div className="grid md:grid-cols-2 gap-6">
                                {filteredGames.map((game) => (
                                    <div key={game.id} className="relative border border-sage-green/20 rounded-lg p-6 hover:shadow-lg hover:border-sage-green transition-all duration-200 cursor-pointer group">
                                        {game.isNew && (
                                            <div className="absolute -top-2 -right-2 bg-golden-yellow text-forest-green px-2 py-1 rounded-full text-xs font-bold shadow-md">
                                                ¡NUEVO!
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-3xl">{game.icon}</span>
                                            <div className="flex items-center space-x-2">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(game.type)}`}>
                                                    {game.type}
                                                </span>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(game.difficulty)}`}>
                                                    {game.difficulty}
                                                </span>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-semibold text-forest-green mb-2 group-hover:text-sage-green transition-colors">
                                            {game.title}
                                        </h3>

                                        <p className="text-sage-green text-sm mb-4 line-clamp-2">
                                            {game.description}
                                        </p>

                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center space-x-4 text-sage-green">
                                                <span className="flex items-center space-x-1">
                                                    <span>⏱️</span>
                                                    <span>{game.duration} min</span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <span>⭐</span>
                                                    <span>{game.points} pts</span>
                                                </span>
                                            </div>

                                            <button className="bg-forest-green hover:bg-sage-green text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm">
                                                Jugar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Desafío Semanal */}
                <div className="mt-8">
                    <Card variant="gradient" title="Desafío Semanal" icon="🏆" subtitle="Completa el reto y gana puntos extra">
                        <div className="text-center">
                            <div className="mb-4">
                                <div className="text-4xl mb-2">🌟</div>
                                <h3 className="text-2xl font-bold text-forest-green mb-2">
                                    Maestro de Vocabulario
                                </h3>
                                <p className="text-sage-green mb-4">
                                    Aprende 50 palabras nuevas esta semana y desbloquea el título especial
                                </p>
                            </div>

                            <div className="mb-6">
                                <div className="flex justify-between text-sm text-sage-green mb-2">
                                    <span>Progreso del desafío</span>
                                    <span>32/50 palabras</span>
                                </div>
                                <div className="w-full bg-white/50 rounded-full h-3">
                                    <div
                                        className="bg-gradient-to-r from-golden-yellow to-forest-green h-3 rounded-full transition-all duration-300"
                                        style={{ width: '64%' }}
                                    ></div>
                                </div>
                            </div>

                            <div className="flex justify-center space-x-6 text-sm">
                                <div className="text-center">
                                    <div className="text-xl font-bold text-forest-green">18</div>
                                    <div className="text-sage-green">palabras restantes</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold text-forest-green">3</div>
                                    <div className="text-sage-green">días restantes</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold text-golden-yellow">500</div>
                                    <div className="text-sage-green">puntos de premio</div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
