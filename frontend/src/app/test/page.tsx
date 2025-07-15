"use client";
import ReviewStars from "@/components/reviewStars/ReviewStars";
import React, { ChangeEvent, useState } from "react";

export default function page() {
 

    const [stars,setstars]=useState(0)
    const onchange=(value:number)=>{
        setstars(value)
        console.log("fired",value)
    }
  return (
    <>
      <ReviewStars
        value={3.5}
        // disabled={true}
        onChange={onchange}     
      />
      <div>sdadas</div>
      <button className="btn btn-primary" onClick={()=>{console.log(stars)}}>click me</button>
    </>

  );
}
