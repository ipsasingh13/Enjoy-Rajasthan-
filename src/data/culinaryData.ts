export interface CulinaryDish {
  id: string;
  name: string;
  type: 'Vegetarian' | 'Non-Vegetarian' | 'Sweet' | 'Snack' | 'Beverage';
  description: string;
  famousAt: string;
  specialityTag?: string;
}

export interface CityCulinaryInfo {
  cityName: string;
  tagline: string;
  dishes: CulinaryDish[];
}

export const CITY_CULINARY_DATABASE: Record<string, CityCulinaryInfo> = {
  'Jaipur': {
    cityName: 'Jaipur',
    tagline: 'The Pink City — World famous for crisp kachoris, royal malai ghevar & fiery Laal Maas',
    dishes: [
      {
        id: 'jaipur-pyaaz-kachori',
        name: 'Pyaaz Kachori',
        type: 'Snack',
        description: 'Crispy deep-fried golden pastry filled with a hot, spiced onion & garlic mash.',
        famousAt: 'Rawat Mishthan Bhandar (Station Road)',
        specialityTag: 'Iconic Street Food'
      },
      {
        id: 'jaipur-ghevar',
        name: 'Rabri / Malai Ghevar',
        type: 'Sweet',
        description: 'Honeycomb disc sweet soaked in saffron sugar syrup, topped with rich Rabri & pistachios.',
        famousAt: 'LMB - Laxmi Mishthan Bhandar (Johari Bazaar)',
        specialityTag: 'Royal Festival Dessert'
      },
      {
        id: 'jaipur-dal-baati-churma',
        name: 'Dal Baati Churma',
        type: 'Vegetarian',
        description: 'Coal-baked wheat balls crushed in pure desi ghee, served with panchmel dal & sweet churma.',
        famousAt: 'Chokhi Dhani & Handi Restaurant (MI Road)',
        specialityTag: 'Quintessential Rajasthani Meal'
      },
      {
        id: 'jaipur-laal-maas',
        name: 'Royal Laal Maas',
        type: 'Non-Vegetarian',
        description: 'Mutton slow-cooked in a fiery thick gravy prepared with Mathania red chilis & garlic.',
        famousAt: 'Handi & Spice Court (Civil Lines)',
        specialityTag: 'Rajput Royalty Recipe'
      }
    ]
  },
  'Jodhpur': {
    cityName: 'Jodhpur',
    tagline: 'The Sun City — Home of fiery Mirchi Badas, Mawa Kachoris & thick Makhani Lassi',
    dishes: [
      {
        id: 'jodhpur-mirchi-bada',
        name: 'Jodhpuri Mirchi Bada',
        type: 'Snack',
        description: 'Large green chili stuffed with spicy potato mash, batter-fried golden crisp.',
        famousAt: 'Janta Sweet Home (Clock Tower)',
        specialityTag: 'Must-Try Jodhpur Snack'
      },
      {
        id: 'jodhpur-mawa-kachori',
        name: 'Mawa Kachori',
        type: 'Sweet',
        description: 'Sweet kachori stuffed with rich reduced milk (khoya) and dry fruits, dipped in sugar syrup.',
        famousAt: 'Rawat Sweets & Janta Sweet Home',
        specialityTag: 'Invented in Jodhpur'
      },
      {
        id: 'jodhpur-makhani-lassi',
        name: 'Makhani Lassi',
        type: 'Beverage',
        description: 'Thick creamy yogurt drink served in clay kulhad with saffron syrup and a lump of white butter.',
        famousAt: 'Shri Mishrilal Hotel (Sardar Market)',
        specialityTag: 'Legendary Heritage Drink'
      },
      {
        id: 'jodhpur-shahi-samosa',
        name: 'Shahi Samosa',
        type: 'Snack',
        description: 'Crispy samosa filled with paneer, cashews, raisins, and spicy potatoes.',
        famousAt: 'Shahi Samosa (Clock Tower)',
        specialityTag: 'Royal Street Treat'
      }
    ]
  },
  'Udaipur': {
    cityName: 'Udaipur',
    tagline: 'The City of Lakes — Celebrated for Mewari Dal Baati, Dil Jani sweets & lakeside Kulhad Coffee',
    dishes: [
      {
        id: 'udaipur-mewari-dal-baati',
        name: 'Mewari Dal Baati Thali',
        type: 'Vegetarian',
        description: 'Smoky tandoori baati served with 3 varieties of sweet Churma (Rose, Dry Fruit & Besan).',
        famousAt: 'Krishna Dal Bati Purohit & Natraj Thali',
        specialityTag: 'Authentic Mewar Style'
      },
      {
        id: 'udaipur-dil-jani',
        name: 'Dil Jani Sweet',
        type: 'Sweet',
        description: 'Rare traditional Udaipur sweet made of small orange pearls soaked in cardamom sugar syrup.',
        famousAt: 'Jagdish Chowk Heritage Sweets',
        specialityTag: 'Udaipur Royal Specialty'
      },
      {
        id: 'udaipur-gatte-ki-sabzi',
        name: 'Gatte Ki Sabzi',
        type: 'Vegetarian',
        description: 'Tender gram flour dumplings simmered in a rich, spiced curd gravy with aromatic tempering.',
        famousAt: 'Millets of Mewar (Hanuman Ghat)',
        specialityTag: 'Comfort Heritage Dish'
      },
      {
        id: 'udaipur-kulhad-coffee',
        name: 'Lakeside Kulhad Coffee',
        type: 'Beverage',
        description: 'Hot frothy coffee brewed with spices and served in terracotta clay cups overlooking Pichola.',
        famousAt: 'Vinayak Kulhad Coffee (Panchwati)',
        specialityTag: 'Sunset Lake Favorite'
      }
    ]
  },
  'Jaisalmer': {
    cityName: 'Jaisalmer',
    tagline: 'The Golden Citadel — Known for Gatte ki Khichdi, Ker Sangri & golden fort lassis',
    dishes: [
      {
        id: 'jaisalmer-gatte-khichdi',
        name: 'Gatte Ki Khichdi',
        type: 'Vegetarian',
        description: 'Fragrant Basmati rice cooked with spiced gram flour dumplings, ghee, and roasted cumin.',
        famousAt: 'The Trio (Fort Complex)',
        specialityTag: 'Desert Comfort Special'
      },
      {
        id: 'jaisalmer-ker-sangri',
        name: 'Ker Sangri Thali',
        type: 'Vegetarian',
        description: 'Wild desert berries (Ker) and dried beans (Sangri) stir-fried in mustard oil with Thar spices.',
        famousAt: 'Desert Boy\'s Dhani',
        specialityTag: 'Authentic Thar Desert Dish'
      },
      {
        id: 'jaisalmer-makhania-lassi',
        name: 'Fort Makhania Lassi',
        type: 'Beverage',
        description: 'Ultra-thick cardamom-flavored sweet yogurt served inside the Golden Fort walls.',
        famousAt: 'Kanchan Shree Lassi Shop (Fort Gate)',
        specialityTag: 'Thar Refreshment'
      },
      {
        id: 'jaisalmer-murgh-zamin',
        name: 'Murgh-e-Zamin',
        type: 'Non-Vegetarian',
        description: 'Herbed chicken wrapped in leaves and slow-cooked in an underground sand pit oven.',
        famousAt: 'Jaisalmer Heritage Roof Top Restaurants',
        specialityTag: 'Ancient Royal Recipe'
      }
    ]
  },
  'Bikaner': {
    cityName: 'Bikaner',
    tagline: 'The Desert Craft Hub — Legendary origin of crispy Bikaneri Bhujia, Rasgullas & Khasta Kachori',
    dishes: [
      {
        id: 'bikaner-bhujia',
        name: 'Bikaneri Bhujia',
        type: 'Snack',
        description: 'World-famous crunchy snack made from moth bean flour, black pepper, and spices.',
        famousAt: 'Bikaji & Haldiram\'s Original Outlets (Station Rd)',
        specialityTag: 'GI-Tagged Global Snack'
      },
      {
        id: 'bikaner-rasgulla',
        name: 'Bikaneri Saffron Rasgulla',
        type: 'Sweet',
        description: 'Spongy chhana balls soaked in light saffron sugar syrup.',
        famousAt: 'Chotu Motu Joshi Sweet Shop',
        specialityTag: 'Bikaner Heritage Sweet'
      },
      {
        id: 'bikaner-khasta-kachori',
        name: 'Khasta Kachori with Kadhi',
        type: 'Snack',
        description: 'Extra crispy lentil pastry served drenched in hot, tangy yogurt curry.',
        famousAt: 'Station Road Heritage Sweet Stalls',
        specialityTag: 'Local Favorite Breakfast'
      }
    ]
  },
  'Pushkar': {
    cityName: 'Pushkar',
    tagline: 'The Holy Lake Town — Famous for sweet saffron Rabri Malpua, Damask Rose sherbet & Falafel',
    dishes: [
      {
        id: 'pushkar-malpua',
        name: 'Rabri Malpua',
        type: 'Sweet',
        description: 'Golden deep-fried pancakes soaked in saffron sugar syrup and smothered with thick rabri.',
        famousAt: 'Halwai Gali (Near Main Market)',
        specialityTag: 'Sacred Pushkar Sweet'
      },
      {
        id: 'pushkar-rose-sharbat',
        name: 'Pushkar Rose Sharbat',
        type: 'Beverage',
        description: 'Cooling floral drink made from Pushkar\'s famed local Damask roses.',
        famousAt: 'Pushkar Lake Ghat Beverage Stalls',
        specialityTag: 'Made from Local Roses'
      },
      {
        id: 'pushkar-falafel',
        name: 'Pushkar Falafel Wrap',
        type: 'Snack',
        description: 'Crispy chickpea patties wrapped in warm pita with hummus and fresh salad.',
        famousAt: 'Ganga Laffa & Falafel Stalls',
        specialityTag: 'Global Traveler Fusion'
      }
    ]
  },
  'Mount Abu': {
    cityName: 'Mount Abu',
    tagline: 'Rajasthan\'s Hill Station — Renowned for claypot Rabri, chilled Kulfi & mountain thalis',
    dishes: [
      {
        id: 'abu-rabri-kulfi',
        name: 'Chundawat Rabri & Kulfi',
        type: 'Sweet',
        description: 'Slow-boiled sweetened milk served ice cold in clay cups with dry fruit toppings.',
        famousAt: 'Nakki Lake Promenade Shops',
        specialityTag: 'Hill Station Treat'
      },
      {
        id: 'abu-dal-baati',
        name: 'Highland Dal Baati Thali',
        type: 'Vegetarian',
        description: 'Piping hot ghee-soaked baatis served with spicy lentils and fresh mint chutney.',
        famousAt: 'Arbuda Restaurant (Main Market)',
        specialityTag: 'Mountain Climate Favorite'
      }
    ]
  },
  'Ranthambore': {
    cityName: 'Ranthambore',
    tagline: 'The Wild Tiger Realm — Known for fresh Sawai Guava Barfi & safari ranger-style Laal Maas',
    dishes: [
      {
        id: 'ranthambore-amrood-barfi',
        name: 'Sawai Guava (Amrood) Barfi',
        type: 'Sweet',
        description: 'Unique sweet crafted from ripe local red guavas, cardamom, and mawa.',
        famousAt: 'Sawai Madhopur Local Market Stalls',
        specialityTag: 'Guava Capital Specialty'
      },
      {
        id: 'ranthambore-wild-laal-maas',
        name: 'Safari Ranger Laal Maas',
        type: 'Non-Vegetarian',
        description: 'Fiery game-style mutton stew slow cooked over woodfire with whole red chilis.',
        famousAt: 'Royal Tiger Resorts & Sawai Dhabas',
        specialityTag: 'Ranger Heritage Recipe'
      }
    ]
  },
  'Chittorgarh': {
    cityName: 'Chittorgarh',
    tagline: 'Land of Heroic Forts — Famous for spicy Chittori Mirchi Pakodas & Panchmel Dal',
    dishes: [
      {
        id: 'chittor-mirchi-pakoda',
        name: 'Chittori Mirchi Pakoda',
        type: 'Snack',
        description: 'Spicy chili fritters served with tangy sweet tamarind & coriander chutneys.',
        famousAt: 'Fort Road Local Eateries',
        specialityTag: 'Fort Gate Street Snack'
      },
      {
        id: 'chittor-panchmel-dal',
        name: 'Panchmel Dal Baati',
        type: 'Vegetarian',
        description: 'Five-lentil curry seasoned with ghee and cloves, paired with roasted baatis.',
        famousAt: 'Local Fort Heritage Dhabas',
        specialityTag: 'Warrior Energy Meal'
      }
    ]
  },
  'Ajmer': {
    cityName: 'Ajmer',
    tagline: 'Spiritual Heritage Hub — World renowned for Sohan Halwa & aromatic Dargah Mutton Korma',
    dishes: [
      {
        id: 'ajmer-sohan-halwa',
        name: 'Ajmer Sohan Halwa',
        type: 'Sweet',
        description: 'Dense, chewy golden disc sweet loaded with almonds, pistachios, and saffron.',
        famousAt: 'Azad Sweets (Dargah Bazaar)',
        specialityTag: 'Centuries-Old Halwa'
      },
      {
        id: 'ajmer-mutton-korma',
        name: 'Dargah Bazaar Mutton Korma',
        type: 'Non-Vegetarian',
        description: 'Aromatic mutton curry infused with kewra water, cooked slow in large copper cauldrons.',
        famousAt: 'Dargah Market Traditional Eateries',
        specialityTag: 'Sufi Heritage Recipe'
      }
    ]
  },
  'Kota': {
    cityName: 'Kota',
    tagline: 'The Chambal City — Famous across India for extra crispy Asafoetida (Hing) Kachori',
    dishes: [
      {
        id: 'kota-hing-kachori',
        name: 'Kota Hing Kachori',
        type: 'Snack',
        description: 'Distinctive extra-flaky kachori packed with roasted urad dal and potent hing spice.',
        famousAt: 'Suwalal & Ratan Sev Bhandar (Rampura)',
        specialityTag: 'Famous India-Wide'
      }
    ]
  },
  'Alwar': {
    cityName: 'Alwar',
    tagline: 'Gateway to Shekhawati — Home of the original Alwar Milk Cake (Kalakand)',
    dishes: [
      {
        id: 'alwar-kalakand',
        name: 'Alwar Ka Kalakand (Mawa)',
        type: 'Sweet',
        description: 'Rich granular caramelized milk cake with a melt-in-mouth texture and cardamom note.',
        famousAt: 'Baba Thakur Das & Sons (Hope Circus)',
        specialityTag: 'Original 1947 Heritage Sweet'
      }
    ]
  },
  'Bharatpur': {
    cityName: 'Bharatpur',
    tagline: 'The Bird Sanctuary City — Famous for Bedmi Puri & spicy Aloo Sabzi',
    dishes: [
      {
        id: 'bharatpur-bedmi-puri',
        name: 'Bedmi Puri & Aloo Sabzi',
        type: 'Vegetarian',
        description: 'Deep-fried coarse lentil puris served with hot, spicy sour potato curry.',
        famousAt: 'Laxmi Mandir Eateries',
        specialityTag: 'Classic Morning Breakfast'
      }
    ]
  }
};

