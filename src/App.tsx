import { useEffect, useMemo, useState } from "react";
import { LoaderCircle, Search } from "lucide-react";

import SearchBar from "./components/SearchBar";
import { getBreedDetails } from "./data/breedInfo";
import { getAllBreeds, getBreedImages } from "./services/dogApi";
import type { DogBreed } from "./types/dog";

interface BreedOption {
  name: string;
  breed: string;
  subBreed?: string;
}

interface SelectedDog extends BreedOption {
  image: string;
}

function formatBreedName(breed: string, subBreed?: string): string {
  const name = subBreed ? `${subBreed} ${breed}` : breed;

  return name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(/[\s-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function App() {
  const [breedOptions, setBreedOptions] = useState<BreedOption[]>([]);
  const [search, setSearch] = useState("");
  const [selectedDog, setSelectedDog] = useState<SelectedDog | null>(null);
  const [loadingBreeds, setLoadingBreeds] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBreeds() {
      try {
        const breeds: DogBreed[] = await getAllBreeds();
        const options = breeds.flatMap((item) => {
          const mainBreed: BreedOption = {
            name: formatBreedName(item.name),
            breed: item.name,
          };
          const subBreeds = item.subBreeds.map((subBreed) => ({
            name: formatBreedName(item.name, subBreed),
            breed: item.name,
            subBreed,
          }));

          return [mainBreed, ...subBreeds];
        });

        setBreedOptions(options);
      } catch {
        setError("Unable to load dog breeds. Please try again later.");
      } finally {
        setLoadingBreeds(false);
      }
    }

    loadBreeds();
  }, []);

  const suggestions = useMemo(() => {
    if (!search.trim()) return [];

    return breedOptions
      .filter((item) =>
        item.name.toLowerCase().includes(search.trim().toLowerCase())
      )
      .slice(0, 6);
  }, [search, breedOptions]);

  async function handleSearch(option?: BreedOption) {
    const query = search.trim();
    if (!query && !option) return;

    const selected =
      option ??
      breedOptions.find(
        (item) => item.name.toLowerCase() === query.toLowerCase()
      );

    if (!selected) {
      setError("Breed not found. Choose a breed from the suggestions.");
      return;
    }

    try {
      setSearching(true);
      setError("");

      const images = await getBreedImages(selected.breed, selected.subBreed);
      if (images.length === 0) {
        throw new Error("No images found.");
      }

      setSelectedDog({
        ...selected,
        image: images[Math.floor(Math.random() * images.length)],
      });
      setSearch(selected.name);
    } catch {
      setError("Unable to find an image for this breed. Please try again.");
    } finally {
      setSearching(false);
    }
  }

  return (
    <main className="app">
      <section className="search-page" aria-label="Dog breed search">
        <h1>Discover Your Preferred Dog Breed</h1>
        <p className="intro">Search for a breed to see a photo and learn about it.</p>

        <div className="search-area">
          <SearchBar
            value={search}
            onChange={(value) => {
              setSearch(value);
              setError("");
            }}
            onSearch={() => handleSearch()}
            disabled={loadingBreeds || searching}
          />

          {suggestions.length > 0 && !searching && (
            <div className="suggestions" role="listbox" aria-label="Breed suggestions">
              {suggestions.map((item) => (
                <button
                  key={`${item.breed}-${item.subBreed || ""}`}
                  type="button"
                  role="option"
                  aria-selected="false"
                  onClick={() => handleSearch(item)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {error && <p className="error-message" role="alert">{error}</p>}

        {loadingBreeds && (
          <p className="status-message">
            <LoaderCircle className="spinner" size={18} />
            Loading breeds...
          </p>
        )}

        {searching && (
          <p className="status-message">
            <LoaderCircle className="spinner" size={18} />
            Finding a dog...
          </p>
        )}

        {selectedDog && !searching ? (
          <article className="dog-result">
            <img className="dog-photo" src={selectedDog.image} alt={selectedDog.name} />
            <div className="dog-description">
              <h2>{selectedDog.name}</h2>
              <p>
                {getBreedDetails(
                  selectedDog.subBreed
                    ? `${selectedDog.subBreed}_${selectedDog.breed}`
                    : selectedDog.breed
                ).description}
              </p>
            </div>
          </article>
        ) : !loadingBreeds && !searching && !error ? (
          <div className="empty-result">
            <Search size={22} strokeWidth={1.7} />
            <p>Your dog photo and breed description will appear here.</p>
          </div>
        ) : null}
      </section>
    </main>
  );
}

export default App;
