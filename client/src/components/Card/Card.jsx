import React from "react";
import "./Card.css";

const Card = ({ id, title, image, dietTypes }) => {
    return (
        <div className="card-wrapper">
            <div className="card-info">
                <h3>{title}</h3>
                <div className="card_card">
                    <img src={image} alt={title} />
                    <div className="card-diets">
                        {dietTypes?.map((e, index) => (
                            <h5 key={`${id}-${index}`}>{e.name}</h5>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