export const DEFAULT_RAJASTHAN_CULINARY: CityCulinaryInfo = {
  cityName: 'Rajasthan',
  tagline: 'The Royal Cuisine of Rajasthan — Rich ghee-based curries, savory snacks & regal sweets',
  dishes: [
    {
      id: 'default-dal-baati',
      name: 'Dal Baati Churma',
      type: 'Vegetarian',
      description: 'The national dish of Rajasthan: hard wheat rolls baked over coal, served with mixed lentils & sweet churma.',
      famousAt: 'Authentic Rajasthani Thali Restaurants across Rajasthan',
      specialityTag: 'Royal Heritage Classic'
    },
    {
      id: 'default-pyaaz-kachori',
      name: 'Pyaaz Kachori',
      type: 'Snack',
      description: 'Golden fried flaky pastry with spicy onion stuffing, served with tamarind chutney.',
      famousAt: 'Leading sweet shops in Jaipur, Jodhpur & Udaipur',
      specialityTag: 'Iconic Street Snack'
    },
    {
      id: 'default-gatte-sabzi',
      name: 'Gatte Ki Sabzi',
      type: 'Vegetarian',
      description: 'Gram flour dumplings simmered in a rich, tangy yogurt curry seasoned with mustard & cumin.',
      famousAt: 'Traditional dhabas & heritage hotels across Rajasthan',
      specialityTag: 'Desert Comfort Food'
    },
    {
      id: 'default-laal-maas',
      name: 'Royal Laal Maas',
      type: 'Non-Vegetarian',
      description: 'Fiery mutton curry slow-cooked with Mathania red chilis, ghee, and garlic.',
      famousAt: 'Heritage dining halls across Rajasthan',
      specialityTag: 'Rajput Royalty Curry'
    }
  ]
};

