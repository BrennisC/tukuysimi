'use client';

import Card from '@components/Card';
import LoadingSpinner from '@components/LoadingSpinner';
import Navigation from '@components/Navigation';
import { useAuth } from '@hooks/useAuth';
import { useState } from 'react';

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    category: string;
    points: number;
    unlockedAt: string | null;
    progress?: number;
    requirement?: number;
}

interface LearningStats {
    totalWords: number;
    completedLessons: number;
    studyStreak: number;
    totalStudyTime: number;
    level: string;
    experiencePoints: number;
    nextLevelXP: number;
}

interface WeeklyActivity {
    day: string;
    studyTime: number;
    wordsLearned: number;
    exercisesCompleted: number;
}

export default function ProgressPage() {
    const { user, isLoading } = useAuth();
    const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');
    const [selectedCategory, setSelectedCategory] = useState('Todos');

    if (isLoading) {
        return <LoadingSpinner message="Cargando tu progreso..." />;
    }

    const learningStats: LearningStats = {
        totalWords: 245,
        completedLessons: 12,
        studyStreak: 7,
        totalStudyTime: 180, // en minutos
        level: 'Pichqa (A1)',
        experiencePoints: 1250,
        nextLevelXP: 2000
    };

    const achievements: Achievement[] = [
        {
            id: '1',
            title: 'Primeros Pasos',
            description: 'Completaste tu primera lección',
            icon: '👶',
            category: 'Inicio',
            points: 50,
            unlockedAt: '2025-01-20'
        },
        {
            id: '2',
            title: 'Semilla de Conocimiento',
            description: 'Aprendiste 50 palabras nuevas',
            icon: '🌱',
            category: 'Vocabulario',
            points: 100,
            unlockedAt: '2025-01-24'
        },
        {
            id: '3',
            title: 'Constancia Andina',
            description: 'Mantuviste una racha de 7 días',
            icon: '🔥',
            category: 'Constancia',
            points: 150,
            unlockedAt: '2025-01-26'
        },
        {
            id: '4',
            title: 'Yachay Warmi/Qhari',
            description: 'Completa 20 lecciones',
            icon: '🎓',
            category: 'Progreso',
            points: 200,
            unlockedAt: null,
            progress: 12,
            requirement: 20
        },
        {
            id: '5',
            title: 'Maestro de Palabras',
            description: 'Aprende 500 palabras',
            icon: '📚',
            category: 'Vocabulario',
            points: 300,
            unlockedAt: null,
            progress: 245,
            requirement: 500
        },
        {
            id: '6',
            title: 'Comunidad Ayllu',
            description: 'Conecta con 3 hablantes nativos',
            icon: '🤝',
            category: 'Comunidad',
            points: 150,
            unlockedAt: null,
            progress: 1,
            requirement: 3
        }
    ];

    const weeklyActivity: WeeklyActivity[] = [
        { day: 'Lun', studyTime: 25, wordsLearned: 8, exercisesCompleted: 3 },
        { day: 'Mar', studyTime: 30, wordsLearned: 12, exercisesCompleted: 4 },
        { day: 'Mié', studyTime: 20, wordsLearned: 6, exercisesCompleted: 2 },
        { day: 'Jue', studyTime: 35, wordsLearned: 15, exercisesCompleted: 5 },
        { day: 'Vie', studyTime: 28, wordsLearned: 10, exercisesCompleted: 4 },
        { day: 'Sáb', studyTime: 40, wordsLearned: 18, exercisesCompleted: 6 },
        { day: 'Dom', studyTime: 15, wordsLearned: 5, exercisesCompleted: 2 }
    ];

    const maxStudyTime = Math.max(...weeklyActivity.map(day => day.studyTime));

    const languageProgress = [
        { language: 'Quechua', level: 'A1', progress: 45, totalLessons: 20, completedLessons: 9 },
        { language: 'Aymara', level: 'A1', progress: 15, totalLessons: 18, completedLessons: 3 }
    ];

    const categories = ['Todos', 'Inicio', 'Vocabulario', 'Constancia', 'Progreso', 'Comunidad'];

    const filteredAchievements = selectedCategory === 'Todos'
        ? achievements
        : achievements.filter(achievement => achievement.category === selectedCategory);

    const formatTime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    return (
        <div className="min-h-screen bg-cream">
            <Navigation currentPath="/dashboard/progress" />

            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Card variant="cultural">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold mb-2">📈 Ñawpay - Tu Progreso</h1>
                            <p className="text-lg text-cream/90">
                                Celebra tu camino de aprendizaje y crecimiento
                            </p>
                        </div>
                    </Card>
                </div>

                {/* Estadísticas Principales */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="text-center">
                        <div className="text-3xl mb-2">📚</div>
                        <div className="text-2xl font-bold text-forest-green">{learningStats.totalWords}</div>
                        <div className="text-sm text-sage-green">Palabras aprendidas</div>
                    </Card>

                    <Card className="text-center">
                        <div className="text-3xl mb-2">✅</div>
                        <div className="text-2xl font-bold text-forest-green">{learningStats.completedLessons}</div>
                        <div className="text-sm text-sage-green">Lecciones completadas</div>
                    </Card>

                    <Card className="text-center">
                        <div className="text-3xl mb-2">🔥</div>
                        <div className="text-2xl font-bold text-forest-green">{learningStats.studyStreak}</div>
                        <div className="text-sm text-sage-green">Días consecutivos</div>
                    </Card>

                    <Card className="text-center">
                        <div className="text-3xl mb-2">⏱️</div>
                        <div className="text-2xl font-bold text-forest-green">{formatTime(learningStats.totalStudyTime)}</div>
                        <div className="text-sm text-sage-green">Tiempo total</div>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-8">
                    {/* Nivel Actual */}
                    <Card title="Nivel Actual" icon="🏆" subtitle="Tu progreso general">
                        <div className="text-center mb-6">
                            <div className="text-4xl mb-2">🌟</div>
                            <h3 className="text-2xl font-bold text-forest-green mb-1">{learningStats.level}</h3>
                            <p className="text-sage-green text-sm">Quechua Principiante</p>
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between text-sm text-sage-green mb-2">
                                <span>Experiencia</span>
                                <span>{learningStats.experiencePoints}/{learningStats.nextLevelXP} XP</span>
                            </div>
                            <div className="w-full bg-sage-green/20 rounded-full h-3">
                                <div
                                    className="bg-gradient-to-r from-golden-yellow to-forest-green h-3 rounded-full transition-all duration-300"
                                    style={{ width: `${(learningStats.experiencePoints / learningStats.nextLevelXP) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="text-center text-sm text-sage-green">
                            {learningStats.nextLevelXP - learningStats.experiencePoints} XP para el siguiente nivel
                        </div>
                    </Card>

                    {/* Progreso por Idioma */}
                    <Card title="Progreso por Idioma" icon="🌍" subtitle="Tu avance en cada lengua">
                        <div className="space-y-4">
                            {languageProgress.map((lang, index) => (
                                <div key={index} className="border border-sage-green/20 rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <div>
                                            <h4 className="font-semibold text-forest-green">{lang.language}</h4>
                                            <p className="text-sm text-sage-green">Nivel {lang.level}</p>
                                        </div>
                                        <div className="text-right text-sm">
                                            <div className="font-medium text-forest-green">{lang.progress}%</div>
                                            <div className="text-sage-green">{lang.completedLessons}/{lang.totalLessons}</div>
                                        </div>
                                    </div>
                                    <div className="w-full bg-sage-green/20 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-forest-green to-sage-green h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${lang.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Actividad Semanal */}
                    <Card title="Actividad Semanal" icon="📊" subtitle="Tu práctica esta semana">
                        <div className="space-y-3">
                            {weeklyActivity.map((day, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <div className="w-8 text-sm font-medium text-sage-green">{day.day}</div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <div className="w-full bg-sage-green/20 rounded-full h-2">
                                                <div
                                                    className="bg-gradient-to-r from-forest-green to-sage-green h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${(day.studyTime / maxStudyTime) * 100}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs text-sage-green w-8">{day.studyTime}m</span>
                                        </div>
                                        <div className="text-xs text-sage-green">
                                            {day.wordsLearned} palabras • {day.exercisesCompleted} ejercicios
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-sage-green/20 text-center">
                            <div className="text-sm text-sage-green">
                                Total esta semana: <span className="font-semibold text-forest-green">{formatTime(weeklyActivity.reduce((sum, day) => sum + day.studyTime, 0))}</span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Logros y Medallas */}
                <Card title="Logros y Medallas" icon="🏅" subtitle="Celebra tus hitos de aprendizaje">
                    {/* Filtros de categoría */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category
                                    ? 'bg-forest-green text-white'
                                    : 'bg-sage-green/20 text-forest-green hover:bg-sage-green/30'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredAchievements.map((achievement) => (
                            <div
                                key={achievement.id}
                                className={`border-2 rounded-lg p-4 transition-all duration-200 ${achievement.unlockedAt
                                    ? 'border-golden-yellow bg-golden-yellow/10 shadow-md'
                                    : 'border-sage-green/30 bg-gray-50/50'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className={`text-3xl ${!achievement.unlockedAt && 'grayscale opacity-50'}`}>
                                        {achievement.icon}
                                    </span>
                                    <div className="text-right">
                                        <div className={`text-sm font-medium ${achievement.unlockedAt ? 'text-golden-yellow' : 'text-sage-green'
                                            }`}>
                                            +{achievement.points} pts
                                        </div>
                                        <div className="text-xs text-sage-green">{achievement.category}</div>
                                    </div>
                                </div>

                                <h3 className={`font-semibold mb-1 ${achievement.unlockedAt ? 'text-forest-green' : 'text-sage-green'
                                    }`}>
                                    {achievement.title}
                                </h3>

                                <p className="text-sm text-sage-green mb-3">{achievement.description}</p>

                                {achievement.unlockedAt ? (
                                    <div className="flex items-center space-x-2 text-xs text-golden-yellow">
                                        <span>✅</span>
                                        <span>Desbloqueado el {new Date(achievement.unlockedAt).toLocaleDateString()}</span>
                                    </div>
                                ) : achievement.progress !== undefined ? (
                                    <div>
                                        <div className="flex justify-between text-xs text-sage-green mb-1">
                                            <span>Progreso</span>
                                            <span>{achievement.progress}/{achievement.requirement}</span>
                                        </div>
                                        <div className="w-full bg-sage-green/20 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-sage-green to-forest-green h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${((achievement.progress || 0) / (achievement.requirement || 1)) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-xs text-sage-green">🔒 Próximamente</div>
                                )}
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
