'use client';

import Card from '@components/Card';
import LoadingSpinner from '@components/LoadingSpinner';
import Navigation from '@components/Navigation';
import { useAuth } from '@hooks/useAuth';
import Link from 'next/link';

export default function DashboardPage() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <LoadingSpinner message="Cargando tu espacio de aprendizaje..." />;
    }

    const dailyMissions = [
        { id: 1, title: 'Aprende 5 palabras nuevas', icon: '🌱', progress: 60, points: 50 },
        { id: 2, title: 'Practica pronunciación', icon: '🗣️', progress: 30, points: 30 },
        { id: 3, title: 'Completa una lección', icon: '📚', progress: 0, points: 100 }
    ];

    const recentActivity = [
        { id: 1, activity: 'Completaste "Saludos básicos"', time: '2 horas', icon: '✅' },
        { id: 2, activity: 'Nueva conexión con María (Cusco)', time: '1 día', icon: '🤝' },
        { id: 3, activity: 'Logro desbloqueado: "Primeros pasos"', time: '2 días', icon: '🏆' }
    ];

    const quickActions = [
        {
            title: 'Continuar Aprendiendo',
            subtitle: 'Quechua - Nivel A1',
            icon: '📚',
            href: '/dashboard/learning',
            color: 'bg-gradient-to-r from-forest-green to-sage-green'
        },
        {
            title: 'Practicar Vocabulario',
            subtitle: '15 palabras pendientes',
            icon: '🎯',
            href: '/dashboard/practice',
            color: 'bg-gradient-to-r from-golden-yellow to-sage-green'
        },
        {
            title: 'Conversación',
            subtitle: 'Conecta con nativos',
            icon: '💬',
            href: '/dashboard/community',
            color: 'bg-gradient-to-r from-sage-green to-forest-green'
        }
    ];

    return (
        <div className="min-h-screen bg-cream">
            <Navigation currentPath="/dashboard" />

            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Bienvenida Principal */}
                <div className="mb-8">
                    <Card variant="cultural" className="text-center">
                        <h2 className="text-3xl font-bold mb-2">
                            ¡Allin p&apos;unchay, {user?.username}! ☀️
                        </h2>
                        <p className="text-lg text-cream/90">
                            Buen día en quechua - Continúa tu viaje de aprendizaje
                        </p>
                        <div className="mt-4 flex justify-center space-x-6 text-sm">
                            <div className="text-center">
                                <div className="text-2xl font-bold">7</div>
                                <div className="text-cream/80">Día actual</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">245</div>
                                <div className="text-cream/80">Puntos totales</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">12</div>
                                <div className="text-cream/80">Lecciones</div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Acciones Rápidas */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {quickActions.map((action, index) => (
                        <Link key={index} href={action.href}>
                            <div className={`${action.color} text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 cursor-pointer`}>
                                <div className="flex items-center space-x-3 mb-3">
                                    <span className="text-3xl">{action.icon}</span>
                                    <div>
                                        <h3 className="font-semibold text-lg">{action.title}</h3>
                                        <p className="text-white/80 text-sm">{action.subtitle}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Misiones Diarias */}
                    <Card title="Misiones Diarias" icon="🎯" subtitle="Completa tus objetivos del día">
                        <div className="space-y-4">
                            {dailyMissions.map((mission) => (
                                <div key={mission.id} className="border border-sage-green/20 rounded-lg p-4 hover:bg-sage-green/5 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-xl">{mission.icon}</span>
                                            <span className="font-medium">{mission.title}</span>
                                        </div>
                                        <span className="text-golden-yellow font-bold">+{mission.points} pts</span>
                                    </div>
                                    <div className="w-full bg-sage-green/20 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-golden-yellow to-sage-green h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${mission.progress}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-right text-sm text-sage-green mt-1">
                                        {mission.progress}% completado
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Actividad Reciente */}
                    <Card title="Actividad Reciente" icon="📈" subtitle="Tu progreso más reciente">
                        <div className="space-y-4">
                            {recentActivity.map((item) => (
                                <div key={item.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-sage-green/5 transition-colors">
                                    <span className="text-2xl">{item.icon}</span>
                                    <div className="flex-1">
                                        <p className="font-medium">{item.activity}</p>
                                        <p className="text-sm text-sage-green">Hace {item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-sage-green/20">
                            <Link
                                href="/dashboard/progress"
                                className="text-forest-green hover:text-sage-green font-medium text-sm transition-colors"
                            >
                                Ver todo tu progreso →
                            </Link>
                        </div>
                    </Card>
                </div>

                {/* Información Cultural del Día */}
                <div className="mt-8">
                    <Card variant="gradient" title="Yachay del Día" icon="🌿" subtitle="Sabiduría ancestral">
                        <div className="text-center">
                            <p className="text-lg font-medium mb-2 text-forest-green">
                                &ldquo;Ayni&rdquo; - Reciprocidad
                            </p>
                            <p className="text-sage-green">
                                En la cosmovisión andina, el ayni representa el intercambio equitativo y solidario.
                                Hoy en día, nos recuerda la importancia de dar y recibir en comunidad.
                            </p>
                            <div className="mt-4 text-sm text-forest-green/70">
                                💡 Úsalo hoy: &ldquo;Ayni ruway&rdquo; - &ldquo;Hagamos reciprocidad&rdquo;
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
