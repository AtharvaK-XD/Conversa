import type { Scenario } from '../types/scenario';
import type { DebriefSession } from '../types/debrief';

export const mockScenarios: Scenario[] = [
  {
    id: 'chai-stall',
    name: 'Ahmedabad Chai Stall',
    difficulty: 'Easy',
    targetLanguage: ['Gujarati', 'Hindi'],
    persona: {
      id: 'karan-bhai',
      name: 'Karan Bhai',
      role: 'Chai Vendor',
      location: 'Ahmedabad, Gujarat',
      avatarUrl: '',
      avatarSeed: 'karan',
      bio: 'A friendly but extremely busy chai vendor near Lal Darwaja, known for his ginger-cardamom cutting chai.'
    },
    description: 'Order a cup of hot cutting chai and ask about the local snacks available.',
    promptGuideline: 'You need to ask for a half-cutting ginger chai and request some warm maska bun.'
  },
  {
    id: 'market-haggling',
    name: 'Mumbai Market Haggling',
    difficulty: 'Medium',
    targetLanguage: ['Hindi', 'English'],
    persona: {
      id: 'ramesh-lal',
      name: 'Ramesh Lal',
      role: 'Shopkeeper',
      location: 'Colaba Causeway, Mumbai',
      avatarUrl: '',
      avatarSeed: 'ramesh',
      bio: 'A veteran handicraft and clothing vendor who is a tough negotiator but loves a good bargaining conversation.'
    },
    description: 'Negotiate the price of a traditional embroidered jacket that starts at 1,200 Rupees.',
    promptGuideline: 'Try to bargain the price down to 700 Rupees by pointing out minor flaws or comparing shop prices.'
  },
  {
    id: 'job-interview',
    name: 'Bengaluru Tech Interview',
    difficulty: 'Hard',
    targetLanguage: ['English'],
    persona: {
      id: 'shruti-hegde',
      name: 'Shruti Hegde',
      role: 'Technical Lead',
      location: 'Indiranagar, Bengaluru',
      avatarUrl: '',
      avatarSeed: 'shruti',
      bio: 'A sharp, no-nonsense Engineering Manager at a top AI startup, interviewing you for a Senior Software Engineer position.'
    },
    description: 'Undergo a high-pressure coding interview explaining your choices in React state management.',
    promptGuideline: 'Explain the trade-offs of using Context API versus custom hooks or external state libraries like Zustand.'
  },
  {
    id: 'rickshaw-ride',
    name: 'Vadodara Rickshaw Ride',
    difficulty: 'Easy',
    targetLanguage: ['Gujarati'],
    persona: {
      id: 'babubhai',
      name: 'Babubhai',
      role: 'Auto Driver',
      location: 'Vadodara Station, Gujarat',
      avatarUrl: '',
      avatarSeed: 'babubhai',
      bio: 'A senior auto-rickshaw driver who has been navigating the streets of Vadodara for 35 years and loves sharing historical stories.'
    },
    description: 'Hire an auto-rickshaw to take you to Laxmi Vilas Palace and agree on the fare using a meter.',
    promptGuideline: 'Request Babubhai to go by the meter fare, or negotiate a flat rate if he refuses.'
  }
];

export interface MockDialogueTurn {
  userSpeech: string;
  userTranslation: string;
  personaResponse: string;
  personaTranslation: string;
}

