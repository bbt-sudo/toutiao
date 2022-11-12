import request from './request'

export const apiSearch = (p) => request.post('/api/search', p)