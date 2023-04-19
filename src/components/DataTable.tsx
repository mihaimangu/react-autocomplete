import React from 'react';

interface DataTableProps {
    posts: string[],
}

export default function DataTable({posts}: DataTableProps){
   return <div className="data-table">
        <h3 >All the data</h3>
        {posts.map(post => <div key={post} className='data-element'>{post}</div>)}
    </div>
}