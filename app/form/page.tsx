"use client";
import { useState } from "react";
import NavBar from "../components/NavBar";
import Dropdown from "../components/Dropdown";


export default function Input() {

  const choices = ["breakfast", "lunch", "dinner", "snack", "smoothie"]
  const diets = ["vegan", "paleo", "gluten free", "keto", "dairy free", ""]
  const advanced_options = ["low carb", "low calorie", "high protein", ""]

  const [checked, setChecked] = useState(true)
  
  const [formInputs, setFormInputs] = useState({
    foodChoice: "Breakfast",
    diet: "",
    advanced: "",
    speed: checked
  })

  const [recipe, setRecipe] = useState("");
  const [buttonOperational, setButtonOperational] = useState(false)

  

  const handleChoice = (e: any) => {
    setFormInputs(existingValues => ({
        ...existingValues,
        foodChoice: e.target.value
    }))
  };

  const handleDiet = (e: any) => {
    setFormInputs(existingValues => ({
        ...existingValues,
        diet: e.target.value
    }))
  };

  const handleAdvance = (e: any) => {
    setFormInputs( existingValues => ({
        ...existingValues,
        advanced: e.target.value
    }))
  }

  const handleSpeed = (e: any) => {
    setChecked(!checked)
    setFormInputs(existingValues => ({
        ...existingValues,
        speed: checked
    }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formInputs)
    setButtonOperational(true)
    if (e === "") return "Invalid input please try again with a valid value";
    if (recipe != "") {
        setRecipe("")
    }
    callAPI(formInputs);
  };


  async function callAPI(formData: {foodChoice: string, diet: string, advanced: string, speed: boolean}) {
    try{
        const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt: formData.foodChoice,
            diet: formData.diet,
            advanced: formData.advanced,
            quick: `${formData.speed ? "quick" : " "}`
        }),
    });
        const data = res.body;
        const reader = data?.getReader();
        const decoder = new TextDecoder();
        let done = false;
        if(!reader) throw new Error("reader not found");
        
        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            setRecipe((value) => value + chunkValue);
        }

        setButtonOperational(false)
    }
    catch(err){
        console.log(err);
    }
  }

  return (
    <>
      <NavBar />
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 my-10 px-2 mx-auto max-w-screen-xl text-white rounded-lg"
      >
        <div className="p-10 text-center">
          <h1 className="text-3xl">
            Enter your parameters below to get a recipe from Chef AI!
          </h1>
        </div>
        <div className="flex-col align-middle">
          <div className="flex justify-between max-w-screen-md mx-auto">
            {/*Food Choice*/}
            <div className="flex-col">
              <div>
                <label htmlFor="choice">Food Choice:</label>
              </div>
              <Dropdown array={choices} handleChange={handleChoice}/>

            </div>
            {formInputs.foodChoice != "smoothie" && (
                <div className="flex-col">
                <div>
                  {/*Specialty Diet*/}
                  <label htmlFor="choice">Specialty Diet:</label>
                </div>
                <Dropdown array={diets} handleChange={handleDiet} />
              </div>
            )}
            <div className="flex-col">
              <div>
                <label htmlFor="choice">Advance:</label>
              </div>
                <Dropdown array={advanced_options} handleChange={handleAdvance} />
            </div>
          </div>
          <div className="flex justify-center pt-10 items-center">
              <label htmlFor="" className="px-5">In a rush: </label>
              <input type="checkbox" value="quick" name="quick" className=" w-4 h-4" checked={checked} onChange={handleSpeed}/>
            </div>
        </div>
        <div className="flex m-0 p-0">
          <input
            type="submit"
            value="submit"
            className="text-white bg-gray-600 py-2 px-8 my-10 rounded-lg mx-auto disabled:hidden"
            disabled={buttonOperational}
          />
        </div>
      </form>
      <div>
      {recipe != "" && (
        <div className="bg-gray-900 my-10 px-2 mx-auto max-w-screen-xl text-white lg:py-16 rounded-lg">
          <div className=" w-3/4 mx-auto">
            <h1 className="text-center text-3xl"></h1>
            <p className="whitespace-pre-line p-3">{recipe}</p>
          </div>
          </div>
      )}
      </div>
    </>
  );
}
