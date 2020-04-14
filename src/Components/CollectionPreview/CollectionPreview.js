import React from 'react';
import './CollectionPreview.scss'
import CollectionItem from '../CollectionItem/CollectionItem';


const CollectionPreview = ({ title, items }) => {
    return (
        <div className='collection-preview'>
            <h1 className='title'>{title.toUpperCase()}</h1>
            <div className='preview'>
                {
                    items.filter((item, idx) => idx < 4)// we just want 4 items
                        .map(({ id, ...otherItemProps }) => {
                            // @ts-ignore
                            return (<CollectionItem key={id} {...otherItemProps}></CollectionItem>)
                        })
                }
            </div>
        </div>
    )
}

export default CollectionPreview;