import React from "react";
import "./Card.css";

const Card = ({ id, title, img, diets }) => {
    return (
        <div className="card-wrapper" key={id}>
            <div className="card-info">
                <h3>{title}</h3>
                <div className="card-card">
                    <img className="card-img" src={img} alt="" />
                    <div className="card-diets">
                        {diets?.map((diet) => (
                            <span key={diet}>{diet}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;



// const Card = ({ title, image, typeDiets }) => {
//     return (
//         <div className="card">
//             <div className="cd">
//                 <h3>{title}</h3>
//                 <img
//                     className="cardimg"
//                     src={
//                         image
//                             ? image
//                             : "https://img.freepik.com/vector-gratis/vector-ilustracion-dibujos-animados-varias-verduras-sobre-fondo-madera_1441-519.jpg?size=626&ext=jpg&ga=GA1.2.227501000.1662982549"
//                     }
//                     alt="img not found"
//                     width="100%"
//                 />
//                 <div className="tipes">
//                     Diets:
//                     <ol>
//                         {" "}
//                         {typeDiets ? typeDiets.map((e) =>
//                             e.name ? <li key={e.name}>{e.name}</li> : null
//                         ) : null}
//                     </ol>{" "}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Card;