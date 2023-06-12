import React from "react";
import "./Card.css";
const imgNotFound = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png';

const Card = ({ id, title, image, dietTypes }) => {
    return (
        <div className="card-wrapper" key={id}>
            <div className="card-info">
                <h3>{title}</h3>
                <div className="card_card">
                    <img src={image ? image : imgNotFound} alt={title} />
                    <div className="card-diets">
                        {dietTypes?.map((e) => (
                            <h5 key={e.name}>{e.name}</h5>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
