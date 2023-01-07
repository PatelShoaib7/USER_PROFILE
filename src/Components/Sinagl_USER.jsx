import React from 'react'
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    Conatinr :{
                 fontSize:'16px', color:'grey' ,
                 textAlign:'justify',display:'grid',
                 gridTemplateColumns:'repeat(2,1fr)',
                 width:'100%',gap:'1rem',
                 marginLeft:'2rem'
                },
    Container_Child :{
                  border:'0.5px solid lightgrey',
                  borderRadius:'8px', display:'flex',
                  marginLeft:'1rem', paddingLeft:"10px",
                  alignItems:'center',
                  width:'100%' , border:'0.5px solid lightgrey'
    }

    
}))
export const Sinagl_USER = ({user}) => {
    const classes = useStyles();

  return (
    <div style={{marginTop:'50px'}}>
         <h1 style={{color:'grey' , marginLeft:'2rem' , fontSize:'30px'}}>Other Details </h1>
         {
            user.map((elem)=>(
                <div className={classes.Conatinr}>
                     <div className={classes.Container_Child}>
                           <h5> NickName : </h5>
                           <br />
                           <p> {elem.id.name} </p>
                     </div>
                     <div className={classes.Container_Child}>
                           <h5> UserName : </h5>
                           <br />
                           <p> {elem.login.username} </p>
                     </div> 
                     <div className={classes.Container_Child}>
                           <h5> Password : </h5>
                           <br />
                           <p> {elem.login.password} </p>
                     </div>  
                     <div className={classes.Container_Child}>
                           <h5> Reg Num   : </h5>
                           <br />
                           <p> {elem.id.value} </p>
                     </div>  
                     <div className={classes.Container_Child}>
                           <h5>  Country : </h5>
                           <br />
                           <p> {elem.location.city} </p>
                     </div>
                     <div className={classes.Container_Child}>
                           <h5> State : </h5>
                           <br />
                           <p> {elem.location.state} </p>
                     </div>
                     <div className={classes.Container_Child}>
                           <h5> Address  : </h5>
                           <br />
                           <p> {elem.location.street.name} </p>
                     </div>
                     <div className={classes.Container_Child}>
                           <h5> TimeZone : </h5>
                           <br />
                           <p> {elem.location.timezone.description} </p>
                     </div>
                     <div className={classes.Container_Child}>
                           <h5> Time : </h5>
                           <br />
                           <p> {elem.location.timezone.offset} </p>
                     </div>
                     <div className={classes.Container_Child}>
                           <h5> RGST UUID : </h5>
                           <br />
                           <p> {elem.login.salt} </p>
                     </div>
                </div>
            ))
         }
    </div>
  )
}

