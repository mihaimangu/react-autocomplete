import React, {useEffect} from 'react';
import './AutoComplete.scss';

interface AutoCompleteProps {
    data?: string[],
}

export default function AutoComplete({data}: AutoCompleteProps){

    const [query, setQuery] = React.useState('');
    const [suggestions, setSuggestions] = React.useState<string[]>([]);
    const [showSUggestions, setShowSuggestions] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

    const escapeRegExp = (str: string) => {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    const suggestItems = (input: string) => {
        const matchingElements = data?.filter((item) => {
            const regex: RegExp = new RegExp(input, 'i');
            return regex.test(item);
        }) || []

        return matchingElements;
    }

    const setSuggestionsBasedOnQuery = (query: string) => {    
        const suggestedItmes = suggestItems(query);
        setSuggestions(suggestedItmes);
        if(query.length > 0 && suggestItems.length > 0){
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    }

    useEffect(() => {
        // useEffect used for debouncing
        const timeout = setTimeout(() => {setSuggestionsBasedOnQuery(query)}, 50)

        return () => clearTimeout(timeout)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    [query]
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        const escapedQuery = escapeRegExp(query);
        setSelectedItem(null);
        setQuery(escapedQuery);
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
        
        {showSUggestions && <div className="suggestions-wrapper">
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