export const mockDialogues: Record<string, Record<string, MockDialogueTurn[]>> = {
  'chai-stall': {
    'Gujarati': [
      {
        userSpeech: 'કેમ છો કરણભાઈ! એક આદુવાળી ચા આપો ને.',
        userTranslation: 'How are you Karan Bhai! Please give me one ginger tea.',
        personaResponse: 'બસ મજામાં! એકદમ ગરમાગરમ ચા બનાવું છું. આદુ અને ઇલાયચી બંને નાખું ને?',
        personaTranslation: 'Just fine! I am making hot tea. Shall I put both ginger and cardamom?'
      },
      {
        userSpeech: 'હા, બંને નાખો. સાથે ખાવામાં શું મળશે?',
        userTranslation: 'Yes, put both. What is available to eat with it?',
        personaResponse: 'ગરમાગરમ મસ્કા બન અને ગાંઠિયા છે. મસ્કા બન સાથે માખણ વધુ નાખું?',
        personaTranslation: 'Hot bun maska and gathiya are here. Should I put extra butter with the bun maska?'
      },
      {
        userSpeech: 'હા કરણભાઈ, માખણ થોડું વધારે નાખજો. બિલ કેટલું થયું?',
        userTranslation: 'Yes Karan Bhai, put a little more butter. How much is the bill?',
        personaResponse: 'થઈ ગયું હો! ચા ના ૨૦ રૂપિયા અને મસ્કા બન ના ૩૦ રૂપિયા. કુલ ૫૦ રૂપિયા થયા.',
        personaTranslation: 'It is ready! 20 rupees for the tea and 30 rupees for the bun maska. Total is 50 rupees.'
      }
    ],
    'Hindi': [
      {
        userSpeech: 'नमस्ते करन भाई! एक कड़क अदरक वाली चाय देना।',
        userTranslation: 'Namaste Karan Bhai! Give me one strong ginger tea.',
        personaResponse: 'नमस्ते भाईसाब! अभी बनाता हूँ एकदम मसाला मार के। शक्कर कम या ज़्यादा?',
        personaTranslation: 'Namaste brother! Making it right now with extra spices. Less sugar or more?'
      },
      {
        userSpeech: 'शक्कर मध्यम रखना। खाने में क्या-क्या है आपके पास?',
        userTranslation: 'Keep sugar medium. What all do you have to eat?',
        personaResponse: 'ताज़ा मस्का बन और फाफड़ा-जलेबी है। मस्का बन मक्खन लगा के गरम कर दूँ?',
        personaTranslation: 'Fresh bun maska and fafda-jalebi. Should I warm up the bun maska with butter?'
      },
      {
        userSpeech: 'हाँ, मस्का बन दे दीजिए। कुल कितना पैसा हुआ?',
        userTranslation: 'Yes, give me bun maska. How much is the total money?',
        personaResponse: 'चाय के २० रुपये और मस्का बन के ३० रुपये। टोटल ५० रुपये हुए भाईजी।',
        personaTranslation: '20 rupees for tea and 30 rupees for bun maska. Total is 50 rupees, brother.'
      }
    ]
  },
  'market-haggling': {
    'Hindi': [
      {
        userSpeech: 'भाई साहब, ये जैकेट कितने की है?',
        userTranslation: 'Brother, how much is this jacket?',
        personaResponse: 'अरे साहब, एकदम प्योर कश्मीरी कढ़ाई का काम है! सिर्फ १२-सौ रुपये का है आपके लिए।',
        personaTranslation: 'Oh sir, this is pure Kashmiri embroidery work! Only 1,200 rupees for you.'
      },
      {
        userSpeech: '१२-सौ तो बहुत ज़्यादा हैं। इसमें धागा भी निकल रहा है। ७०० रुपये में दोगे?',
        userTranslation: '1,200 is too much. The thread is also coming out. Will you give it for 700 rupees?',
        personaResponse: 'क्या बात कर रहे हैं साहब! इतनी महीन कारीगरी है। धागा नहीं वो डिज़ाइन है। चलो, आपके लिए १००० कर दूंगा।',
        personaTranslation: 'What are you saying sir! Such fine workmanship. That is not thread, that is design. Okay, I will make it 1000 for you.'
      },
      {
        userSpeech: '८०० रुपये आखिरी है, वरना मैं दूसरी दुकान पर देखता हूँ।',
        userTranslation: '800 rupees is final, otherwise I will check another shop.',
        personaResponse: 'अरे अरे रुकिए! बोहनी का वक़्त है, नुकसान में दे रहा हूँ। चलिए ८५० दे दीजिए और जैकेट ले जाइए।',
        personaTranslation: 'Hey, wait! It is the first sale of the day, I am giving it at a loss. Okay, give 850 and take the jacket.'
      }
    ],
    'English': [
      {
        userSpeech: 'Hello, how much is this embroidered jacket?',
        userTranslation: 'Hello, how much is this embroidered jacket?',
        personaResponse: 'Welcome sir! This is premium hand-stitched craft. Only 1,200 Rupees.',
        personaTranslation: 'Welcome sir! This is premium hand-stitched craft. Only 1,200 Rupees.'
      },
      {
        userSpeech: 'That is quite expensive. There is a loose thread here. Can you do 700?',
        userTranslation: 'That is quite expensive. There is a loose thread here. Can you do 700?',
        personaResponse: 'No way sir, this is pure wool. I can reduce to 1,000 for you, final price.',
        personaTranslation: 'No way sir, this is pure wool. I can reduce to 1,000 for you, final price.'
      },
      {
        userSpeech: 'My final offer is 800, otherwise I will look at the next stall.',
        userTranslation: 'My final offer is 800, otherwise I will look at the next stall.',
        personaResponse: 'Ah, okay, early morning customer. Let us meet in the middle at 850 Rupees. Take it.',
        personaTranslation: 'Ah, okay, early morning customer. Let us meet in the middle at 850 Rupees. Take it.'
      }
    ]
  },
  'job-interview': {
    'English': [
      {
        userSpeech: 'I prefer using React Context for global state when dealing with minor theme toggles or user profiles.',
        userTranslation: 'I prefer using React Context for global state when dealing with minor theme toggles or user profiles.',
        personaResponse: 'Sure, but how do you prevent unnecessary re-renders in deep component trees when context values change?',
        personaTranslation: 'Sure, but how do you prevent unnecessary re-renders in deep component trees when context values change?'
      },
      {
        userSpeech: 'We can split contexts, memoize consumer components, or write custom selector hooks to wrap the context provider.',
        userTranslation: 'We can split contexts, memoize consumer components, or write custom selector hooks to wrap the context provider.',
        personaResponse: 'Fair enough. But if the app scales to hundreds of frequently changing states, is Context still your choice?',
        personaTranslation: 'Fair enough. But if the app scales to hundreds of frequently changing states, is Context still your choice?'
      },
      {
        userSpeech: 'No, in that case I would introduce Zustand or Redux Toolkit because they use store selectors and avoid context propagation issues.',
        userTranslation: 'No, in that case I would introduce Zustand or Redux Toolkit because they use store selectors and avoid context propagation issues.',
        personaResponse: 'Excellent. That shows you understand the render performance bottlenecks. Let us talk about React 19 server actions next.',
        personaTranslation: 'Excellent. That shows you understand the render performance bottlenecks. Let us talk about React 19 server actions next.'
      }
    ]
  },
  'rickshaw-ride': {
    'Gujarati': [
      {
        userSpeech: 'બાબુભાઈ, લક્ષ્મી વિલાસ પેલેસ જવું છે. મીટરથી ચાલશો?',
        userTranslation: 'Babubhai, I want to go to Laxmi Vilas Palace. Will you go by meter?',
        personaResponse: 'અરે ભાઈ, પેલેસ બાજુ ટ્રાફિક બહુ હોય છે. મીટરથી પોસાય નહિ. ૧૫૦ રૂપિયા ફિક્સ લઈશ.',
        personaTranslation: 'Oh brother, there is too much traffic towards the Palace. Meter is not feasible. I will take 150 rupees fixed.'
      },
      {
        userSpeech: 'ના હો બાબુભાઈ, ૧૫૦ બહુ વધારે છે. મીટર પ્રમાણે તો ૮૦ રૂપિયા જ થાય.',
        userTranslation: 'No Babubhai, 150 is too much. By meter it should only be around 80 rupees.',
        personaResponse: 'અરે ના રે ના સાહેબ! રસ્તામાં બહુ ખડા છે. ચાલો તમારા માટે ૧૦૦ રૂપિયા, છેલ્લી વાત.',
        personaTranslation: 'Oh no sir! There are too many potholes on the way. Okay, 100 rupees for you, final offer.'
      },
      {
        userSpeech: '૯૦ રૂપિયા આપું, ચાલો જલ્દી મોડું થાય છે.',
        userTranslation: 'I will give 90 rupees, let us go quickly, I am getting late.',
        personaResponse: 'સારું હેંડો બેસો! બાબુભાઈ ગાડી ઉપાડે છે હવે.',
        personaTranslation: 'Okay, come sit! Babubhai is starting the ride now.'
      }
    ]
  }
};

