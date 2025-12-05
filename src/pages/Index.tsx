import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

type Category = 'healthy-food' | 'sport' | 'park' | 'alcohol' | 'tobacco';

interface Location {
  id: number;
  name: string;
  category: Category;
  rating: number;
  reviews: number;
  address: string;
  coordinates: { lat: number; lng: number };
  image?: string;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
}

const mockLocations: Location[] = [
  { id: 1, name: 'Зелёный Смузи', category: 'healthy-food', rating: 4.8, reviews: 127, address: 'ул. Ленина, 45', coordinates: { lat: 55.7558, lng: 37.6173 } },
  { id: 2, name: 'FitLife Gym', category: 'sport', rating: 4.9, reviews: 234, address: 'пр. Мира, 12', coordinates: { lat: 55.7608, lng: 37.6208 } },
  { id: 3, name: 'Парк Здоровья', category: 'park', rating: 4.7, reviews: 89, address: 'ул. Парковая, 1', coordinates: { lat: 55.7528, lng: 37.6143 } },
  { id: 4, name: 'Йога Центр "Баланс"', category: 'sport', rating: 4.6, reviews: 156, address: 'ул. Цветочная, 8', coordinates: { lat: 55.7588, lng: 37.6188 } },
  { id: 5, name: 'Organic Market', category: 'healthy-food', rating: 4.5, reviews: 98, address: 'ул. Садовая, 23', coordinates: { lat: 55.7548, lng: 37.6158 } },
  { id: 6, name: 'Тренажёрный зал "Сила"', category: 'sport', rating: 4.4, reviews: 203, address: 'пр. Строителей, 56', coordinates: { lat: 55.7568, lng: 37.6198 } },
];

const achievements: Achievement[] = [
  { id: 1, title: 'Первый шаг', description: 'Добавьте первую оценку', icon: 'Star', unlocked: true },
  { id: 2, title: 'Исследователь', description: 'Оцените 10 мест', icon: 'MapPin', unlocked: true, progress: 10 },
  { id: 3, title: 'Активист', description: 'Оцените 25 мест', icon: 'Trophy', unlocked: false, progress: 10 },
  { id: 4, title: 'Фотограф', description: 'Добавьте 5 фотографий', icon: 'Camera', unlocked: true },
  { id: 5, title: 'Эксперт', description: 'Получите 50 лайков на отзывы', icon: 'Heart', unlocked: false, progress: 23 },
  { id: 6, title: 'Лидер сообщества', description: 'Войдите в топ-10 рейтинга', icon: 'Award', unlocked: false },
];

const categoryConfig = {
  'healthy-food': { name: 'Здоровое питание', icon: 'Apple', color: 'bg-green-500', textColor: 'text-green-700' },
  'sport': { name: 'Спорт', icon: 'Dumbbell', color: 'bg-orange-500', textColor: 'text-orange-700' },
  'park': { name: 'Парки', icon: 'Trees', color: 'bg-emerald-500', textColor: 'text-emerald-700' },
  'alcohol': { name: 'Алкоголь', icon: 'Wine', color: 'bg-red-500', textColor: 'text-red-700' },
  'tobacco': { name: 'Табак', icon: 'Cigarette', color: 'bg-gray-500', textColor: 'text-gray-700' },
};

