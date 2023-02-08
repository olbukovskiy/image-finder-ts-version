import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function FindImages(
  url: string
): Promise<Array<{ [prop: string]: any }>> {
  const response = await axios.get(url);
  return response.data;
}
