// src/services/CardService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/cards'; // adjust if needed

export const getAllCards = () => axios.get(API_URL);
export const getCardById = (id: string) => axios.get(`${API_URL}/${id}`);
export const createCard = (data: any) => axios.post(API_URL, data);
export const updateCard = (id: string, data: any) => axios.put(`${API_URL}/${id}`, data);
export const deleteCard = (id: string) => axios.delete(`${API_URL}/${id}`);