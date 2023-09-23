import axios from 'axios';

export function add(supplier: object) {
  return axios.post('/api/supplier/add', supplier);
}

export function getById() {
  return axios.post('/api/supplier/getById', { id: 'SPLR.00001' });
}

export function getAll() {
  return axios.post('/api/supplier/getAll');
}

export function updata(supplier: object) {
  return axios.post('/api/supplier/updata', supplier);
}

export function deleteSuppliers(ids: string[]) {
  return axios.post('/api/supplier/deleteIds', ids);
}

export function getPagination(searchCondition: object) {
  return axios.post('/api/supplier/getPagination', searchCondition);
}
