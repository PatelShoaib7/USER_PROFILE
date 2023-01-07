import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { Container , TextField  ,LinearProgress ,Paper ,TableRow ,TableHead , TableContainer , TableCell , TableBody , Table} from '@material-ui/core';
import { Button, ButtonGroup, useDisclosure  ,  Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,Text, Toast, useToast, Box, Flex, Checkbox, Input} from '@chakra-ui/react'
import { useEffect } from 'react';
import { GetData_OF_Body } from '../API/Api';
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { App_Context } from '../Context/Context_API';


const useStyles = makeStyles({
  root: {
    width: '95%', 
    padding:'20px',
    "&:hover": {
        backgroundColor: "rgb(250,250,250)",
        boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
        fontSize:'20px',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
      }
  }
  ,
  pagination: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    margin:'auto',
    marginTop:'2rem',
    "& .MuiPaginationItem-root": {
      color: "black",
      border:'1px solid grey',
      height:'3rem',
      width:'3rem',
      fontSize:'18px',
    },
  },
  Container: {
    maxHeight: 500,
    width: '100%',
    fontSize:'18px',

  },
  BTN:{ margin:'20px'}
})


//ALERT MSG DEPENDING UOPN CONDTION
const ALRT_MSG ={
  SUCESS_TOP:{  title: 'Data Fetced Sucessfully', description: "Your Data Is Ready....",
               status: 'success', duration: 2000,isClosable: true,  position:'top' },
  ERROR_TOP:{  title: 'Data Fetching Error', description: "Fetch Data First To See Diffrent Category",
               status: 'error', duration: 5000,isClosable: true, },
  ERRRO_BOTTOM: {title: 'Data Fetching Error', description: "Opps Data Is Alredy Availabe",
              status: 'error', duration: 5000, isClosable: true, }

}
export const Body_Table = () => {
    const classes = useStyles();
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate();
    const {page , setPage , slectVal}=useContext(App_Context);
    const [sortBy , setSortBy]=useState('');
    const [loading , setLoading]=useState(false)
    const [Data , setRowData]=useState([]);
    const [userDATA , setUserDATA]=useState([])

//FETHCING API TO SHOAW DATA
    const fetch_Body_DATA =async ()=>{
              setLoading(true)
                const {data} = await axios.get(GetData_OF_Body(page, slectVal))
                //  console.log(data.results,'fetch data ')
                setRowData(data.results)
                setLoading(false)
          }
//FUNCTIONS INSIDE OBJECT TO SORT DATA 
   const sortyBy_FUN ={
         NONE:(()=> null),
         ASC_Ord:((a,b)=>(a.dob.age - b.dob.age)),
         DSC_Ord:((a,b)=> (b.dob.age - a.dob.age))
   }
//TO UPDATE WHENEVR SELECTED VALUE CHANGES
    useEffect(()=>{
        fetch_Body_DATA(); 
       
    },[slectVal])
//TO FILTER OUT DATA ONLY TO FETCH WHEN CLICKED BY USE
//ONLY FETCH WHEN THERE IS NO DATA ELSE SHOW ERROR

    const handleSearch = () => {
      if(userDATA.length == 0){
           const updatedDATA = Data.filter( (elem) => elem  );
           setUserDATA(updatedDATA)
           setTimeout(() => {
            toast(ALRT_MSG.SUCESS_TOP)
           }, 200);
      }else{
         toast(ALRT_MSG.ERRRO_BOTTOM);
         setTimeout(() => {
          toast.closeAll()
         }, 2000);
      }
      };
//WILL DELETE ALL THE DATA ON UI 
//MODEL WILL BE DISPLAYED TO DLETE OR NOT IF YES THEN DELTE ELSE CANCLE OERATION
   const handleDElete=()=>{
        setUserDATA([]);
        onClose();

      }
//DEPENDING UPON IPUT MAKE OR FEMALE TO SHOW THE DATA 
//AVIOD DOUBLE CLICK SHOW DATA ON FIRST SLICK ONLY
 const Filter_By_Gender =(e)=>{
  const {name , checked  , value} = e.target;
  
         console.log(name , checked , value)
         if(checked == true){
         const upDatedData = Data.filter((elem)=> elem.gender == name)
         setUserDATA(upDatedData)   
         console.log(upDatedData,'updated DATTATA ')
         }
 }
//SORT THE DATA AS PER THE USER SELECTION
 const Sort_BY_Order=(e)=>{
  const {name , checked  , value} = e.target;
  if(checked == true){
      setSortBy(e.target.value)
  }
 }

 //HANLE REST OF ALL FILTERS 

    return (
  
        <div className={classes.Container}>
        {/* BUTTON FOR SHOWING FETCH DELETE */}
          <Box>
           <Button className={classes.BTN} colorScheme={'whatsapp'} onClick={handleSearch} >{userDATA.length == 0 ? "Fetch DATA" : "RE FETCH DATA"} </Button>
           <Button colorScheme={'red'}  disabled={userDATA.length == 0 } onClick={onOpen}>Delete All Data</Button>
          
           
           {/* FLEX BOS TO SHOW FITERING CONDITIONS */}
           <Flex >
               
                 <Box p='4' >
                         <label>Male</label>
                  <Checkbox type="radio" border={null}
                            value="male" name="male"
                             onChange={(e)=>Filter_By_Gender(e)} m='1'
                             disabled={userDATA.length==0}/>
                  </Box>
                  <Box p='4' >
                       <label>FeMale</label>
                       <Checkbox type="radio" border={null}
                                 value="female" name="female"
                                  onChange={(e)=>Filter_By_Gender(e)} m='1'
                                 disabled={userDATA.length==0} />
                   </Box>
                     <Box p='4' >
                        <label>ASC</label>
                        <input  type="radio" border={null}
                                   value="ASC_Ord" name="sortBy"
                                   onChange={(e)=>Sort_BY_Order(e)} m='1'
                                   disabled={userDATA.length==0} />
                    </Box>
                    <Box p='4' >
                        <label>DESC</label>
                        <input type="radio" border={null}
                                  value="DSC_Ord" name="sortBy"
                                   onChange={(e)=>Sort_BY_Order(e)} m='1'
                                   disabled={userDATA.length==0} />
                    </Box>
                   
        </Flex>
          </Box>
          
     {/* IF DATA IS LOADFING THEN SHOW LINEAR PROGRESS BAR      */}
     {loading ? <LinearProgress/> : null }
  
  {/* TO SHOW THE  TABLE HAED MAP REAUIED HAEDING PUTTING INSIDE THE ARR */}
     <Paper  >
      <TableContainer   >
        <Table stickyHeader aria-label="sticky table" >
            <TableHead  >
                      <TableRow  >
                        { ["PROFILE",'GENDER' ,"FIRST NAME" , "LAST NAME" , "AGE" , "MOB NUM" ,"EMAIL-ID"].map((Column_Label) => ( 
                          <TableCell key={Column_Label} >
                                    {Column_Label}
                          </TableCell>
                        ))}
                      </TableRow>
            </TableHead>
{/* IF DATA IS PRESNET THE FETCH INSIDE THE TABLE ROWS  ELSE DO NOT MAP DATA INSIDE THE ROWS*/}
      <TableBody>
            { userDATA.length ? userDATA.slice((page-1)*10,(page-1)*10 + 10).sort(sortyBy_FUN[sortBy]).map((elem , index)=>(   
                <TableRow className={classes.root} onClick={()=> navigate(`/user/:${elem.id.name}`)}>
                          <TableCell > 
                              <img src={elem.picture.medium}  style={{borderRadius:'48px' , width:'40px'}} />
                          </TableCell>
                          <TableCell  > 
                                      {elem.gender}
                           </TableCell>
                           <TableCell > 
                                      {elem.name.first}
                           </TableCell>
                           <TableCell > 
                                      {elem.name.last}
                           </TableCell>
                           <TableCell > 
                                      {elem.dob.age}
                           </TableCell>
                           <TableCell  > 
                                      {elem.cell}
                           </TableCell>
                           <TableCell > 
                                      {elem.email}
                           </TableCell>
                </TableRow>
               
            )) 
            : null
         }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
{/* DIV FOR SHOEING PAGINATION SELCT PAGE NUMBER AS PER YOUR CHIOICE */}
    <div  className={classes.pagination}>
    {
        //setPage
              userDATA.length ?
               <Pagination       //pagination
                                 count={Math.round(Number((userDATA?.length/10).toFixed(1)))}
                                 variant="outlined" color="secondary"
                                 onChange={(elem , value)=>{ setPage(value)}} >
               </Pagination> 
               : null  
         }
    </div>

    {/* IF NO DATA IS FETCH AND ERROOR OCCURS WILL SHOW THIS MSG FOR SOMETHING WENT WRONG */}
        <div>
            {
              
                  userDATA.length   ? null : <div style={{color:'lightgrey', fontSize:'30px'}}>No Data To Show Plzz Click On Fetch Button To See Data</div>
            }
        </div>


















        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete All Data</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontWeight='bold' mb='1rem'>
                  All The Data Will Be  Deleted Completely From Memory
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='whatsapp' mr={3} onClick={onClose}>
                Cancle
              </Button>
              <Button variant='solid' onClick={handleDElete}  colorScheme='red'>Delete</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
}