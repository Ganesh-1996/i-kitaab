import React from 'react'
import { useContext } from 'react';
import context from '../Context/context';


const About=()=> {
    const details = useContext(context)
    console.log(details)
  return (
    <div>My name is {details.name} and age is {details.age}</div>
  )
}

export default About;