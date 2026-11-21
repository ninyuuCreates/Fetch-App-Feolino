import type { DogApiResponse, DogBreed } from "../types/dog";

const API_URL = "https://dog.ceo/api";

export async function getAllBreeds(): Promise<DogBreed[]> {
  const response = await fetch(`${API_URL}/breeds/list/all`);

  if (!response.ok) {
    throw new Error("Unable to load dog breeds.");
  }

  const data: DogApiResponse<Record<string, string[]>> =
    await response.json();

  if (data.status !== "success") {
    throw new Error("Failed to retrieve dog breeds.");
  }

  return Object.entries(data.message).map(([name, subBreeds]) => ({
    name,
    subBreeds,
  }));
}

export async function getBreedImages(
  breed: string,
  subBreed?: string
): Promise<string[]> {
  const endpoint = subBreed
  ? `${API_URL}/breed/${breed}/${subBreed}/images/random/6`
  : `${API_URL}/breed/${breed}/images/random/6`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error("Unable to load dog images.");
  }

  const data: DogApiResponse<string[]> = await response.json();

  if (data.status !== "success" || !Array.isArray(data.message)) {
    throw new Error("No images found for this breed.");
  }

  return data.message;
}
