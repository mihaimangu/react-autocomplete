import { useEffect } from "react";
import React from 'react';

interface AutoCompleteInternalTypes {
    getData: (q: string) => Promise<any>,
}

export default function AutoCompleteInternal({getData}: AutoCompleteInternalTypes) {
    const [query, setQuery] = React.useState('');
    const [suggestions, setSuggestions] = React.useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState<string | null>(null);
    
    const escapeRegExp = (str: string) => {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    const setSuggestionsBasedOnQuery = async (query: string) => {
        const suggestedItems = await getData(query);
        setSuggestions(suggestedItems);
        if(query.length > 0 && suggestedItems.length > 0){
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    }

    useEffect(() => {
        // useEffect used for debouncing
        const timeout = setTimeout(() => {setSuggestionsBasedOnQuery(query)}, 500);

        return () => clearTimeout(timeout);

    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSelectedItem(null);
        setQuery(query);
    }

        
    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const clickedItem = e.currentTarget.textContent;
        setSelectedItem(clickedItem);
        setShowSuggestions(false);
    }

    const handleClear = () => {
        setSelectedItem(null);
        setQuery('');
    }

    const highlightMatch = (text: string) => {
        const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
        return text.replace(regex, '<span class="match">$1</span>');
      };



    return <div className="autocomplete-wrapper">
    <div className="suggestions-input-wrapper">
        <input value={selectedItem || query} onChange={handleChange} className='suggestions-input'></input>
        <div onClick={handleClear} className="suggestions-clear">x</div>
    </div>
    
        {showSuggestions && <div className="suggestions-wrapper">
        {suggestions.map(suggestion => 
            <div 
                key={suggestion} 
                onClick={handleClick} 
                className="suggestion-item">
                    <span dangerouslySetInnerHTML={{__html: highlightMatch(suggestion)}}></span>
                </div>)}
        </div>}
    </div>
}