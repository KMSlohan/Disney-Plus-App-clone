import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://api.themoviedb.org/3',
  params: {
    api_key: 'c35db9f164c7edec4a64cd6c674408df',
    language: 'ko-KR'
  }
})

export default instance;