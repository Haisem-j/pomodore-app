import React from 'react';


const NoMatch = (props)=>{

    setTimeout(()=>{
        props.history.push('/')
    }, 2000)
    
    return(
        <h1>Link Does Not Exist</h1>
    )
}

export default NoMatch