import axios from 'axios';

const apiRoot = 'https://jsonplaceholder.typicode.com';

export async function getDataFromTypicode(){
    const url = apiRoot + "/posts";
    
    try {
        const resource = await axios({
            url,
        });
        return resource;
    } catch (err){
        console.log('we have error on server')
    }

}

export async function getDataFromLocalServer(q: string){
    let localServer = "http://localhost:5000/items";
    if(q){
        localServer = localServer + `?q=${q}`;
    }

    try{
        const resouces = await axios({
            url: localServer,
        })
        return resouces.data;
    } catch(err){
        console.log('we have error on server', err)
    }
}