export function getCityCulinaryHighlights(city: string): CityCulinaryInfo {
  if (!city) return DEFAULT_RAJASTHAN_CULINARY;
  
  const cleanCity = city.trim();
  
  // Exact match
  if (CITY_CULINARY_DATABASE[cleanCity]) {
    return CITY_CULINARY_DATABASE[cleanCity];
  }

  // Case-insensitive / partial match
  const foundKey = Object.keys(CITY_CULINARY_DATABASE).find(
    k => k.toLowerCase() === cleanCity.toLowerCase() || cleanCity.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(cleanCity.toLowerCase())
  );

  if (foundKey) {
    return CITY_CULINARY_DATABASE[foundKey];
  }

  return {
    ...DEFAULT_RAJASTHAN_CULINARY,
    cityName: cleanCity
  };
}

export function detectCityFromAttraction(attractionName: string): string {
  if (!attractionName) return 'Jaipur';
  const name = attractionName.toLowerCase();

  if (name.includes('jaipur') || name.includes('amer') || name.includes('hawa mahal') || name.includes('nahargarh') || name.includes('jaigarh') || name.includes('khatu')) return 'Jaipur';
  if (name.includes('udaipur') || name.includes('pichola') || name.includes('saheliyon') || name.includes('sajjangarh') || name.includes('fateh') || name.includes('jag mandir')) return 'Udaipur';
  if (name.includes('jodhpur') || name.includes('mehrangarh') || name.includes('jaswant') || name.includes('umaid bhawan') || name.includes('mandore')) return 'Jodhpur';
  if (name.includes('jaisalmer') || name.includes('patwon') || name.includes('sam sand') || name.includes('thar') || name.includes('gadisar')) return 'Jaisalmer';
  if (name.includes('mount abu') || name.includes('dilwara') || name.includes('nakki')) return 'Mount Abu';
  if (name.includes('pushkar') || name.includes('brahma')) return 'Pushkar';
  if (name.includes('bikaner') || name.includes('junagarh') || name.includes('karni mata') || name.includes('rampuria')) return 'Bikaner';
  if (name.includes('ranthambore') || name.includes('sawai') || name.includes('kumbhalgarh')) return 'Ranthambore';
  if (name.includes('chittorgarh') || name.includes('vijay stambha')) return 'Chittorgarh';
  if (name.includes('ajmer') || name.includes('dargah') || name.includes('ana sagar')) return 'Ajmer';
  if (name.includes('alwar') || name.includes('bhangarh') || name.includes('sariska')) return 'Alwar';
  if (name.includes('mandawa') || name.includes('murmuria') || name.includes('shekhawati')) return 'Mandawa';
  if (name.includes('kota') || name.includes('chambal') || name.includes('seven wonders')) return 'Kota';
  if (name.includes('bundi') || name.includes('taragarh') || name.includes('raniji ki baori')) return 'Bundi';
  if (name.includes('bharatpur') || name.includes('keoladeo') || name.includes('lohagarh')) return 'Bharatpur';
  if (name.includes('jhalawar') || name.includes('gagron') || name.includes('kolvi')) return 'Jhalawar';

  return 'Jaipur';
}
