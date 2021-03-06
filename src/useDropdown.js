import * as React from "react";

const useDropdown = (label, defaultState, options) => {
    const [state, setState] = React.useState(defaultState);
    const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;

    const Dropdown = () => (
        <label htmlFor={id}>
            {label}
            <select
                id={id}
                value={state}
                onChange={(e) => setState(e.target.value)}
                onBlur={(e) => setState(e.target.value)}
                disabled={options.length === 0}
            >
                <option value="All">All</option>
                {options.map((o) => (
                    <option key={o} value={o}>
                        {o}
                    </option>
                ))}
            </select>
        </label>
    );

    return [state, Dropdown, setState];
};

export default useDropdown;