export const mockDebriefs: Record<string, Omit<DebriefSession, 'id' | 'scenarioId' | 'language' | 'date'>> = {
  'chai-stall': {
    score: 85,
    durationSeconds: 124,
    overallFeedback: 'Excellent attempt! Your pronunciation was clear and you successfully obtained bun maska and ginger chai. To improve, pay attention to the grammatical gender of items in Hindi/Gujarati.',
    mistakes: [
      {
        id: 'c1',
        originalText: 'एक आदूवाળી ચા આપો ને (Gujarati)',
        correctedText: 'એક આદુવાળી ચા આપો ને',
        explanation: 'Correct spelling in Gujarati is "આદુવાળી" (Ginger). Your pronunciation was close, but make sure to emphasize the dental "d".',
        pronunciation: 'Aaduvaali chaa aapo ne'
      },
      {
        id: 'c2',
        originalText: 'चाय के २० रुपये और मस्का बन के ३૦ रुपये (Hindi)',
        correctedText: 'चाय के २० रुपये और मस्का बन के ३० रुपये',
        explanation: 'In Hindi, nouns like "चाय" are feminine, so we say "चाय की कीमत" instead of "चाय का भाव" when asking about prices.',
        pronunciation: 'Chai ke bees rupaye'
      }
    ],
    phrasingComparison: [
      {
        id: 'p1',
        originalText: 'સાથે ખાવામાં શું મળશે? (What will I get to eat with it?)',
        correctedText: 'બીજું નાસ્તામાં શું છે આજે? (What else is there for breakfast/snacks today?)',
        explanation: 'Using "નાસ્તો" (snacks) is much more natural at a Gujarati tea stall than the literal translation "ખાવામાં શું મળશે".'
      },
      {
        id: 'p2',
        originalText: 'शक्कर मध्यम रखना।',
        correctedText: 'चीनी थोड़ी कम ही रखिएगा।',
        explanation: 'Locals usually refer to sugar as "चीनी" or "शक्कर" and prefer using "कम" (less) or "मीडियम" instead of the formal "मध्यम".'
      }
    ],
    vocabulary: [
      {
        id: 'v1',
        word: 'આદુ (Aadu) / अदरक (Adrak)',
        translation: 'Ginger',
        partOfSpeech: 'Noun',
        exampleSentence: 'મને આદુવાળી ચા બહુ ગમે છે।',
        exampleTranslation: 'I like ginger tea very much.'
      },
      {
        id: 'v2',
        word: 'મસ્કા બન (Maska Bun)',
        translation: 'Buttered Bun',
        partOfSpeech: 'Noun',
        exampleSentence: 'ગરમ ચાય સાથે મોટો मस्का बन खाओ।',
        exampleTranslation: 'Eat a large buttered bun with hot tea.'
      },
      {
        id: 'v3',
        word: 'કટીંગ (Cutting)',
        translation: 'Half cup of tea',
        partOfSpeech: 'Noun/Adjective',
        exampleSentence: 'એક કટીંગ ચા આપજો ભાઈ।',
        exampleTranslation: 'Give me one cutting tea, brother.'
      }
    ]
  },
  'market-haggling': {
    score: 92,
    durationSeconds: 165,
    overallFeedback: 'Great negotiation tactics! You successfully managed to bring the shopkeeper down from 1200 Rupees to 850 Rupees. You pointed out defects and threatened to walk away, which is perfect for Indian bazaars.',
    mistakes: [
      {
        id: 'm1',
        originalText: '१૨-सौ तो बहुत ज़्यादा हैं।',
        correctedText: 'बारह सौ तो बहुत ज़्यादा हैं।',
        explanation: 'In conversational Hindi, it is better to pronounce numbers fully as "बारह सौ" (Baarah sau) instead of literal digit-by-digit translations.',
        pronunciation: 'Baarah sau toh bahut jyada hain'
      }
    ],
    phrasingComparison: [
      {
        id: 'mp1',
        originalText: '७०० रुपये में दोगे? (Will you give for 700?)',
        correctedText: 'भैया, ७०० ठीक दाम लगाओ ना। (Brother, set a fair price at 700.)',
        explanation: 'Saying "ठीक दाम लगाओ" (set a fair price) is the classic bargaining phrase in Indian street markets.'
      },
      {
        id: 'mp2',
        originalText: 'वरना मैं दूसरी दुकान पर देखता हूँ।',
        correctedText: 'नहीं तो बगल वाली दुकान पर मिल रहा है।',
        explanation: 'Creating artificial competition by referring to the neighbouring shop (बगल वाली दुकान) creates higher pressure on the vendor.'
      }
    ],
    vocabulary: [
      {
        id: 'mv1',
        word: 'बोहनी (Bohni)',
        translation: 'First sale of the day',
        partOfSpeech: 'Noun',
        exampleSentence: 'सुबह की पहली बोहनी का वक़्त है, साहब।',
        exampleTranslation: 'It is the time for the first sale of the morning, sir.'
      },
      {
        id: 'mv2',
        word: 'दाम (Daam)',
        translation: 'Price / Rate',
        partOfSpeech: 'Noun',
        exampleSentence: 'सही दाम लगाओ भाईसाब।',
        exampleTranslation: 'Put a fair price, brother.'
      }
    ]
  },
  'job-interview': {
    score: 74,
    durationSeconds: 240,
    overallFeedback: 'Good technical responses, but you hesitated when speaking about context performance issues. Work on fluent technical vocabulary transitions.',
    mistakes: [
      {
        id: 'j1',
        originalText: 'dealing with minor theme toggles or user profiles.',
        correctedText: 'handling lightweight global states like theme toggles or user profiles.',
        explanation: 'Using the verb "handling" and adjective "lightweight" sounds more professional in software engineering interviews.',
        pronunciation: 'handling lightweight global states'
      }
    ],
    phrasingComparison: [
      {
        id: 'jp1',
        originalText: 'We can split contexts, memoize consumer components...',
        correctedText: 'We can optimize by separating contexts into multiple providers and applying React.memo or useMemo to consumers.',
        explanation: 'Providing a structured, step-by-step description of optimization mechanisms demonstrates senior-level maturity.'
      }
    ],
    vocabulary: [
      {
        id: 'jv1',
        word: 'Prop Propagation',
        translation: 'Passing parameters down multiple levels of rendering tree',
        partOfSpeech: 'Noun Phrase',
        exampleSentence: 'Context helps avoid prop drilling but can lead to render propagation cascades.',
        exampleTranslation: 'Context helps avoid prop drilling but can lead to render propagation cascades.'
      }
    ]
  },
  'rickshaw-ride': {
    score: 80,
    durationSeconds: 95,
    overallFeedback: 'Excellent work interacting in Gujarati! You managed to negotiate a rate of 90 rupees with Babubhai. Next time, try to push even harder for the meter as it is legal.',
    mistakes: [
      {
        id: 'r1',
        originalText: 'મીટરથી ચાલશો? (Gujarati)',
        correctedText: 'મીટર પ્રમાણે ચાલશો?',
        explanation: 'Using "પ્રમાણે" (according to) makes the question "Will you go by the meter?" sound more natural.',
        pronunciation: 'Meter pramane chalsho?'
      }
    ],
    phrasingComparison: [
      {
        id: 'rp1',
        originalText: '૯૦ રૂપિયા આપું, ચાલો જલ્દી મોડું થાય છે.',
        correctedText: 'ચાલો ને મોટાભાઈ, ૯૦ રૂપિયા રાખીએ, મારે મોડું થાય છે.',
        explanation: 'Adding "મોટાભાઈ" (elder brother) or using a softer negotiation tone works miracles in securing auto rides.'
      }
    ],
    vocabulary: [
      {
        id: 'rv1',
        word: 'મીટર પ્રમાણે (Meter pramane)',
        translation: 'According to the meter fare',
        partOfSpeech: 'Adverbial Phrase',
        exampleSentence: 'મીટર પ્રમાણે જ ભાડું આપીશ।',
        exampleTranslation: 'I will pay fare only according to the meter.'
      },
      {
        id: 'rv2',
        word: 'પોસાય (Posay)',
        translation: 'Affordable / Viable',
        partOfSpeech: 'Verb',
        exampleSentence: 'આ ભાવે ચલાવવું મને પોસાય નહિ।',
        exampleTranslation: 'Driving at this rate is not affordable for me.'
      }
    ]
  }
};
