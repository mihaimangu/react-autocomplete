import React, {useEffect, useState} from 'react';
import {getDataFromTypicode, getDataFromLocalServer} from '../services/api';
import AutoComplete from './AutoComplete';
import DataTable from './DataTable';
import AutoCompleteInternal from './AutoCompleteInternal';


export default function Container() {

    const [posts, setPosts] = useState([]);

    const fetchExternalPosts = async() => {
        const response = await getDataFromTypicode();

        if(response?.data){
            const allPosts = response?.data?.map((post: any) => post.title);
            setPosts(allPosts);
        }
    }

    const fetchInternalPosts = async(q: string) => {
        console.log('fetching internal posts', q);
        const response = await getDataFromLocalServer(q);
        return response;
    }

    useEffect(() => {
       fetchExternalPosts();
    }, [])

    return (
        <div className="container-wrapper">
            <h1>Autocomplete component</h1>
            <p className="app-instructions">Type something in the input. Something like "lorem". The first component uses the data that is grabbed when the app is mounted. The second component grabs the data based on a query, using the string from the input. </p>
            <div className="container-inner-elements">
                <div className="autocomplete-row">
                    <h3>External data:</h3>
                    <AutoComplete data={posts} />

                </div>
                <div className="autocomplete-row">
                    <h3>Localhost data: </h3>
                    <AutoCompleteInternal getData={fetchInternalPosts} />

                </div>
            </div>
  
            {false && <DataTable posts={posts} />}
        </div>
    );
}