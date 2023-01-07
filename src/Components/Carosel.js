import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { GetData } from '../API/Api';
import { App_Context } from '../Context/Context_API'
import  axios from 'axios';
import AliceCarousel from "react-alice-carousel";
import { makeStyles , Container} from "@material-ui/core";
import { Link, useNavigate } from 'react-router-dom';
import 'react-alice-carousel/lib/alice-carousel.css';

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "180px", display: "flex",
    alignItems: "center", gap:'1rem',
    paddingLeft:'10px',background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  carouselItem: {
    display: "flex", flexDirection: "column",
    alignItems: "center",cursor: "pointer",
    textTransform: "uppercase",color: "white",
  },
  Carosel_Img:{ borderRadius:'48%' , marginTop:'10px' ,  height:"80%"},
  Carosel_Img_font :{justifyContent:'center' , marginLeft:5, fontSize:'20px', color:'white'},
}));


export const Carosel = () => {
  const [Data, setData] = useState([]);
  const naviagte = useNavigate()
  const {slectVal} = useContext(App_Context);
  const fetchUSER_DATA = async () => {
  const { data } = await axios.get(GetData(slectVal));
  setData(data.results);
};
useEffect(() => {
  fetchUSER_DATA();
}, [slectVal]);
 
const classes = useStyles();
const items = Data.map((elem)=>
      {
              return(
                        <div onClick={()=> naviagte(`/user/:${elem.id.name}`)}>
                              <img  className={classes.Carosel_Img}
                                    src={elem?.picture.large } alt={elem.name}/>
                              <p    className={classes.Carosel_Img_font}>{elem.name.first} {' '}{elem.name.last}</p>
                        </div>
                )      
        })
  const responsive = {
    0: {
      items: 2,
    },
    512 :{
      items: 4,
    },
    800: {
      items: 6,
     
    },
    1000:{
      items: 7,
    }
  };
  return (
    <div className={classes.carousel}>
          <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1000}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            items={items}
            autoPlay
          />
  </div>
  )
} 
