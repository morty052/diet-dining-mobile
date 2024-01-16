import { create } from "zustand";

interface IquizStore {
  answers: string[];
  plan: string;
  setAnswer: (answer: string) => void;
  resetAnswers: () => void;
  setPlan: (plan: string) => void;
}

export const useQuizStore = create<IquizStore>((set) => ({
  answers: [],
  plan: "",
  setAnswer: (answer) =>
    set((state) => ({ answers: [...state.answers, answer] })),
  resetAnswers: () => set((state) => ({ answers: [] })),
  setPlan: (plan: string) => set((state) => ({ plan })),
}));
