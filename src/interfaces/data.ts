export interface JsonData {
  questions: Question[];
}

export interface Question {
  questionLabel: string;
  leftLabel: string;
  rightLabel: string;
  votes: [number, number][];
}

export type VotingWill = 0 | 1 | 2;


// export interface Cluster {
//   label: string;
//   createdAt: string;
//   questions: Question[]
// }