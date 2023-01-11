import axios from 'axios';

export const SENDCHAP_API = axios.create({
  baseURL: process.env.SENDCHAMP_BASE_URL,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${process.env.SENDCHAMP_PUBLIC_ACCESS_KEY}`,
  },
});
