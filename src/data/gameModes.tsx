// Görseller src/assets/categories klasöründen import ediliyor
// Bu yapı sayesinde TypeScript kontrolü ve build-time optimization sağlanır
import natureReal1 from '../assets/categories/nature/real/photo9.jpg';
import natureReal2 from '../assets/categories/nature/real/photo8.jpeg';
import natureAi1 from '../assets/categories/nature/ai/photo7.png';

import portraitReal1 from '../assets/categories/portrait/real/photo11.png';
import portraitReal2 from '../assets/categories/portrait/real/photo12.png';
import portraitAi1 from '../assets/categories/portrait/ai/photo10.png';

import archReal1 from '../assets/categories/architecture/real/photo5.webp';
import archReal2 from '../assets/categories/architecture/real/photo6.jpg';
import archAi1 from '../assets/categories/architecture/ai/photo4.png';

import animalReal1 from '../assets/categories/animals/real/photo2.webp';
import animalReal2 from '../assets/categories/animals/real/photo3.jpg';
import animalAi1 from '../assets/categories/animals/ai/photo1.png';

// Kategoriler
export const categories = [
  {
    id: 'nature',
    name: 'Doğa',
    description: 'Doğa manzaraları ve doğal ortamlar',
    icon: '🌳'
  },
  {
    id: 'portrait',
    name: 'Portre',
    description: 'İnsan portreleri ve yüz ifadeleri',
    icon: '👤'
  },
  {
    id: 'architecture',
    name: 'Mimari',
    description: 'Binalar, yapılar ve şehir manzaraları',
    icon: '🏗️'
  },
  {
    id: 'animals',
    name: 'Hayvanlar',
    description: 'Hayvanlar ve vahşi yaşam',
    icon: '🐾'
  },
  {
    id: 'mixed',
    name: 'Karışık',
    description: 'Tüm kategorilerden rastgele görseller',
    icon: '🎲'
  }
];

// Zorluk seviyeleri
export const difficultyLevels = [
  {
    id: 'easy',
    name: 'Kolay',
    description: 'İpucu sistemi açık, daha fazla süre',
    timeLimit: 30, // saniye
    hintsEnabled: true,
    rounds: 5,
    pointsMultiplier: 1,
    color: 'green'
  },
  {
    id: 'hard',
    name: 'Zor',
    description: 'İpucu sistemi kapalı, sınırlı süre',
    timeLimit: 15,
    hintsEnabled: false,
    rounds: 5,
    pointsMultiplier: 2,
    color: 'red'
  }
];

// Oyun modu kombinasyonu
export interface GameMode {
  category: typeof categories[0];
  difficulty: typeof difficultyLevels[0];
}

// Mock görseller - import edilmiş assets
export const mockImages = [
  // Doğa görselleri
  { id: 'nature-1', url: natureReal1, isAi: false, category: 'nature', hintText: 'Doğal ışık dağılımına dikkat et' },
  { id: 'nature-2', url: natureReal2, isAi: false, category: 'nature', hintText: 'Orman detaylarına bak' },
  { id: 'nature-ai-1', url: natureAi1, isAi: true, category: 'nature', hintText: 'AI genellikle mükemmel gölgeler üretir' },

  // Portre görselleri
  { id: 'portrait-1', url: portraitReal1, isAi: false, category: 'portrait', hintText: 'Cilt dokusuna dikkat et' },
  { id: 'portrait-2', url: portraitReal2, isAi: false, category: 'portrait', hintText: 'Göz detaylarına bak' },
  { id: 'portrait-ai-1', url: portraitAi1, isAi: true, category: 'portrait', hintText: 'AI yüzlerinde simetri arayabilir' },

  // Mimari görselleri
  { id: 'arch-1', url: archReal1, isAi: false, category: 'architecture', hintText: 'Bina oranlarına bak' },
  { id: 'arch-2', url: archReal2, isAi: false, category: 'architecture', hintText: 'Köprü yapısına odaklan' },
  { id: 'arch-ai-1', url: archAi1, isAi: true, category: 'architecture', hintText: 'AI binalarında oranlar mükemmel olabilir' },

  // Hayvan görselleri
  { id: 'animal-1', url: animalReal1, isAi: false, category: 'animals', hintText: 'Kürk dokusuna dikkat et' },
  { id: 'animal-2', url: animalReal2, isAi: false, category: 'animals', hintText: 'Hayvan davranışına bak' },
  { id: 'animal-ai-1', url: animalAi1, isAi: true, category: 'animals', hintText: 'AI hayvanlarında doğal davranışlar eksik olabilir' },
];

// Kategoriye göre görselleri filtrele
export function getImagesByCategory(categoryId: string) {
  if (categoryId === 'mixed') {
    return mockImages.filter(img => img.category !== 'mixed');
  }
  return mockImages.filter(img => img.category === categoryId || img.category === 'mixed');
}

// Round üretme fonksiyonu
export function generateRound(categoryId: string): { images: any[], aiIndex: number } {
  const categoryImages = getImagesByCategory(categoryId);

  const realImages = categoryImages.filter(img => !img.isAi);
  const aiImages = categoryImages.filter(img => img.isAi);

  if (realImages.length < 2 || aiImages.length < 1) {
    // Yeterli görsel yoksa karışık kategoriden kullan
    const mixedImages = getImagesByCategory('mixed');
    const mixedReal = mixedImages.filter(img => !img.isAi);
    const mixedAi = mixedImages.filter(img => img.isAi);

    const selectedReal = mixedReal.sort(() => 0.5 - Math.random()).slice(0, 2);
    const selectedAi = mixedAi[Math.floor(Math.random() * mixedAi.length)];

    const images = [...selectedReal, selectedAi].sort(() => 0.5 - Math.random());
    const aiIndex = images.findIndex(img => img.isAi);

    return { images, aiIndex };
  }

  // Normal durum
  const selectedReal = realImages.sort(() => 0.5 - Math.random()).slice(0, 2);
  const selectedAi = aiImages[Math.floor(Math.random() * aiImages.length)];

  const images = [...selectedReal, selectedAi].sort(() => 0.5 - Math.random());
  const aiIndex = images.findIndex(img => img.isAi);

  return { images, aiIndex };
}
