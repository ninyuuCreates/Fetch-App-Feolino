import type { BreedInfo } from "../types/dog";

const breedDescriptions: Record<string, string> = {
  beagle:
    "The Beagle is a small to medium-sized dog known for its friendly personality and excellent sense of smell. It is often kept as a family companion.",
  bulldog:
    "The Bulldog is known for its muscular body, wrinkled face, and gentle personality. It is usually calm and affectionate with its family.",
  chihuahua:
    "The Chihuahua is one of the smallest dog breeds. Despite its small size, it is known for being confident, alert, and loyal.",
  dachshund:
    "The Dachshund has a long body and short legs. It was originally bred for hunting and is known for its brave and curious personality.",
  dalmatian:
    "The Dalmatian is recognized by its white coat with black or liver-colored spots. It is an energetic dog that enjoys physical activities.",
  german_shepherd:
    "The German Shepherd is an intelligent and hardworking dog, known for being a loyal companion and working dog.",
  golden_retriever:
    "The Golden Retriever is a friendly and intelligent dog with a beautiful golden coat. It is popular as a family pet and assistance dog.",
  husky:
    "The Siberian Husky is known for its thick coat, beautiful eyes, and energetic personality. It was originally bred as a sled dog.",
  labrador:
    "The Labrador Retriever is a popular family dog known for being friendly, active, and easy to train. It also works as a service dog.",
  maltese:
    "The Maltese is a small companion dog with a long, silky white coat. It is affectionate and enjoys spending time with people.",
  poodle:
    "The Poodle is an intelligent dog known for its curly coat. It comes in different sizes and is usually easy to train.",
  pug:
    "The Pug is a small dog with a wrinkled face and curled tail. It is known for its playful and affectionate personality.",
  rottweiler:
    "The Rottweiler is a strong and confident dog known for its loyalty and protective nature.",
  shih_tzu:
    "The Shih Tzu is a small companion dog with a long coat. It is affectionate and enjoys being around its family.",
  pomeranian:
    "The Pomeranian is a small dog with a fluffy double coat. It is energetic, curious, and confident despite its small size.",
  boxer:
    "The Boxer is a muscular and energetic dog. It is playful, loyal, and known for its strong bond with its family.",
  border_collie:
    "The Border Collie is a highly intelligent working dog. It is especially known for herding and requires plenty of exercise.",
  corgi:
    "The Corgi is a small herding dog with short legs and a long body. It is intelligent, friendly, and active.",
  samoyed:
    "The Samoyed is known for its thick white coat and friendly expression. It is an active dog that enjoys companionship.",
};

export function getBreedDetails(breed: string): BreedInfo {
  const key = breed.toLowerCase().replace(/ /g, "_");

  return {
    description:
      breedDescriptions[key] ??
      `The ${breed} is a dog breed. Learn more about its unique characteristics and enjoy a photo of this breed.`,
  };
}
