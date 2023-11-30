import locationImg from "../Img/Location.svg"
import no from "../Img/no.svg"
import yes from "../Img/ok.svg"

const URL = process.env.REACT_APP_BASE_URL


export default function SearchCard ({data, like, dislike}) {

    return(
        
        <div style={{background: `url(${URL}/${data?.photos[0].slice(2, data.photos[0].length)})`}} className="cardBox">
            <div className="gradient-overlay">
     
                <div className="info">
                     <h1>{data.dogname}</h1>
                     <p>{data.age} y.o, {data.breed}</p>
                     <span className="citySpan">
                        <img alt='locationImg' src={locationImg}/>
                        <p className="city">{data.city}</p>
                     </span>
                </div>
                
                <div className="butns">
                    <button className="btn1"  onClick={dislike}style={{background: `url(${no})`}} ></button>
                    <button className="btn2" onClick={like} style={{background: `url(${yes})`}}></button>
                </div>
        
                </div>
        </div>  
    )
}