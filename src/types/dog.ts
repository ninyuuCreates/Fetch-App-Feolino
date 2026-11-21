export interface DogApiResponse<T> {
  message: T;
  status: string;
}

export interface DogBreed {
  name: string;
  subBreeds: string[];
}

export interface BreedInfo {
  description: string;
}