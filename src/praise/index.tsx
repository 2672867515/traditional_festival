import React, { useState } from 'react'
import './index.less'
const Luck=()=>{
    const [block,setBlock]=useState([
        {
            id:1,
            pic:'',
            choose:false
        },
        {
            id:2,
            pic:'',
            choose:false
        },
        {
            id:3,
            pic:'',
            choose:false
        },
        {
            id:4,
            pic:'',
            choose:false
        },
        {
            id:5,
            pic:'',
            choose:false
        },
        {
            id:6,
            pic:'',
            choose:false
        },
        {
            id:7,
            pic:'',
            choose:false
        },
        {
            id:8,
            pic:'',
            choose:false
        },
        {
            id:9,
            pic:'',
            choose:false
        }
    ])
    const [sort,setSort]=useState([1,2,3,6,9,8,7,4])
    const start=(id)=>{
        if(id===5){
            let a=1
            return ()=>{
                setInterval(() => {
                    if(a>8)
                    {
                        a=1
                    }
                    
                    const newdata=   {
                        id:a,
                        pic:'',
                        choose:true
                    }
                    const newblock=[...block,newdata]
                    setBlock(newblock)
console.log(a);

                    a++
                }, 1000);
            }
          
        }
    }
    return(
        <>
        <div className="mainBox">
        {/* 'item-'+`${sort[index]}`+'active' */}
        {block.map((item,index)=>  <div className={item.choose?'active':'def'} key={item.id} onClick={()=>start(item.id)()}>{block[index].id}</div>)}
        </div>

        </>
    )
}
export default Luck