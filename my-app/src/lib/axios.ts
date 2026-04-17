import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://campers-api.goit.study',
});