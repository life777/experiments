import './App.css';
import { List } from "./List.js";
import { AdvancedList } from "./AdvancedList.js";
import { DependentList } from "./DependentList.js";
import { useState } from 'react';

function App() {
    const [index, setIndex] = useState(undefined);

  return (
    <div className="App">
        <h1>Some lists</h1>
        <div>
            <h2>List of As</h2>
            {/* <List /> */}
            <AdvancedList select={setIndex} />
            { index !== undefined ? <DependentList index={index}></DependentList> : undefined }
        </div>
    </div>
  );
}

export default App;
