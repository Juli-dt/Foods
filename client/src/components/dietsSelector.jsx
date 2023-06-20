import React, { useState } from 'react';

const DietSelector = () => {
    const [selectedDiets, setSelectedDiets] = useState([]);

    // Handler para actualizar las dietas seleccionadas
    const handleDietSelection = (event) => {
        const { value, checked } = event.target;

        if (checked) {
            setSelectedDiets((prevSelectedDiets) => [...prevSelectedDiets, value]);
        } else {
            setSelectedDiets((prevSelectedDiets) =>
                prevSelectedDiets.filter((diet) => diet !== value)
            );
        }
    };

    return (
        <div>
            <h3>Elige las dietas para tu receta:</h3>
            <label>
                <input
                    type="checkbox"
                    value="gluten_free"
                    onChange={handleDietSelection}
                    checked={selectedDiets.includes('gluten_free')}
                />
                Gluten Free
            </label>
            <br />
            <label>
                <input
                    type="checkbox"
                    value="ketogenic"
                    onChange={handleDietSelection}
                    checked={selectedDiets.includes('ketogenic')}
                />
                Ketogenic
            </label>
            <br />
            <label>
                <input
                    type="checkbox"
                    value="dairy_free"
                    onChange={handleDietSelection}
                    checked={selectedDiets.includes('dairy_free')}
                />
                Dairy Free
            </label>
            <br />
            <label>
                <input
                    type="checkbox"
                    value="lacto_ovo_vegetarian"
                    onChange={handleDietSelection}
                    checked={selectedDiets.includes('lacto_ovo_vegetarian')}
                />
                Lacto Ovo Vegetarian
            </label>
            <br />
            <label>
                <input
                    type="checkbox"
                    value="vegan"
                    onChange={handleDietSelection}
                    checked={selectedDiets.includes('vegan')}
                />
                Vegan
            </label>
            <br />
            <label>
                <input
                    type="checkbox"
                    value="pescatarian"
                    onChange={handleDietSelection}
                    checked={selectedDiets.includes('pescatarian')}
                />
                Pescatarian
            </label>
            <br />
            <label>
                <input
                    type="checkbox"
                    value="paleolithic"
                    onChange={handleDietSelection}
                    checked={selectedDiets.includes('paleolithic')}
                />
                Paleolithic
            </label>
            <br />
            <label>
                <input
                    type="checkbox"
                    value="primal"
                    onChange={handleDietSelection}
                    checked={selectedDiets.includes('primal')}
                />
                Primal
            </label>
            <br />
            <label>
            <input
                    type="checkbox"
                    value="whole_30"
                    onChange={handleDietSelection}
                    checked={selectedDiets.includes('whole_30')}
                />
                Whole 30
            </label>
        </div>
    );
};

export default DietSelector;
