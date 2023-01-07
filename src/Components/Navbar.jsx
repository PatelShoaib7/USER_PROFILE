import React, { useContext } from 'react'
import { App_Context } from '../Context/Context_API'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Heading } from '@chakra-ui/react';



 const useStyles = makeStyles({
  firstDiv: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 40,
    display:'flex',
    padding: '0 30px',
    justifyContent:'center',
    alignItems:'center',
  
  },
});
export const Navbar = () => {
      const classes = useStyles();
    return (
    <div className={classes.firstDiv}>
          <p style={{fontSize:'25px'}}>COINTAB ASSIGNMENTS </p>  
    </div>
  )
}
