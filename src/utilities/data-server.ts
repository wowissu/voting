// read data
import fs from "fs";
import { JsonData, Question } from '@/interfaces/data';
import path from 'path';

export const dataJsonPath = path.join(process.cwd(), 'data.json');

let temporaryData: JsonData = { questions: [] }
let activeQuestionIndex: number | null = null;
// let activeQuestionIndex: number | null = process.env.NODE_ENV === 'production' ? null : 0;

fetchTemporaryData();

export function getTemporaryData() {
  return temporaryData;
}

export function fetchTemporaryData() {
  if (!fs.existsSync(dataJsonPath)) {
    temporaryData = { questions: [] };

    saveTemporaryData(temporaryData);
  } else {
    const rawData = fs.readFileSync(dataJsonPath, 'utf8');  
  
    temporaryData = JSON.parse(rawData) as JsonData;
  }

  return 
}

export function saveTemporaryData(data = temporaryData) {
  return fs.writeFileSync(dataJsonPath, JSON.stringify(data), { encoding: 'utf8', flag: 'w' });  
}

export function resetTemporaryData() {
  saveTemporaryData({ questions: [] })
}

export function addNewQuestion(question: Question) {
  temporaryData?.questions.push(question);
  
  saveTemporaryData();
}

export function removeQuestionByIndex(index: number) {
  if (temporaryData.questions && temporaryData.questions.length > index) {
    temporaryData.questions = temporaryData.questions.filter((_, i) => i !== index);
    saveTemporaryData();
  }
}

export function getQuestions() {
  return temporaryData.questions;
}

export function getQuestionByIndex(index: number) {
  if (temporaryData && temporaryData.questions && temporaryData.questions.length > index) {
    return temporaryData.questions[index];
  }
}

export function isActiveQuestionIndex(index: number) {
  return index === activeQuestionIndex;
}

export function getActiveQuestion() {
  if (activeQuestionIndex === null) return void 0; 

  return getQuestionByIndex(activeQuestionIndex);
}

export function getActiveQuestionIndex() {
  return activeQuestionIndex
}

export function setActiveQuestionIndex(index: number | null) {
  if (index === null || (temporaryData.questions && temporaryData.questions.length > index)) {
    activeQuestionIndex = index;
  }
}

export function removeActiveQuestionIndex() {
  setActiveQuestionIndex(null);
}

