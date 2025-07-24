import axios from "axios";

export const apiKey = '5cce41aaf230b52d1353ac8c1ec447c9';

export const apiReadAccessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2NlNDFhYWYyMzBiNTJkMTM1M2FjOGMxZWM0NDdjOSIsIm5iZiI6MTc0NDgwNDU2Ni41MzQwMDAyLCJzdWIiOiI2N2ZmOWFkNjgzYzZlNTY3YzdkOTM4MDciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Z9BWXpbCavXQuQ8WBsiaYO4a3YYe23RFz6yT1w5xqnE'

// const isProd = import.meta.env.PROD;

// const baseURL = isProd
//   ? 'https://api.themoviedb.org'
//   : '/api';

export default axios.create({
    baseURL: 'https://api.themoviedb.org',
    params: {
        api_key: apiKey
        
    }
})