"use client";

import Card from '@components/Card';
import LoadingSpinner from '@components/LoadingSpinner';
import Navigation from '@components/Navigation';
import { useAuth } from '@hooks/useAuth';
import { useState } from 'react';

interface UserPreferences {
    nativeLanguage: string;
    learningLanguages: string[];
    dailyGoal: number;
    studyReminders: boolean;
    soundEffects: boolean;
    culturalContent: boolean;
    difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
}

interface LearningGoal {
    id: string;
    language: string;
    targetLevel: string;
    deadline: string;
    currentProgress: number;
    icon: string;
    priority: 'Alta' | 'Media' | 'Baja';
}

export default function ProfilePage() {
    const { user, isLoading } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [activeSection, setActiveSection] = useState<'personal' | 'preferences' | 'goals' | 'privacy'>('personal');

    const [preferences, setPreferences] = useState<UserPreferences>({
        nativeLanguage: 'Español',
        learningLanguages: ['Quechua', 'Aymara'],
        dailyGoal: 20, // minutos
        studyReminders: true,
        soundEffects: true,
        culturalContent: true,
        difficulty: 'Principiante'
    });
    if (isLoading) {
        return <LoadingSpinner message="Cargando tu perfil..." />;
    }


    const learningGoals: LearningGoal[] = [
        {
            id: '1',
            language: 'Quechua',
            targetLevel: 'A2',
            deadline: '2025-06-01',
            currentProgress: 45,
            icon: '🏔️',
            priority: 'Alta'
        },
        {
            id: '2',
            language: 'Aymara',
            targetLevel: 'A1',
            deadline: '2025-12-01',
            currentProgress: 15,
            icon: '🌅',
            priority: 'Media'
        }
    ];

    const getPriorityColor = (priority: string) => {
        const colors = {
            'Alta': 'text-red-600 bg-red-100',
            'Media': 'text-yellow-600 bg-yellow-100',
            'Baja': 'text-green-600 bg-green-100'
        };
        return colors[priority as keyof typeof colors] || 'text-gray-600 bg-gray-100';
    };

    const sections = [
        { id: 'personal', label: 'Información Personal', icon: '👤' },
        { id: 'preferences', label: 'Preferencias', icon: '⚙️' },
        { id: 'goals', label: 'Objetivos', icon: '🎯' },
        { id: 'privacy', label: 'Privacidad', icon: '🔒' }
    ];

    const availableLanguages = [
        'Quechua', 'Aymara', 'Shipibo', 'Asháninka', 'Awajún',
        'Matsés', 'Yanesha', 'Kukama', 'Tikuna', 'Bora'
    ];

    const handlePreferenceChange = (key: keyof UserPreferences, value: any) => {
        setPreferences(prev => ({
            ...prev,
            [key]: value
        }));
    };

    return (
        <div className="min-h-screen bg-cream">
            <Navigation currentPath="/dashboard/profile" />

            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Card variant="cultural">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold mb-2">👤 Kani - Mi Perfil</h1>
                            <p className="text-lg text-cream/90">
                                Personaliza tu experiencia de aprendizaje
                            </p>
                        </div>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Navegación lateral */}
                    <div className="lg:col-span-1">
                        <Card title="Configuración" icon="⚙️">
                            <div className="space-y-2">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id as typeof activeSection)}
                                        className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200 ${activeSection === section.id
                                            ? 'bg-forest-green text-white shadow-md'
                                            : 'text-forest-green hover:bg-sage-green/10'
                                            }`}
                                    >
                                        <span className="text-xl">{section.icon}</span>
                                        <span className="font-medium">{section.label}</span>
                                    </button>
                                ))}
                            </div>
                        </Card>

                        {/* Resumen del perfil */}
                        <div className="mt-6">
                            <Card title="Mi Resumen" icon="📊">
                                <div className="text-center mb-4">
                                    <div className="text-4xl mb-2">👨‍🎓</div>
                                    <h3 className="font-semibold text-forest-green">{user?.username}</h3>
                                    <p className="text-sm text-sage-green">Miembro desde {new Date(user?.createdAt || '').toLocaleDateString()}</p>
                                </div>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-sage-green">Idiomas activos</span>
                                        <span className="font-medium text-forest-green">{preferences.learningLanguages.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sage-green">Meta diaria</span>
                                        <span className="font-medium text-forest-green">{preferences.dailyGoal} min</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sage-green">Nivel</span>
                                        <span className="font-medium text-forest-green">{preferences.difficulty}</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Contenido principal */}
                    <div className="lg:col-span-3">
                        {activeSection === 'personal' && (
                            <Card title="Información Personal" icon="👤" subtitle="Gestiona tu información básica">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-forest-green">Datos Personales</h3>
                                        <button
                                            onClick={() => setIsEditing(!isEditing)}
                                            className="bg-sage-green hover:bg-forest-green text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                        >
                                            {isEditing ? 'Guardar' : 'Editar'}
                                        </button>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-forest-green mb-2">
                                                Nombre de usuario
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    defaultValue={user?.username}
                                                    className="w-full p-3 border border-sage-green/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                                                />
                                            ) : (
                                                <p className="p-3 bg-sage-green/10 rounded-lg">{user?.username}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-forest-green mb-2">
                                                Correo electrónico
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="email"
                                                    defaultValue={user?.email}
                                                    className="w-full p-3 border border-sage-green/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                                                />
                                            ) : (
                                                <p className="p-3 bg-sage-green/10 rounded-lg">{user?.email}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-forest-green mb-2">
                                                Idioma nativo
                                            </label>
                                            {isEditing ? (
                                                <select
                                                    value={preferences.nativeLanguage}
                                                    onChange={(e) => handlePreferenceChange('nativeLanguage', e.target.value)}
                                                    className="w-full p-3 border border-sage-green/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                                                >
                                                    <option value="Español">Español</option>
                                                    <option value="Inglés">Inglés</option>
                                                    <option value="Quechua">Quechua</option>
                                                    <option value="Aymara">Aymara</option>
                                                </select>
                                            ) : (
                                                <p className="p-3 bg-sage-green/10 rounded-lg">{preferences.nativeLanguage}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-forest-green mb-2">
                                                Ubicación
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    placeholder="Ej: Lima, Perú"
                                                    className="w-full p-3 border border-sage-green/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                                                />
                                            ) : (
                                                <p className="p-3 bg-sage-green/10 rounded-lg text-sage-green">No especificada</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-forest-green mb-2">
                                            Sobre mí
                                        </label>
                                        {isEditing ? (
                                            <textarea
                                                rows={4}
                                                placeholder="Cuéntanos sobre ti y tu interés en las lenguas originarias..."
                                                className="w-full p-3 border border-sage-green/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-green/50 resize-none"
                                            />
                                        ) : (
                                            <p className="p-3 bg-sage-green/10 rounded-lg text-sage-green">
                                                Añade una descripción sobre ti y tu pasión por las lenguas originarias.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        )}

                        {activeSection === 'preferences' && (
                            <Card title="Preferencias de Aprendizaje" icon="⚙️" subtitle="Personaliza tu experiencia">
                                <div className="space-y-8">
                                    {/* Idiomas de aprendizaje */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-forest-green mb-4">Idiomas que estoy aprendiendo</h3>
                                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                                            {availableLanguages.map((language) => (
                                                <label key={language} className="flex items-center space-x-3 p-3 border border-sage-green/20 rounded-lg hover:bg-sage-green/5 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={preferences.learningLanguages.includes(language)}
                                                        onChange={(e) => {
                                                            const newLanguages = e.target.checked
                                                                ? [...preferences.learningLanguages, language]
                                                                : preferences.learningLanguages.filter(lang => lang !== language);
                                                            handlePreferenceChange('learningLanguages', newLanguages);
                                                        }}
                                                        className="w-4 h-4 text-forest-green rounded focus:ring-sage-green"
                                                    />
                                                    <span className="text-forest-green">{language}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Meta diaria */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-forest-green mb-4">Meta diaria de estudio</h3>
                                        <div className="flex items-center space-x-4">
                                            <input
                                                type="range"
                                                min="5"
                                                max="120"
                                                step="5"
                                                value={preferences.dailyGoal}
                                                onChange={(e) => handlePreferenceChange('dailyGoal', parseInt(e.target.value))}
                                                className="flex-1"
                                            />
                                            <div className="bg-forest-green text-white px-4 py-2 rounded-lg font-medium">
                                                {preferences.dailyGoal} min
                                            </div>
                                        </div>
                                    </div>

                                    {/* Nivel de dificultad */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-forest-green mb-4">Nivel de dificultad</h3>
                                        <div className="flex space-x-4">
                                            {['Principiante', 'Intermedio', 'Avanzado'].map((level) => (
                                                <button
                                                    key={level}
                                                    onClick={() => handlePreferenceChange('difficulty', level)}
                                                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${preferences.difficulty === level
                                                        ? 'bg-forest-green text-white shadow-md'
                                                        : 'bg-sage-green/20 text-forest-green hover:bg-sage-green/30'
                                                        }`}
                                                >
                                                    {level}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Configuraciones adicionales */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-forest-green mb-4">Configuraciones adicionales</h3>
                                        <div className="space-y-4">
                                            <label className="flex items-center justify-between p-4 border border-sage-green/20 rounded-lg">
                                                <div>
                                                    <div className="font-medium text-forest-green">Recordatorios de estudio</div>
                                                    <div className="text-sm text-sage-green">Recibe notificaciones para mantener tu racha</div>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    checked={preferences.studyReminders}
                                                    onChange={(e) => handlePreferenceChange('studyReminders', e.target.checked)}
                                                    className="w-5 h-5 text-forest-green rounded focus:ring-sage-green"
                                                />
                                            </label>

                                            <label className="flex items-center justify-between p-4 border border-sage-green/20 rounded-lg">
                                                <div>
                                                    <div className="font-medium text-forest-green">Efectos de sonido</div>
                                                    <div className="text-sm text-sage-green">Sonidos de celebración y feedback</div>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    checked={preferences.soundEffects}
                                                    onChange={(e) => handlePreferenceChange('soundEffects', e.target.checked)}
                                                    className="w-5 h-5 text-forest-green rounded focus:ring-sage-green"
                                                />
                                            </label>

                                            <label className="flex items-center justify-between p-4 border border-sage-green/20 rounded-lg">
                                                <div>
                                                    <div className="font-medium text-forest-green">Contenido cultural</div>
                                                    <div className="text-sm text-sage-green">Incluir historias, tradiciones y contexto cultural</div>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    checked={preferences.culturalContent}
                                                    onChange={(e) => handlePreferenceChange('culturalContent', e.target.checked)}
                                                    className="w-5 h-5 text-forest-green rounded focus:ring-sage-green"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        )}

                        {activeSection === 'goals' && (
                            <Card title="Mis Objetivos" icon="🎯" subtitle="Define y sigue tus metas de aprendizaje">
                                <div className="space-y-6">
                                    {/* Objetivos actuales */}
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-semibold text-forest-green">Objetivos actuales</h3>
                                            <button className="bg-forest-green hover:bg-sage-green text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                                + Nuevo objetivo
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            {learningGoals.map((goal) => (
                                                <div key={goal.id} className="border border-sage-green/20 rounded-lg p-4">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center space-x-3">
                                                            <span className="text-2xl">{goal.icon}</span>
                                                            <div>
                                                                <h4 className="font-semibold text-forest-green">
                                                                    {goal.language} - Nivel {goal.targetLevel}
                                                                </h4>
                                                                <p className="text-sm text-sage-green">
                                                                    Meta: {new Date(goal.deadline).toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-3">
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                                                                {goal.priority}
                                                            </span>
                                                            <button className="text-sage-green hover:text-forest-green">
                                                                ⋮
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="mb-2">
                                                        <div className="flex justify-between text-sm text-sage-green mb-1">
                                                            <span>Progreso</span>
                                                            <span>{goal.currentProgress}%</span>
                                                        </div>
                                                        <div className="w-full bg-sage-green/20 rounded-full h-2">
                                                            <div
                                                                className="bg-gradient-to-r from-forest-green to-sage-green h-2 rounded-full transition-all duration-300"
                                                                style={{ width: `${goal.currentProgress}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-between items-center text-sm">
                                                        <span className="text-sage-green">
                                                            {Math.round((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} días restantes
                                                        </span>
                                                        <button className="text-forest-green hover:text-sage-green font-medium">
                                                            Ver detalles →
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Sugerencias de objetivos */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-forest-green mb-4">Objetivos sugeridos</h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="border-2 border-dashed border-sage-green/30 rounded-lg p-4 text-center hover:border-sage-green hover:bg-sage-green/5 transition-all cursor-pointer">
                                                <div className="text-2xl mb-2">📚</div>
                                                <h4 className="font-medium text-forest-green mb-1">Vocabulario Básico</h4>
                                                <p className="text-sm text-sage-green mb-3">Aprende 100 palabras esenciales</p>
                                                <button className="text-forest-green font-medium text-sm">Agregar objetivo</button>
                                            </div>

                                            <div className="border-2 border-dashed border-sage-green/30 rounded-lg p-4 text-center hover:border-sage-green hover:bg-sage-green/5 transition-all cursor-pointer">
                                                <div className="text-2xl mb-2">🗣️</div>
                                                <h4 className="font-medium text-forest-green mb-1">Conversación Básica</h4>
                                                <p className="text-sm text-sage-green mb-3">Mantén una conversación de 5 minutos</p>
                                                <button className="text-forest-green font-medium text-sm">Agregar objetivo</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        )}

                        {activeSection === 'privacy' && (
                            <Card title="Privacidad y Seguridad" icon="🔒" subtitle="Gestiona tu privacidad y seguridad">
                                <div className="space-y-8">
                                    {/* Configuración de privacidad */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-forest-green mb-4">Configuración de privacidad</h3>
                                        <div className="space-y-4">
                                            <label className="flex items-center justify-between p-4 border border-sage-green/20 rounded-lg">
                                                <div>
                                                    <div className="font-medium text-forest-green">Perfil público</div>
                                                    <div className="text-sm text-sage-green">Permite que otros usuarios vean tu perfil</div>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    defaultChecked={true}
                                                    className="w-5 h-5 text-forest-green rounded focus:ring-sage-green"
                                                />
                                            </label>

                                            <label className="flex items-center justify-between p-4 border border-sage-green/20 rounded-lg">
                                                <div>
                                                    <div className="font-medium text-forest-green">Mostrar progreso</div>
                                                    <div className="text-sm text-sage-green">Comparte tu progreso con la comunidad</div>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    defaultChecked={true}
                                                    className="w-5 h-5 text-forest-green rounded focus:ring-sage-green"
                                                />
                                            </label>

                                            <label className="flex items-center justify-between p-4 border border-sage-green/20 rounded-lg">
                                                <div>
                                                    <div className="font-medium text-forest-green">Permitir mensajes</div>
                                                    <div className="text-sm text-sage-green">Recibe mensajes de otros usuarios</div>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    defaultChecked={false}
                                                    className="w-5 h-5 text-forest-green rounded focus:ring-sage-green"
                                                />
                                            </label>
                                        </div>
                                    </div>

                                    {/* Seguridad de la cuenta */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-forest-green mb-4">Seguridad de la cuenta</h3>
                                        <div className="space-y-4">
                                            <button className="w-full flex items-center justify-between p-4 border border-sage-green/20 rounded-lg hover:bg-sage-green/5 transition-colors">
                                                <div className="text-left">
                                                    <div className="font-medium text-forest-green">Cambiar contraseña</div>
                                                    <div className="text-sm text-sage-green">Actualiza tu contraseña regularmente</div>
                                                </div>
                                                <span className="text-sage-green">→</span>
                                            </button>

                                            <button className="w-full flex items-center justify-between p-4 border border-sage-green/20 rounded-lg hover:bg-sage-green/5 transition-colors">
                                                <div className="text-left">
                                                    <div className="font-medium text-forest-green">Autenticación de dos factores</div>
                                                    <div className="text-sm text-sage-green">Agrega una capa extra de seguridad</div>
                                                </div>
                                                <span className="text-sage-green">→</span>
                                            </button>

                                            <button className="w-full flex items-center justify-between p-4 border border-sage-green/20 rounded-lg hover:bg-sage-green/5 transition-colors">
                                                <div className="text-left">
                                                    <div className="font-medium text-forest-green">Sesiones activas</div>
                                                    <div className="text-sm text-sage-green">Revisa y gestiona tus sesiones</div>
                                                </div>
                                                <span className="text-sage-green">→</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Exportar datos */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-forest-green mb-4">Mis datos</h3>
                                        <div className="space-y-4">
                                            <button className="w-full flex items-center justify-between p-4 border border-sage-green/20 rounded-lg hover:bg-sage-green/5 transition-colors">
                                                <div className="text-left">
                                                    <div className="font-medium text-forest-green">Descargar mis datos</div>
                                                    <div className="text-sm text-sage-green">Obtén una copia de tu información</div>
                                                </div>
                                                <span className="text-sage-green">↓</span>
                                            </button>

                                            <button className="w-full flex items-center justify-between p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                                                <div className="text-left">
                                                    <div className="font-medium text-red-600">Eliminar cuenta</div>
                                                    <div className="text-sm text-red-400">Esta acción no se puede deshacer</div>
                                                </div>
                                                <span className="text-red-400">⚠️</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
