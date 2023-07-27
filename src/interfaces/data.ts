export interface JsonData {
  questions: Question[];
}

export interface Question {
  questionLabel: string;
  leftLabel: string;
  rightLabel: string;
  leftVotes: number;
  rightVotes: number;
}

// export interface Cluster {
//   label: string;
//   createdAt: string;
//   questions: Question[]
// }