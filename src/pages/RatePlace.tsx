import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
  likes: number;
  photos?: string[];
}

const mockReviews: Review[] = [
  {
    id: 1,
    author: 'Елена Смирнова',
    rating: 5,
    date: '2 дня назад',
    comment: 'Отличное место! Очень вкусные смузи и приятная атмосфера. Персонал дружелюбный. Обязательно вернусь снова!',
    likes: 12,
  },
  {
    id: 2,
    author: 'Дмитрий Козлов',
    rating: 4,
    date: '1 неделю назад',
    comment: 'Хорошее заведение, но цены немного завышены. Качество продуктов на высоте.',
    likes: 8,
  },
  {
    id: 3,
    author: 'Мария Петрова',
    rating: 5,
    date: '2 недели назад',
    comment: 'Лучший зелёный смузи в городе! Всегда свежие ингредиенты. Рекомендую всем!',
    likes: 15,
  },
];

export default function RatePlace() {
  const { toast } = useToast();
  const [overallRating, setOverallRating] = useState(0);
  const [qualityRating, setQualityRating] = useState(0);
  const [serviceRating, setServiceRating] = useState(0);
  const [atmosphereRating, setAtmosphereRating] = useState(0);
  const [comment, setComment] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const place = {
    name: 'Зелёный Смузи',
    category: 'Здоровое питание',
    address: 'ул. Ленина, 45',
    rating: 4.8,
    reviews: 127,
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files);
      setPhotos([...photos, ...newPhotos].slice(0, 5));
    }
  };

  const handleSubmit = () => {
    if (overallRating === 0) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, поставьте общую оценку',
        variant: 'destructive',
      });
      return;
    }

    setShowSuccess(true);
    setTimeout(() => {
      toast({
        title: '🎉 Отзыв добавлен!',
        description: 'Вы получили +25 баллов за отзыв',
      });
      setShowSuccess(false);
      
      setOverallRating(0);
      setQualityRating(0);
      setServiceRating(0);
      setAtmosphereRating(0);
      setComment('');
      setPhotos([]);
    }, 2000);
  };

  const RatingSlider = ({ 
    rating, 
    onRate, 
    color = 'green'
  }: { 
    rating: number; 
    onRate: (value: number) => void; 
    color?: string;
  }) => {
    const colorClasses = {
      green: 'bg-gradient-to-r from-green-500 to-green-600',
      orange: 'bg-gradient-to-r from-orange-500 to-orange-600',
      purple: 'bg-gradient-to-r from-purple-500 to-purple-600',
    };

    return (
      <div className="space-y-3">
        <Slider
          value={[rating]}
          onValueChange={(values) => onRate(values[0])}
          max={5}
          step={0.1}
          className="w-full"
        />
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Icon
                key={star}
                name="Star"
                size={20}
                className={`transition-all ${
                  star <= Math.round(rating)
                    ? 'text-yellow-500 fill-yellow-500'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <div className={`text-2xl font-bold bg-clip-text text-transparent ${colorClasses[color as keyof typeof colorClasses]}`}>
            {rating.toFixed(1)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-purple-50">
      <header className="bg-white/90 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 via-orange-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Icon name="Heart" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 via-orange-600 to-purple-600 bg-clip-text text-transparent">
                Оценить место
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-6 animate-fade-in">
          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex gap-4 items-start">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Apple" className="text-white" size={32} />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{place.name}</h2>
                  <Badge variant="secondary" className="mt-2">
                    {place.category}
                  </Badge>
                  <p className="text-muted-foreground mt-2 flex items-center gap-1">
                    <Icon name="MapPin" size={14} />
                    {place.address}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      <Icon name="Star" className="text-yellow-500 fill-yellow-500" size={16} />
                      <span className="font-semibold">{place.rating}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {place.reviews} отзывов
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {showSuccess && (
            <Card className="border-2 border-green-500 bg-gradient-to-br from-green-50 to-orange-50 animate-scale-in">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-orange-500 rounded-full flex items-center justify-center mx-auto animate-pulse-soft">
                    <Icon name="Check" className="text-white" size={40} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Спасибо за отзыв!</h3>
                    <p className="text-muted-foreground">Вы получили +25 баллов</p>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xl font-bold text-green-600">
                    <Icon name="Zap" size={24} className="animate-pulse-soft" />
                    +25
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Star" className="text-primary" />
                Ваша оценка
              </CardTitle>
              <CardDescription>
                Поделитесь своим мнением о месте
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium">Общая оценка *</label>
                <RatingSlider
                  rating={overallRating}
                  onRate={setOverallRating}
                  color="green"
                />
              </div>

              <div className="space-y-6 pt-4 border-t">
                <div className="space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Icon name="Sparkles" size={16} className="text-green-600" />
                    Качество
                  </label>
                  <RatingSlider
                    rating={qualityRating}
                    onRate={setQualityRating}
                    color="green"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Icon name="Users" size={16} className="text-orange-600" />
                    Сервис
                  </label>
                  <RatingSlider
                    rating={serviceRating}
                    onRate={setServiceRating}
                    color="orange"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Icon name="Coffee" size={16} className="text-purple-600" />
                    Атмосфера
                  </label>
                  <RatingSlider
                    rating={atmosphereRating}
                    onRate={setAtmosphereRating}
                    color="purple"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <label className="text-sm font-medium">Комментарий</label>
                <Textarea
                  placeholder="Расскажите о вашем опыте посещения..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-32 resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Подробный отзыв поможет другим пользователям
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Icon name="Camera" size={16} />
                  Фотографии (до 5 штук)
                </label>
                
                {photos.length > 0 && (
                  <div className="grid grid-cols-5 gap-3">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-muted animate-scale-in">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          size="icon"
                          variant="destructive"
                          className="absolute top-1 right-1 w-6 h-6"
                          onClick={() => setPhotos(photos.filter((_, i) => i !== index))}
                        >
                          <Icon name="X" size={14} />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {photos.length < 5 && (
                  <label className="flex items-center justify-center gap-2 p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-all hover:border-primary">
                    <Icon name="Upload" size={20} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Загрузить фото
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </label>
                )}

                {photos.length > 0 && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Icon name="Gift" size={12} className="text-green-600" />
                    +5 баллов за каждое фото
                  </p>
                )}
              </div>

              <div className="pt-4 border-t">
                <Button
                  className="w-full gap-2 h-12 text-lg"
                  onClick={handleSubmit}
                  disabled={showSuccess}
                >
                  {showSuccess ? (
                    <>
                      <Icon name="Check" size={20} />
                      Отправлено!
                    </>
                  ) : (
                    <>
                      <Icon name="Send" size={20} />
                      Отправить отзыв
                    </>
                  )}
                </Button>

                <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-orange-50 rounded-lg">
                  <p className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Icon name="Trophy" size={16} className="text-green-600" />
                    Награды за отзыв:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                    <li>• +20 баллов за отзыв с оценкой</li>
                    <li>• +5 баллов за подробный комментарий</li>
                    <li>• +5 баллов за каждое фото</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Icon name="MessageSquare" className="text-primary" />
                  Отзывы посетителей
                </span>
                <Badge variant="secondary">{mockReviews.length} отзывов</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockReviews.map((review, index) => (
                  <Card key={review.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-gradient-to-br from-green-500 to-orange-500 text-white">
                            {review.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-semibold">{review.author}</h4>
                              <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Icon name="Star" className="text-yellow-500 fill-yellow-500" size={16} />
                              <span className="font-semibold">{review.rating}.0</span>
                            </div>
                          </div>
                          <p className="text-sm mt-3 text-muted-foreground">
                            {review.comment}
                          </p>
                          <div className="flex items-center gap-4 mt-3">
                            <Button variant="ghost" size="sm" className="gap-2 h-8">
                              <Icon name="ThumbsUp" size={14} />
                              <span className="text-xs">{review.likes}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-2 h-8">
                              <Icon name="Reply" size={14} />
                              <span className="text-xs">Ответить</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}