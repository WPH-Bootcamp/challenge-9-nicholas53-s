// Di file App.tsx sementara, tambahkan ini untuk test:
import api from '@/lib/axios';
import { API_ENDPOINTS } from '@/lib/constants';

api.get(API_ENDPOINTS.movies.popular).then((res) => console.log(res.data));
