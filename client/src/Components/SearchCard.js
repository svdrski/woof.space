import locationImg from "../Img/Location.svg"
import no from "../Img/no.svg"
import yes from "../Img/ok.svg"

export default function SearchCard ({data}) {



    return(
        <div style={{background: `url(${data.img})`}} className="cardBox">

     
                <div className="info">
                     <h1>{data.dogName}</h1>
                     <p>{data.age} y.o, {data.breed}</p>
                     <span className="citySpan">
                        <img src={locationImg}/>
                        <p className="city">{data.city}</p>
                     </span>
                </div>
                
                <div className="butns">
                    <button className="btn1" style={{background: `url(${no})`}} ></button>
                    <button className="btn2" style={{background: `url(${yes})`}}></button>
                </div>
        
          
        </div>  
    )
}