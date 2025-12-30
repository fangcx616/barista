import type { ZodiacConfig, MoodConfig, FortuneTeller } from '@/types'

// 1. Twelve Zodiac Signs Configuration (Horoscope)
export const zodiacConfigs: ZodiacConfig[] = [
    {
        id: 'aries',
        name: 'Aries',
        symbol: '♈',
        element: 'Fire',
        traits: ['Passionate', 'Bold', 'Direct', 'Energetic'],
        luckyColors: ['Crimson', 'Orange'],
        dates: '3.21-4.19'
    },
    {
        id: 'taurus',
        name: 'Taurus',
        symbol: '♉',
        element: 'Earth',
        traits: ['Reliable', 'Patient', 'Practical', 'Sensual'],
        luckyColors: ['Emerald', 'Rose'],
        dates: '4.20-5.20'
    },
    {
        id: 'gemini',
        name: 'Gemini',
        symbol: '♊',
        element: 'Air',
        traits: ['Versatile', 'Curious', 'Eloquent', 'Playful'],
        luckyColors: ['Yellow', 'Silver'],
        dates: '5.21-6.21'
    },
    {
        id: 'cancer',
        name: 'Cancer',
        symbol: '♋',
        element: 'Water',
        traits: ['Intuitive', 'Emotional', 'Nurturing', 'Protective'],
        luckyColors: ['White', 'Pearl'],
        dates: '6.22-7.22'
    },
    {
        id: 'leo',
        name: 'Leo',
        symbol: '♌',
        element: 'Fire',
        traits: ['Confident', 'Generous', 'Creative', 'Charismatic'],
        luckyColors: ['Gold', 'Amber'],
        dates: '7.23-8.22'
    },
    {
        id: 'virgo',
        name: 'Virgo',
        symbol: '♍',
        element: 'Earth',
        traits: ['Analytical', 'Precise', 'Systematic', 'Modest'],
        luckyColors: ['Navy', 'Grey'],
        dates: '8.23-9.22'
    },
    {
        id: 'libra',
        name: 'Libra',
        symbol: '♎',
        element: 'Air',
        traits: ['Diplomatic', 'Harmonic', 'Charming', 'Social'],
        luckyColors: ['Pink', 'Pale Blue'],
        dates: '9.23-10.23'
    },
    {
        id: 'scorpio',
        name: 'Scorpio',
        symbol: '♏',
        element: 'Water',
        traits: ['Mysterious', 'Intense', 'Focused', 'Powerful'],
        luckyColors: ['Burgundy', 'Black'],
        dates: '10.24-11.22'
    },
    {
        id: 'sagittarius',
        name: 'Sagittarius',
        symbol: '♐',
        element: 'Fire',
        traits: ['Adventurous', 'Optimistic', 'Philosophical', 'Free'],
        luckyColors: ['Purple', 'Dark Blue'],
        dates: '11.23-12.21'
    },
    {
        id: 'capricorn',
        name: 'Capricorn',
        symbol: '♑',
        element: 'Earth',
        traits: ['Ambitious', 'Disciplined', 'Grounded', 'Patient'],
        luckyColors: ['Black', 'Forest Green'],
        dates: '12.22-1.19'
    },
    {
        id: 'aquarius',
        name: 'Aquarius',
        symbol: '♒',
        element: 'Air',
        traits: ['Innovative', 'Original', 'Visionary', 'Independent'],
        luckyColors: ['Electric Blue', 'Silver'],
        dates: '1.20-2.18'
    },
    {
        id: 'pisces',
        name: 'Pisces',
        symbol: '♓',
        element: 'Water',
        traits: ['Dreamy', 'Artistic', 'Compassionate', 'Spiritual'],
        luckyColors: ['Seafoam', 'Lavender'],
        dates: '2.19-3.20'
    }
]

