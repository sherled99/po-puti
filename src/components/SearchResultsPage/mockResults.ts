import { SearchResult } from "./SearchResultCard";

export const mockResults: SearchResult[] = [
  {
    id: 1,
    name: "Александр Бортиников",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=60",
    fromCity: "Баку",
    toCity: "Белград",
    travelDates: "7 дек, вт",
    packageSizes: ["XS", "S"],
    description:
      "Здравствуйте, лечу в гости к сестре, могу взять с собой небольшую посылку среднего размера S, по весу до 2-х килограммов. Небольшую посылку среднего размера S, по весу до 2-х килограммов.",
    reward: "За денежное вознаграждение",
    rating: 4.9,
    reviews: 8,
    verified: true,
    publishedAt: "09.08.24",
  },
  {
    id: 2,
    name: "Екатерина Варнава",
    avatar: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=60",
    fromCity: "Баку",
    toCity: "Белград",
    travelDates: "7 дек, вт",
    packageSizes: ["XS"],
    description:
      "Лечу к друзьям, могу взять коробку небольшого размера или документы. Всегда на связи и отправлю фото при вручении.",
    reward: "За денежное вознаграждение",
    rating: 4.8,
    reviews: 11,
    verified: true,
    publishedAt: "08.08.24",
  },
  {
    id: 3,
    name: "Михаил Шешков",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=60",
    fromCity: "Баку",
    toCity: "Белград",
    travelDates: "8 дек, ср",
    packageSizes: ["XS", "S", "M"],
    description:
      "Регулярно летаю по маршруту Баку — Белград. Бережно отношусь к посылкам, заберу и привезу в удобное время, есть опыт перевозки хрупких вещей.",
    reward: "За денежное вознаграждение",
    rating: 5,
    reviews: 21,
    verified: true,
    publishedAt: "08.08.24",
  },
  {
    id: 4,
    name: "Анна Соколова",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=60",
    fromCity: "Баку",
    toCity: "Белград",
    travelDates: "9 дек, чт",
    packageSizes: ["XS", "S", "M"],
    description:
      "Еду к родителям, могу забрать заранее, есть возможность забрать курьером по городу. Сообщу о каждом этапе доставки.",
    reward: "За денежное вознаграждение",
    rating: 4.7,
    reviews: 9,
    verified: false,
    publishedAt: "07.08.24",
  },
  {
    id: 5,
    name: "Игорь Тихонов",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=60",
    fromCity: "Баку",
    toCity: "Белград",
    travelDates: "10 дек, пт",
    packageSizes: ["XS", "S"],
    description:
      "Часто совмещаю поездки с доставкой небольших посылок. Могу встретиться в аэропорту и выдать лично.",
    reward: "За денежное вознаграждение",
    rating: 4.6,
    reviews: 6,
    verified: false,
    publishedAt: "06.08.24",
  },
];

export function getSearchResultById(id: number): SearchResult | undefined {
  return mockResults.find((item) => item.id === id);
}
