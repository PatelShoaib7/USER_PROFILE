import React, { useEffect, useState } from 'react'
import { Sinagl_USER } from '../Components/Sinagl_USER'
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { get_singal_User } from '../API/Api';
import axios from 'axios'
import {LinearProgress } from '@material-ui/core'
import { Navbar } from '../Components/Navbar';

const useStyles = makeStyles((theme) => ({
  container :{
       display:'flex', 
      [theme.breakpoints.down('md')]:{
      flexDirection:'column', alignItems:'center', border:"none"
      }
  },
  sideBar:{
      width:'30%',display:'flex', flexDirection:'column',
      alignItems:'center', borderRight:'0.5px solid lightgrey', marginTop:'50px',
      [theme.breakpoints.down('md')]:{
        width:'100%',
        borderRight:"none "
      }
  },
  Other_details:{
     width:'70%',display:'flex', flexDirection:'column', alignItems:'center'
  }
}))
export const UserDetails = () => {
  const classes = useStyles();
  const {id} = useParams();
  const [user , setUser]=useState([]);
  const [loading , setLoading]=useState(false)

  //API FETHING DATA FROM THE SERVER
    const singal_user_data = async ()=>{
              setLoading(true)
              const {data} = await axios.get(get_singal_User(id))
              setUser(data.results)
              setLoading(false)        
    }
  //FOR UPDATING DATA 
  useEffect(()=>{
    singal_user_data()
  },[])

  return (
    <div className={classes.container}>
          <div  className={classes.sideBar}>   
              <h1>{user.gender} {" "}</h1>
                  { 
                    user.map((elem)=>(
                        <div>
                             <img src={elem.picture.large} style={{borderRadius:'12px', width:'100%'}}/>
                              <p>Name :{elem.name.first} {elem.name.last}</p>
                              <p>Email : {elem.email}</p>
                              <p>Mob Num : {elem.cell}</p>
                              <p>Gender : {elem.gender}</p>
                              <p>Gender : {elem.dob.age}</p>
                        </div>
                    ))
                  }
        </div>
    <div >
               <Sinagl_USER user={user} />
    </div>
    </div>
  )
}
