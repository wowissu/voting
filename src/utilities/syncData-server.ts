// read data
import fs from "fs";
import { JsonData, Question } from '@/interfaces/data';
import path from 'path';

export const dataJsonPath = path.join(process.cwd(), 'data.json');

let temporaryData: JsonData | null;
let activeQuestionIndex: number | null = null;

export function getTemporaryData() {
  return temporaryData;
}

export function fetchTemporaryData() {
  const rawData = fs.readFileSync(dataJsonPath, 'utf8');  

  temporaryData = JSON.parse(rawData) as JsonData;
}

export function saveTemporaryData(data = temporaryData) {
  return fs.writeFileSync(dataJsonPath, JSON.stringify(data), { encoding: 'utf8', flag: 'w' });  
}

export function syncTemporaryData() {
  const rawData = fs.readFileSync(dataJsonPath, 'utf8');

  temporaryData = JSON.parse(rawData) as JsonData; 
}

export function resetTemporaryData() {
  saveTemporaryData({ questions: [] })
}

fetchTemporaryData();


export function addNewQuestion(question: Question) {
  temporaryData?.questions.push(question);
  
  saveTemporaryData();
}

export function removeQuestionByIndex(index: number) {
  if (temporaryData && temporaryData.questions && temporaryData.questions.length > index) {
    temporaryData.questions = temporaryData.questions.filter((_, i) => i !== index);
    saveTemporaryData();
  }
}

export function getQuestions() {
  return temporaryData?.questions;
}

export function getActiveQuestionIndex() {
  return activeQuestionIndex
}

export function setActiveQuestionIndex(index: number | null) {
  if (index === null || (temporaryData && temporaryData.questions && temporaryData.questions.length > index)) {
    activeQuestionIndex = index;
  }
}

export function removeActiveQuestionIndex() {
  setActiveQuestionIndex(null);
}

export function getActiveQuestion() {
  if (activeQuestionIndex !== null && temporaryData && temporaryData.questions && temporaryData.questions.length > activeQuestionIndex) {
    return temporaryData.questions[activeQuestionIndex];
  }

  return undefined
}