// 2. Emotional Vibration Configuration (Coffee Moods)
export const moodConfigs: MoodConfig[] = [
    {
        id: 'happy',
        name: 'Elevated',
        emoji: '🌟',
        color: 'text-yellow-500',
        cookingStyle: ['Light Roast', 'Fruity Notes', 'Sparkling Espresso', 'Pour-over'],
        description: 'Vibrant energy, perfect for bright and acidic profiles.'
    },
    {
        id: 'sad',
        name: 'Melancholy',
        emoji: '🌧️',
        color: 'text-blue-500',
        cookingStyle: ['Comforting Latte', 'Rich Mocha', 'Dark Roast', 'Heavy Body'],
        description: 'Needs a warm, velvety hug in a cup.'
    },
    {
        id: 'anxious',
        name: 'Restless',
        emoji: '🌀',
        color: 'text-orange-500',
        cookingStyle: ['Decaf Option', 'Herbal Infusion', 'Smooth Flat White', 'Low Temp'],
        description: 'Seek balance and calm with low-voltage caffeine.'
    },
    {
        id: 'tired',
        name: 'Exhausted',
        emoji: '😴',
        color: 'text-gray-500',
        cookingStyle: ['Double Espresso', 'Nitro Cold Brew', 'High Caffeine', 'Ristretto'],
        description: 'Requires a maximum energy boost to reignite the senses.'
    },
    {
        id: 'creative',
        name: 'Inspired',
        emoji: '🎨',
        color: 'text-purple-500',
        cookingStyle: ['Experimental Blend', 'Syrup Infusions', 'Cold Brew Tonic', 'AeroPress'],
        description: 'Energy is flowing, time for a unique signature brew.'
    },
    {
        id: 'focused',
        name: 'Deep Work',
        emoji: '💻',
        color: 'text-indigo-600',
        cookingStyle: ['Black Coffee', 'Long Black', 'Clean Extraction', 'Steady Drip'],
        description: 'Clarity is key. Pure, undistracted coffee flavor.'
    },
    {
        id: 'calm',
        name: 'Zen',
        emoji: '🧘',
        color: 'text-green-500',
        cookingStyle: ['Slow Drip', 'Balanced Medium Roast', 'Oat Milk Latte', 'Soft Brew'],
        description: 'Perfect harmony between mind and roast.'
    },
    {
        id: 'energetic',
        name: 'High Power',
        emoji: '⚡',
        color: 'text-red-500',
        cookingStyle: ['Shakerato', 'Cortado', 'Flash Chilled', 'V60'],
        description: 'Fast-paced and intense, matching your internal drive.'
    }
]

// 3. Oracle Personality & Mystical Phrases
export const fortuneTeller: FortuneTeller = {
    name: 'Artkoff Oracle',
    avatar: '🧿',
    greetings: [
        'Welcome to the Sanctuary of Aromatic Prophecy...',
        'The stars align over the roasted bean, let me read your fate...',
        'I see a vision in the golden crema...',
        'Destiny is brewing. Are you ready to see what is hidden?'
    ],
    phrases: {
        daily: {
            opening: [
                'Sensing the celestial alignment of today...',
                'The cosmic steam is rising from the cup...',
                'Universal vibrations are guiding your palate today...'
            ],
            closing: [
                'May this lucky brew bring clarity to your path...',
                'The stars have chosen your perfect extraction...',
                'Follow the aroma, it knows your destiny...'
            ],
            processing: [
                'Decoding the secrets of your constellation...',
                'Analyzing the planetary transit through the roast...',
                'Universal energy is concentrating into a single shot...'
            ]
        },
        mood: {
            opening: [
                'Let me feel the frequency of your aura...',
                'Your emotional spectrum is resonating with the beans...',
                'The color of your soul will dictate your brew...'
            ],
            closing: [
                'Let this healing extraction soothe your spirit...',
                'Coffee is the ultimate emotional alchemist...',
                'Sip away your worries, embrace the new vibration...'
            ],
            processing: [
                'Analyzing your emotional resonance...',
                'The mood spectrum is shifting...',
                'Stabilizing your energy with the perfect roast...'
            ]
        },
        couple: {
            opening: [
                'Sensing the synergy between two spirits...',
                'Two hearts beating in a single rhythm of steam...',
                'The sparks of connection are igniting the brew...'
            ],
            closing: [
                'May this shared blend strengthen your bond...',
                'In the art of brewing, discover each other...',
                'Your combined energy is the secret ingredient...'
            ],
            processing: [
                'Calculating your synastry in the portafilter...',
                'Weaving the threads of destiny between you...',
                'Measuring the extraction of harmony...'
            ]
        },
        number: {
            opening: [
                'Numbers are the sacred geometry of the bean...',
                'Let me unlock the code within your digit...',
                'Secret algorithms are hidden in the numbers...'
            ],
            closing: [
                'The frequency of this number brings luck to your cup...',
                'Let the digits guide your extraction parameters...',
                'A perfect mathematical match for your palate...'
            ],
            processing: [
                'Decoding the mystical power of your number...',
                'The numerical seed is germinating...',
                'Unlocking the universal code of coffee...'
            ]
        }
    },
    mysticalWords: [
        'The stars never lie; the crema never betrays.',
        'Find the truth in the depth of your cup.',
        'Every extraction is a pre-ordained moment in time.',
        'The palate is a bridge to the higher self.',
        'Wisdom is found in the balance of acidity and sweetness.',
        'Brewing is a sacred ritual of the now.',
        'Feel the rhythm of life in the steady drip.',
        'Every sip is a journey through your own destiny.'
    ]
}

// 4. Helper Functions
export const getZodiacById = (id: string): ZodiacConfig | undefined => {
    return zodiacConfigs.find(zodiac => zodiac.id === id)
}

// Animal config removed as requested.

export const getMoodById = (id: string): MoodConfig | undefined => {
    return moodConfigs.find(mood => mood.id === id)
}

export const getRandomMysticalWord = (): string => {
    const words = fortuneTeller.mysticalWords
    return words[Math.floor(Math.random() * words.length)]
}

export const getRandomGreeting = (): string => {
    const greetings = fortuneTeller.greetings
    return greetings[Math.floor(Math.random() * greetings.length)]
}