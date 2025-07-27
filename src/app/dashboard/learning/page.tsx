'use client';

import Card from '@components/Card';
import LoadingSpinner from '@components/LoadingSpinner';
import Navigation from '@components/Navigation';
import { useAuth } from '@hooks/useAuth';
import Link from 'next/link';

interface Course {
    id: string;
    title: string;
    language: string;
    level: string;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    icon: string;
    culture: string;
    difficulty: 'Fácil' | 'Medio' | 'Difícil';
}

interface Lesson {
    id: string;
    title: string;
    type: 'vocabulary' | 'grammar' | 'culture' | 'pronunciation';
    duration: number;
    completed: boolean;
    icon: string;
}

export default function LearningPage() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <LoadingSpinner message="Preparando tus lecciones..." />;
    }

    const currentCourses: Course[] = [
        {
            id: 'quechua-a1',
            title: 'Quechua Básico',
            language: 'Quechua',
            level: 'A1',
            progress: 45,
            totalLessons: 20,
            completedLessons: 9,
            icon: '🏔️',
            culture: 'Andina',
            difficulty: 'Fácil'
        },
        {
            id: 'aymara-a1',
            title: 'Aymara Inicial',
            language: 'Aymara',
            level: 'A1',
            progress: 15,
            totalLessons: 18,
            completedLessons: 3,
            icon: '🌅',
            culture: 'Altiplánica',
            difficulty: 'Medio'
        }
    ];

    const todayLessons: Lesson[] = [
        {
            id: 'lesson-1',
            title: 'Números del 1 al 10',
            type: 'vocabulary',
            duration: 15,
            completed: false,
            icon: '🔢'
        },
        {
            id: 'lesson-2',
            title: 'Pronunciación de consonantes',
            type: 'pronunciation',
            duration: 20,
            completed: false,
            icon: '🗣️'
        },
        {
            id: 'lesson-3',
            title: 'La familia en la cultura andina',
            type: 'culture',
            duration: 25,
            completed: true,
            icon: '👨‍👩‍👧‍👦'
        }
    ];

    const availableCourses: Course[] = [
        {
            id: 'shipibo-a1',
            title: 'Shipibo Básico',
            language: 'Shipibo',
            level: 'A1',
            progress: 0,
            totalLessons: 16,
            completedLessons: 0,
            icon: '🌊',
            culture: 'Amazónica',
            difficulty: 'Medio'
        },
        {
            id: 'ashaninka-a1',
            title: 'Asháninka Inicial',
            language: 'Asháninka',
            level: 'A1',
            progress: 0,
            totalLessons: 22,
            completedLessons: 0,
            icon: '🦋',
            culture: 'Selvática',
            difficulty: 'Difícil'
        }
    ];

    const getTypeColor = (type: string) => {
        const colors = {
            vocabulary: 'bg-blue-100 text-blue-800',
            grammar: 'bg-green-100 text-green-800',
            culture: 'bg-purple-100 text-purple-800',
            pronunciation: 'bg-orange-100 text-orange-800'
        };
        return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const getTypeLabel = (type: string) => {
        const labels = {
            vocabulary: 'Vocabulario',
            grammar: 'Gramática',
            culture: 'Cultura',
            pronunciation: 'Pronunciación'
        };
        return labels[type as keyof typeof labels] || type;
    };

    const getDifficultyColor = (difficulty: string) => {
        const colors = {
            'Fácil': 'text-green-600',
            'Medio': 'text-yellow-600',
            'Difícil': 'text-red-600'
        };
        return colors[difficulty as keyof typeof colors] || 'text-gray-600';
    };

    return (
        <div className="min-h-screen bg-cream">
            <Navigation currentPath="/dashboard/learning" />

            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Card variant="cultural">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold mb-2">🌱 Yachay - Aprendizaje</h1>
                            <p className="text-lg text-cream/90">
                                Continúa tu viaje de descubrimiento lingüístico
                            </p>
                        </div>
                    </Card>
                </div>

                {/* Lecciones de Hoy */}
                <div className="mb-8">
                    <Card title="Lecciones de Hoy" icon="📅" subtitle="Tu plan de aprendizaje diario">
                        <div className="grid md:grid-cols-3 gap-4">
                            {todayLessons.map((lesson) => (
                                <div
                                    key={lesson.id}
                                    className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${lesson.completed
                                        ? 'bg-green-50 border-green-200 opacity-75'
                                        : 'bg-white border-sage-green/20 hover:border-sage-green hover:shadow-md'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-2xl">{lesson.icon}</span>
                                        <div className="flex items-center space-x-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(lesson.type)}`}>
                                                {getTypeLabel(lesson.type)}
                                            </span>
                                            {lesson.completed && <span className="text-green-500">✅</span>}
                                        </div>
                                    </div>
                                    <h3 className="font-semibold text-forest-green mb-2">{lesson.title}</h3>
                                    <div className="flex items-center justify-between text-sm text-sage-green">
                                        <span>⏱️ {lesson.duration} min</span>
                                        {lesson.completed ? (
                                            <span className="text-green-600 font-medium">Completado</span>
                                        ) : (
                                            <span className="text-forest-green font-medium">Comenzar</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    {/* Cursos Actuales */}
                    <Card title="Mis Cursos" icon="📚" subtitle="Continúa donde lo dejaste">
                        <div className="space-y-4">
                            {currentCourses.map((course) => (
                                <div key={course.id} className="border border-sage-green/20 rounded-lg p-4 hover:bg-sage-green/5 transition-colors">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-2xl">{course.icon}</span>
                                            <div>
                                                <h3 className="font-semibold text-forest-green">{course.title}</h3>
                                                <p className="text-sm text-sage-green">
                                                    {course.language} • Nivel {course.level} • Cultura {course.culture}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`text-sm font-medium ${getDifficultyColor(course.difficulty)}`}>
                                                {course.difficulty}
                                            </div>
                                            <div className="text-xs text-sage-green">
                                                {course.completedLessons}/{course.totalLessons} lecciones
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <div className="flex justify-between text-sm text-sage-green mb-1">
                                            <span>Progreso</span>
                                            <span>{course.progress}%</span>
                                        </div>
                                        <div className="w-full bg-sage-green/20 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-forest-green to-sage-green h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${course.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/dashboard/learning/${course.id}`}
                                        className="inline-flex items-center text-forest-green hover:text-sage-green font-medium text-sm transition-colors"
                                    >
                                        Continuar curso →
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Estadísticas de Aprendizaje */}
                    <Card title="Tu Progreso" icon="📊" subtitle="Estadísticas de aprendizaje">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="text-center p-4 bg-sage-green/10 rounded-lg">
                                <div className="text-2xl font-bold text-forest-green">12</div>
                                <div className="text-sm text-sage-green">Lecciones completadas</div>
                            </div>
                            <div className="text-center p-4 bg-golden-yellow/20 rounded-lg">
                                <div className="text-2xl font-bold text-forest-green">245</div>
                                <div className="text-sm text-sage-green">Palabras aprendidas</div>
                            </div>
                            <div className="text-center p-4 bg-forest-green/10 rounded-lg">
                                <div className="text-2xl font-bold text-forest-green">7</div>
                                <div className="text-sm text-sage-green">Días seguidos</div>
                            </div>
                            <div className="text-center p-4 bg-sage-green/20 rounded-lg">
                                <div className="text-2xl font-bold text-forest-green">2</div>
                                <div className="text-sm text-sage-green">Logros obtenidos</div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-semibold text-forest-green">Logros Recientes</h4>
                            <div className="flex items-center space-x-3 p-2 bg-golden-yellow/10 rounded-lg">
                                <span className="text-xl">🏆</span>
                                <div>
                                    <div className="font-medium text-forest-green">Primeros Pasos</div>
                                    <div className="text-sm text-sage-green">Completaste tu primera lección</div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 p-2 bg-sage-green/10 rounded-lg">
                                <span className="text-xl">🌱</span>
                                <div>
                                    <div className="font-medium text-forest-green">Semilla de Conocimiento</div>
                                    <div className="text-sm text-sage-green">Aprendiste 50 palabras nuevas</div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Cursos Disponibles */}
                <Card title="Explora Nuevos Idiomas" icon="🔍" subtitle="Descubre más lenguas originarias">
                    <div className="grid md:grid-cols-2 gap-6">
                        {availableCourses.map((course) => (
                            <div key={course.id} className="border-2 border-dashed border-sage-green/30 rounded-lg p-6 text-center hover:border-sage-green hover:bg-sage-green/5 transition-all duration-200">
                                <span className="text-4xl mb-3 block">{course.icon}</span>
                                <h3 className="text-xl font-semibold text-forest-green mb-2">{course.title}</h3>
                                <p className="text-sage-green mb-3">
                                    {course.language} • Nivel {course.level} • Cultura {course.culture}
                                </p>
                                <div className="flex justify-center items-center space-x-4 mb-4 text-sm">
                                    <span className={`font-medium ${getDifficultyColor(course.difficulty)}`}>
                                        {course.difficulty}
                                    </span>
                                    <span className="text-sage-green">
                                        {course.totalLessons} lecciones
                                    </span>
                                </div>
                                <button className="bg-forest-green hover:bg-sage-green text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                                    Comenzar Curso
                                </button>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
