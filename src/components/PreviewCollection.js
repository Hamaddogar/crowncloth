import React from "react";
import './PreviewCollection.scss'
import CollectionItem from "./CollectionItem";

const PreviewCollection = ({ collection }) => (
    <div className='PreviewCollection'>
        <h2 className='title'>{collection.title}</h2>
        <div className='preview flex wrap'>
            {collection.items.map(item => <CollectionItem key={item.id} item={item} />)}
        </div>
    </div>
)

export default PreviewCollection;