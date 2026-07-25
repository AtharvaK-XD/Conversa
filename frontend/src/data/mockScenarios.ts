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
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
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
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
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
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
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
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      avatarSeed: 'babubhai',
      bio: 'A senior auto-rickshaw driver who has been navigating the streets of Vadodara for 35 years and loves sharing historical stories.'
    },
    description: 'Hire an auto-rickshaw to take you to Laxmi Vilas Palace and agree on the fare using a meter.',
    promptGuideline: 'Request Babubhai to go by the meter fare, or negotiate a flat rate if he refuses.'
  },
  {
    id: 'kolkata-tram',
    name: 'Kolkata Tram Ride',
    difficulty: 'Easy',
    targetLanguage: ['Bengali', 'Hindi'],
    persona: {
      id: 'subir-da',
      name: 'Subir Da',
      role: 'Tram Conductor',
      location: 'College Street, Kolkata',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      avatarSeed: 'subir',
      bio: 'A veteran tram conductor who knows every lane of North Kolkata and is proud of Kolkata heritage.'
    },
    description: 'Purchase a ticket for a tram ride near College Street and ask for directions to a famous bookstore.',
    promptGuideline: 'Request a ticket to College Street and ask Subir Da which stop is closest to Paramount Sherbets.'
  },
  {
    id: 'delhi-chaat',
    name: 'Chandni Chowk Chaat',
    difficulty: 'Easy',
    targetLanguage: ['Hindi'],
    persona: {
      id: 'raju-chaatwala',
      name: 'Raju Chaatwala',
      role: 'Chaat Vendor',
      location: 'Chandni Chowk, Delhi',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      avatarSeed: 'raju',
      bio: 'A lively chaat vendor in Old Delhi known for his super crispy aloo tikki and sweet tamarind chutneys.'
    },
    description: 'Order a plate of spicy aloo tikki chaat and customize the spices to be less hot.',
    promptGuideline: 'Ask Raju to make the chaat medium spicy, add extra sweet tamarind chutney, and request an extra dry puri.'
  },
  {
    id: 'chennai-auto',
    name: 'Chennai Auto Ride',
    difficulty: 'Medium',
    targetLanguage: ['Tamil', 'English'],
    persona: {
      id: 'selvam',
      name: 'Selvam',
      role: 'Auto Driver',
      location: 'Central Station, Chennai',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      avatarSeed: 'selvam',
      bio: 'A friendly auto-rickshaw driver in Chennai who knows the shortcuts to Marina Beach like the back of his hand.'
    },
    description: 'Negotiate a fair price to go to Marina Beach from Central Station without a meter.',
    promptGuideline: 'Bargain the fare down to 150 Rupees, pointing out that the weather is pleasant and there is no traffic.'
  },
  {
    id: 'punjab-dhaba',
    name: 'Jalandhar Highway Dhaba',
    difficulty: 'Medium',
    targetLanguage: ['Punjabi', 'Hindi'],
    persona: {
      id: 'gurpreet-singh',
      name: 'Gurpreet Singh',
      role: 'Dhaba Owner',
      location: 'Jalandhar Highway, Punjab',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      avatarSeed: 'gurpreet',
      bio: 'A jolly Punjabi dhaba owner who loves serving customers massive portions of authentic parathas and sweet lassi.'
    },
    description: 'Order a traditional Punjabi meal (Paneer, Tandoori Roti) and request extra butter.',
    promptGuideline: 'Ask for a plate of paneer butter masala, two butter rotis, and a large glass of sweet lassi.'
  },
  {
    id: 'hyderabad-biryani',
    name: 'Hyderabad Biryani Order',
    difficulty: 'Hard',
    targetLanguage: ['Hindi', 'English'],
    persona: {
      id: 'farhan',
      name: 'Farhan',
      role: 'Waiter',
      location: 'Charminar, Hyderabad',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      avatarSeed: 'farhan',
      bio: 'A polite but fast-paced waiter at an iconic biryani restaurant near Charminar.'
    },
    description: 'Order a special Hyderabadi mutton biryani and specify the meat pieces to be tender.',
    promptGuideline: 'Specify that you want double masala, tender mutton pieces, and double raita on the side.'
  },
  {
    id: 'bengaluru-rent',
    name: 'Bengaluru Flat Renting',
    difficulty: 'Hard',
    targetLanguage: ['English'],
    persona: {
      id: 'manjunath',
      name: 'Manjunath',
      role: 'Broker',
      location: 'HSR Layout, Bengaluru',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      avatarSeed: 'manjunath',
      bio: 'A real estate broker in Bengaluru who speaks fluent corporate lingo and is used to high deposit demands.'
    },
    description: 'Negotiate the security deposit and monthly rent for a 2BHK apartment.',
    promptGuideline: 'Negotiate to reduce the advance deposit from 10 months rent to 5 months rent, and ask if water charges are included.'
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
  },
  'kolkata-tram': {
    'Bengali': [
      {
        userSpeech: 'নমস্কার সুবীরদা, কলেজ স্ট্রিটের একটা টিকিট দিন না।',
        userTranslation: 'Hello Subir da, please give me one ticket to College Street.',
        personaResponse: 'নমস্কার! এই নিন আপনার টিকিট, চার টাকা হলো। কলেজ স্ট্রিটের কোথায় যাবেন?',
        personaTranslation: 'Namaste! Take your ticket, that will be 4 rupees. Where in College Street will you go?'
      }
    ]
  },
  'delhi-chaat': {
    'Hindi': [
      {
        userSpeech: 'भैया, एक प्लेट आलू टिक्की चाट देना, मिर्च थोड़ी कम डालना।',
        userTranslation: 'Brother, give me one plate of aloo tikki chaat, put a bit less chili.',
        personaResponse: 'बिल्कुल बाबूजी! मीठी चटनी ज़्यादा डालूँ या दही सोठ?',
        personaTranslation: 'Sure sir! Should I put more sweet chutney or curd with spices?'
      }
    ]
  },
  'chennai-auto': {
    'Tamil': [
      {
        userSpeech: 'அண்ணா, மெரினா பீச் போக எவ்வளவு ஆகும்?',
        userTranslation: 'Brother, how much will it cost to go to Marina Beach?',
        personaResponse: 'இருநூறு ரூபாய் ஆகும் சார். டிராபிக் ஜாஸ்தி இருக்கு.',
        personaTranslation: 'It will be 200 Rupees, sir. Traffic is high.'
      }
    ]
  },
  'punjab-dhaba': {
    'Punjabi': [
      {
        userSpeech: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ! ਇੱਕ ਪਲੇਟ ਪਨੀਰ ਬਟਰ ਮਸਾਲਾ ਤੇ ਲੱਸੀ ਮਿਲੇਗੀ?',
        userTranslation: 'Sat Sri Akal! Will I get a plate of paneer butter masala and lassi?',
        personaResponse: 'ਹਾਂਜੀ ਬਿਲਕੁਲ ਜੀ, ਹੁਣੇ ਲਿਆਉਂਦਾ ਹਾਂ, ਗਰਮਾ-ਗਰਮ ਰੋਟੀ ਨਾਲ ਮੱਖਣ ਲਾ ਕੇ।',
        personaTranslation: 'Yes absolutely, bringing it right now, hot roti with butter applied.'
      }
    ]
  },
  'hyderabad-biryani': {
    'English': [
      {
        userSpeech: 'Can I get one special Hyderabadi mutton biryani with extra raita and double masala?',
        userTranslation: 'Can I get one special Hyderabadi mutton biryani with extra raita and double masala?',
        personaResponse: 'Sure sir, our mutton is extremely tender today. Will serve you in five minutes.',
        personaTranslation: 'Sure sir, our mutton is extremely tender today. Will serve you in five minutes.'
      }
    ]
  },
  'bengaluru-rent': {
    'English': [
      {
        userSpeech: 'Ten months rent as security deposit is too high. Can we do five months instead?',
        userTranslation: 'Ten months rent as security deposit is too high. Can we do five months instead?',
        personaResponse: 'Usually owners do not agree, but since you are a software engineer, I can bargain for six months deposit.',
        personaTranslation: 'Usually owners do not agree, but since you are a software engineer, I can bargain for six months deposit.'
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
        originalText: 'एक आदूવાળી ચા આપો ને (Gujarati)',
        correctedText: 'એક આદુવાળી ચા આપો ને',
        explanation: 'Correct spelling in Gujarati is "આદુવાળી" (Ginger). Your pronunciation was close, but make sure to emphasize the dental "d".',
        pronunciation: 'Aaduvaali chaa aapo ne'
      }
    ],
    phrasingComparison: [
      {
        id: 'p1',
        originalText: 'સાથે ખાવામાં શું મળશે? (What will I get to eat with it?)',
        correctedText: 'બીજું નાસ્તામાં શું છે આજે? (What else is there for breakfast/snacks today?)',
        explanation: 'Using "નાસ્તો" (snacks) is much more natural at a Gujarati tea stall than the literal translation "ખાવામાં શું મળશે".'
      }
    ],
    vocabulary: [
      {
        id: 'v1',
        word: 'આદુ (Aadu)',
        translation: 'Ginger',
        partOfSpeech: 'Noun',
        exampleSentence: 'મને આદુવાળી ચા બહુ ગમે છે।',
        exampleTranslation: 'I like ginger tea very much.'
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
        originalText: '१૨-सौ तो बहुत ज़्यादा हैं.',
        correctedText: 'बारह सौ तो बहुत ज़्यादा हैं.',
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
      }
    ]
  },
  'kolkata-tram': {
    score: 88,
    durationSeconds: 85,
    overallFeedback: 'A charming interaction in Bengali! Subir Da appreciated your politeness. Next time, feel free to ask more details about historical places around College Street.',
    mistakes: [],
    phrasingComparison: [],
    vocabulary: []
  },
  'delhi-chaat': {
    score: 91,
    durationSeconds: 72,
    overallFeedback: 'Raju loved serving you! Your order customization was perfectly natural and grammatically flawless.',
    mistakes: [],
    phrasingComparison: [],
    vocabulary: []
  },
  'chennai-auto': {
    score: 84,
    durationSeconds: 110,
    overallFeedback: 'Good try haggling with Selvam. You managed to get a decent rate. Try using Tamil pronouns correctly.',
    mistakes: [],
    phrasingComparison: [],
    vocabulary: []
  },
  'punjab-dhaba': {
    score: 89,
    durationSeconds: 95,
    overallFeedback: 'Excellent Punjabi lassi order! Next time, try requesting extra white butter (makkhan) specifically.',
    mistakes: [],
    phrasingComparison: [],
    vocabulary: []
  },
  'hyderabad-biryani': {
    score: 93,
    durationSeconds: 130,
    overallFeedback: 'Flawless biryani order. Farhan understood exactly what you meant by double masala and raita.',
    mistakes: [],
    phrasingComparison: [],
    vocabulary: []
  },
  'bengaluru-rent': {
    score: 86,
    durationSeconds: 180,
    overallFeedback: 'A tough deal successfully closed with Manjunath. A 6-month deposit in Bengaluru is a huge win.',
    mistakes: [],
    phrasingComparison: [],
    vocabulary: []
  }
};
