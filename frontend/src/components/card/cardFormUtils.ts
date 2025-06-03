// src/components/Card/cardFormUtils.ts
export const allowedCategories = [
  'verbs', 'nouns', 'adjectives', 'adverbs',
  'pronouns', 'prepositions', 'conjunctions',
  'interjections', 'phrases',
];

export const allowedDifficulties = ['easy', 'medium', 'hard'];

export const buildCardPayload = (formData: any) => {
  const translationArray = formData.translation
    .split(',')
    .map((text: string) => ({ language: 'en', text: text.trim() }))
    .filter((t: any) => t.text.length > 0);

  const exampleArray = formData.example
    ? formData.example
        .split(',')
        .map((text: string) => ({ language: 'en', text: text.trim() }))
        .filter((e: any) => e.text.length > 0)
    : [];

  return {
    word: formData.word.trim(),
    transcription: formData.transcription.trim() || undefined,
    translation: translationArray,
    example: exampleArray,
    audioUrl: formData.audioUrl.trim() || undefined,
    category: formData.category,
    difficulty: formData.difficulty,
  };
};
