import './App.css';
import {useState} from "react";
import axios from "axios"


function App() {

  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [country, setcountry] = useState('');
  const [position, setPosition] = useState('');
  const [wage, setWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);
  // const [project, setProject] = useState('');
  // const [materials, setMaterials] = useState('');
  // const [steps, setSteps] = useState('');
  // const [budget, setBudget] = useState(0);

  // const displayInfo = () => {
  //   console.log(name + age + country + position + wage + project + materials + steps + budget);
  // }

  
  const addEmployee = ()=> {
    console.log(name);
    axios
      .post('http://localhost:3001/create', 
      {
        name: name, 
        age: age, 
        country: country, 
        position: position, 
        wage: wage
      })
      .then(()=> {
        console.log("Success");
        setEmployeeList([...employeeList, {
          name: name, 
          age: age, 
          country: country, 
          position: position, 
          wage: wage
        }])
    })
  }


  const getEmployees = () => {
    axios
      .get('http://localhost:3001/employees')
      .then ((responce) => {
        console.log(responce.data);
        setEmployeeList(responce.data)
      })
  }

  return (
    <div className="App">
      <div className="information">
        <h2>Add a new employee</h2>
        <label>Name: </label>
        <input type="text" onChange={(event) => {
          setName(event.target.value) //what is entered in the field is grabbed by the setState hook and can be console.logged
        }}/>
        <label>Age:</label>  
        <input type="number" onChange={(event) => {
          setAge(event.target.value)
        }}/>
        <label>Country:</label>
        <input type="text" onChange={(event) => {
          setcountry(event.target.value)
        }}/>
        <label>Position</label>
        <input type="text" onChange={(event) => {
          setPosition(event.target.value)
        }}/>
        <label>Wage (year):</label>
        <input type="number" onChange={(event) => {
          setWage(event.target.value)
        }}/>
        <button onClick={addEmployee}>Add employee</button>
      </div>
        <h2>Current employees:</h2>
        <div className='employees'>
          <button onClick={getEmployees}>Show employees</button>
          
          {employeeList.map((value, key) => {
            return (
              <div className='employee__list'>
                <ul>
                  <li>
                    Name: {value.name} Age: {value.age} Country: {value.country} 
                  </li>
                </ul>
                
              </div>
            )
          })}
        </div>
        
    </div>
  );
}

export default App;
