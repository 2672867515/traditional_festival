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
            id:'start',
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
    const [play,setPlay]=useState(false)
    const [position,setPosition]=useState(0)
    const [time,setTime]=useState(1000)
    const [timer,setTimer]=useState<any>('')
    const active=(i)=>{
        const newBlock= block.map((item)=>{
            if(item.id=== sort[i]){
                item.choose=true
                return item
            }
            else{
                item.choose=false
                return item
            }
         
        })  
        setBlock(newBlock)
    }
    const stop=()=>{ 
        if(time<0)        
        clearInterval(timer)

    }

    const start=(id)=>{
        
        if(id==='start'&&!play){
            let i=0
            let time=1000
            setPlay(true)
            const cir= ()=>{
                setTimer( setInterval(() => {
                    if(i>7)
                    {
                        i=0
                        setPosition(0)
                    }
                    active(i)
                    setPosition(i)
                    i++
                   time-=100
                   setTime(time)
                   if(time<0){
                    stop()
                   }
                 
                }, 200))
             
                
            }
          cir()
        }
        if(id==='start'&&play){
            setPlay(false)
           stop()
        }
        
    }
    return(
        <>
        <div className="mainBox">
        {/* 'item-'+`${sort[index]}`+'active' */}
        {block.map((item,index)=>  <div className={item.choose?'active':'def'} key={item.id} onClick={()=>start(item.id)}>{block[index].id}</div>)}
        </div>

        </>
    )
}
export default Luck