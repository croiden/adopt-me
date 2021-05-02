import * as React from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";

import useDropdown from "./useDropdown";

const SearchParams = () => {
    const [location, setLocation] = React.useState("Seattle, WA");
    const [breeds, setBreeds] = React.useState([]);

    const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
    const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);

    const [pets, setPets] = React.useState([]);

    async function requestPets() {
        const { animals } = await pet.animals({
            location,
            breed,
            type: animal,
        });

        setPets(animals || []);
    }

    React.useEffect(() => {
        setBreeds([]);
        setBreed("");
        pet.breeds(animal).then(({ breeds }) => {
            const breedStrings = breeds.map(({ name }) => name);
            setBreeds(breedStrings);
        }, console.error);
    }, [animal, setBreed, setBreeds]);

    return (
        <div className="search-params">
            <form>
                <label htmlFor="location">
                    Location
                    <input
                        type="text"
                        id="location"
                        value={location}
                        placeholder="Location"
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </label>
                <AnimalDropdown />
                <BreedDropdown />
                <button>{"Submit"}</button>
            </form>
        </div>
    );
};

export default SearchParams;