export default function Index() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfile, setShowProfile] = useState(false);

  const filteredLocations = mockLocations.filter(loc => {
    const matchesCategory = selectedCategory === 'all' || loc.category === selectedCategory;
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const userStats = {
    name: 'Александр Иванов',
    level: 7,
    points: 1240,
    nextLevelPoints: 1500,
    totalReviews: 23,
    photosAdded: 8,
    rank: 15,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-purple-50">
      <header className="bg-white/90 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 via-orange-500 to-purple-500 rounded-xl flex items-center justify-center animate-pulse-soft">
                <Icon name="Heart" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 via-orange-600 to-purple-600 bg-clip-text text-transparent">
                Карта Здоровья
              </h1>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowProfile(!showProfile)}
              className="relative"
            >
              <Avatar>
                <AvatarFallback className="bg-gradient-to-br from-green-500 to-orange-500 text-white">
                  АИ
                </AvatarFallback>
              </Avatar>
              {userStats.points >= 1000 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse-soft">
                  <Icon name="Star" size={12} className="text-yellow-900" />
                </div>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {!showProfile ? (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="MapPin" className="text-primary" />
                    Интерактивная карта
                  </CardTitle>
                  <CardDescription>
                    Все объекты инфраструктуры здоровья в вашем городе
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-green-100 to-orange-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      {mockLocations.map((loc) => (
                        <div
                          key={loc.id}
                          className="absolute w-3 h-3 bg-primary rounded-full animate-pulse-soft"
                          style={{
                            left: `${(loc.coordinates.lng - 37.61) * 2000}%`,
                            top: `${(loc.coordinates.lat - 55.75) * 2000}%`,
                          }}
                        />
                      ))}
                    </div>
                    <div className="text-center z-10">
                      <Icon name="Map" size={64} className="text-primary/40 mx-auto mb-4" />
                      <p className="text-muted-foreground">Интерактивная карта объектов</p>
                      <p className="text-sm text-muted-foreground">Найдено мест: {filteredLocations.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Объекты инфраструктуры</CardTitle>
                    <Badge variant="secondary">{filteredLocations.length} мест</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Icon name="Search" className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <Input
                        placeholder="Поиск мест..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedCategory === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory('all')}
                    >
                      Все
                    </Button>
                    {Object.entries(categoryConfig).map(([key, config]) => (
                      <Button
                        key={key}
                        variant={selectedCategory === key ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedCategory(key as Category)}
                        className="gap-2"
                      >
                        <Icon name={config.icon as any} size={16} />
                        {config.name}
                      </Button>
                    ))}
                  </div>

                  <div className="grid gap-4">
                    {filteredLocations.map((location) => {
                      const config = categoryConfig[location.category];
                      return (
                        <Card key={location.id} className="hover:shadow-lg transition-all hover:scale-[1.02] animate-scale-in">
                          <CardContent className="pt-6">
                            <div className="flex gap-4">
                              <div className={`w-16 h-16 ${config.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                <Icon name={config.icon as any} className="text-white" size={32} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <h3 className="font-semibold text-lg">{location.name}</h3>
                                  <Badge variant="secondary" className={config.textColor}>
                                    {config.name}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                                  <Icon name="MapPin" size={14} />
                                  {location.address}
                                </p>
                                <div className="flex items-center gap-4 mt-3">
                                  <div className="flex items-center gap-1">
                                    <Icon name="Star" className="text-yellow-500 fill-yellow-500" size={16} />
                                    <span className="font-semibold">{location.rating}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Icon name="MessageSquare" size={14} />
                                    <span>{location.reviews} отзывов</span>
                                  </div>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="ml-auto gap-1"
                                    onClick={() => navigate(`/rate/${location.id}`)}
                                  >
                                    <Icon name="Plus" size={16} />
                                    Оценить
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="animate-fade-in sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" className="text-secondary" />
                    Ваш прогресс
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-4">
                    <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent mb-2">
                      {userStats.level}
                    </div>
                    <p className="text-sm text-muted-foreground">Уровень активности</p>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">До следующего уровня</span>
                      <span className="font-semibold">{userStats.points}/{userStats.nextLevelPoints}</span>
                    </div>
                    <Progress value={(userStats.points / userStats.nextLevelPoints) * 100} className="h-3" />
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <Icon name="MessageSquare" className="text-green-600 mx-auto mb-1" size={20} />
                      <div className="text-xl font-bold">{userStats.totalReviews}</div>
                      <p className="text-xs text-muted-foreground">Отзывов</p>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <Icon name="Camera" className="text-orange-600 mx-auto mb-1" size={20} />
                      <div className="text-xl font-bold">{userStats.photosAdded}</div>
                      <p className="text-xs text-muted-foreground">Фото</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <Icon name="Award" className="text-purple-600 mx-auto mb-1" size={20} />
                      <div className="text-xl font-bold">#{userStats.rank}</div>
                      <p className="text-xs text-muted-foreground">Рейтинг</p>
                    </div>
                  </div>

                  <Button className="w-full gap-2" onClick={() => setShowProfile(true)}>
                    <Icon name="User" size={18} />
                    Мой профиль
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <Button variant="ghost" onClick={() => setShowProfile(false)} className="gap-2">
              <Icon name="ArrowLeft" size={18} />
              Вернуться к карте
            </Button>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-6">
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="bg-gradient-to-br from-green-500 via-orange-500 to-purple-500 text-white text-3xl">
                      АИ
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-3xl">{userStats.name}</CardTitle>
                    <CardDescription className="text-lg mt-2">
                      Уровень {userStats.level} • {userStats.points} баллов
                    </CardDescription>
                    <div className="flex gap-2 mt-4">
                      <Badge variant="secondary" className="gap-1">
                        <Icon name="Award" size={14} />
                        #{userStats.rank} в рейтинге
                      </Badge>
                      <Badge variant="secondary" className="gap-1">
                        <Icon name="Star" size={14} />
                        {achievements.filter(a => a.unlocked).length} достижений
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Достижения</CardTitle>
                <CardDescription>Получайте награды за активность</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <Card 
                      key={achievement.id} 
                      className={`transition-all ${achievement.unlocked ? 'border-primary bg-gradient-to-br from-green-50 to-orange-50' : 'opacity-60'}`}
                    >
                      <CardContent className="pt-6">
                        <div className="flex gap-4 items-start">
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            achievement.unlocked 
                              ? 'bg-gradient-to-br from-green-500 to-orange-500' 
                              : 'bg-gray-200'
                          }`}>
                            <Icon 
                              name={achievement.icon as any} 
                              className={achievement.unlocked ? 'text-white' : 'text-gray-400'} 
                              size={28} 
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold">{achievement.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {achievement.description}
                            </p>
                            {!achievement.unlocked && achievement.progress && (
                              <div className="mt-3">
                                <Progress value={(achievement.progress / 50) * 100} className="h-2" />
                                <p className="text-xs text-muted-foreground mt-1">
                                  Прогресс: {achievement.progress}/50
                                </p>
                              </div>
                            )}
                            {achievement.unlocked && (
                              <Badge variant="secondary" className="mt-2 gap-1">
                                <Icon name="Check" size={12} />
                                Получено
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>История активности</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: 'Оценил место "Зелёный Смузи"', time: '2 часа назад', points: 10, icon: 'Star' },
                    { action: 'Добавил фотографию в "FitLife Gym"', time: '5 часов назад', points: 15, icon: 'Camera' },
                    { action: 'Оставил отзыв о "Парк Здоровья"', time: '1 день назад', points: 20, icon: 'MessageSquare' },
                    { action: 'Получил достижение "Исследователь"', time: '2 дня назад', points: 50, icon: 'Award' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name={activity.icon as any} className="text-primary" size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                      <Badge variant="secondary" className="gap-1">
                        +{activity.points}
                        <Icon name="Zap" size={12} />
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}