import locationImg from "../Img/Location.svg"
import no from "../Img/no.svg"
import yes from "../Img/ok.svg"

export default function SearchCard ({data, like, dislike}) {

    console.log(data)

    return(
        
        <div style={{background: `url(http://localhost:3333/${data?.photos[0].slice(2, data.photos[0].length)})`}} className="cardBox">
            <div className="gradient-overlay">
     
                <div className="info">
                     <h1>{data.dogname}</h1>
                     <p>{data.age} y.o, {data.breed}</p>
                     <span className="citySpan">
                        <img src={locationImg}/>
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