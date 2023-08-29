export default function Dropdown(props: { array: Array<string>, handleChange: any }){
    return(
        <select onChange={props.handleChange} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-8 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700">
            {props.array.map((value) => <option value={value} className="capitalize">{value}</option>)}    
        </select>
    )
}