import React from 'react';

// NumberItem interface
interface NumberItem {
  value: number;
}

// HoistingDemo component to demonstrate variable and function hoisting
const HoistingDemo: React.FC = () => {
  // Function hoisting demonstration
  // This function can be called before it's declared due to hoisting
  console.log(hoistedFunction()); // Works due to function hoisting
  
  function hoistedFunction() {
    return "This function is hoisted!";
  }

  // Variable hoisting demonstration
  // Note: Let and const have different hoisting behavior than var
  console.log(hoistedVar); // undefined (due to var hoisting)
  // console.log(hoistedLet); // Would throw ReferenceError (temporal dead zone)
  
  var hoistedVar = "I'm a hoisted var";
  let hoistedLet = "I'm a let (not hoisted in the same way)";
  const hoistedConst = "I'm a const (not hoisted in the same way)";

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <h3>Hoisting Demonstration</h3>
      <p>Check the browser console to see hoisting in action!</p>
      <ul>
        <li>Function hoisting: Functions are fully hoisted</li>
        <li>var variables: Hoisted but initialized with undefined</li>
        <li>let/const variables: Hoisted but in temporal dead zone until declaration</li>
      </ul>
    </div>
  );
};

// ConstructorDemo component to demonstrate constructors
class NumberCollection {
  private numbers: NumberItem[];

  constructor(initialNumbers: number[]) {
    this.numbers = initialNumbers.map(num => ({ value: num }));
    console.log("Constructor called - NumberCollection instance created");
  }

  getNumbers(): NumberItem[] {
    return this.numbers;
  }

  filterEven(): NumberItem[] {
    return this.numbers.filter(item => item.value % 2 === 0);
  }

  doubleNumbers(): NumberItem[] {
    return this.numbers.map(item => ({ value: item.value * 2 }));
  }

  logNumbers(): void {
    this.numbers.forEach(item => {
      console.log(`Number: ${item.value}`);
    });
  }
}

const ConstructorDemo: React.FC<{ numbers: number[] }> = ({ numbers }) => {
  // Using constructor to create an instance
  const numberCollection = new NumberCollection(numbers);

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <h3>Constructor Demonstration</h3>
      <p>NumberCollection instance created with constructor</p>
      <p>Total numbers: {numberCollection.getNumbers().length}</p>
    </div>
  );
};

// NumberList component to display the list of numbers
const NumberList: React.FC<{ numbers: NumberItem[], title: string }> = ({ numbers, title }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <h3>{title}</h3>
      <ul>
        {numbers.map((item, index) => (
          <li key={index}>{item.value}</li>
        ))}
      </ul>
      <p>Total items: {numbers.length}</p>
    </div>
  );
};

// FilterControls component to handle filtering and mapping actions
const FilterControls: React.FC<{ 
  numbers: NumberItem[], 
  onFilterEven: () => void,
  onDoubleNumbers: () => void,
  onReset: () => void 
}> = ({ numbers, onFilterEven, onDoubleNumbers, onReset }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <h3>Filter & Map Controls</h3>
      <button onClick={onFilterEven} style={{ margin: '5px' }}>
        Filter Even Numbers
      </button>
      <button onClick={onDoubleNumbers} style={{ margin: '5px' }}>
        Double All Numbers
      </button>
      <button onClick={onReset} style={{ margin: '5px' }}>
        Reset to Original
      </button>
      <p>Current array methods demonstration:</p>
      <ul>
        <li><strong>filter():</strong> Creates new array with elements that pass test</li>
        <li><strong>map():</strong> Creates new array with results of calling function on every element</li>
        <li><strong>forEach():</strong> Executes function on each element (used in logging)</li>
      </ul>
    </div>
  );
};

// Logger component to handle logging each number to the console
const Logger: React.FC<{ numbers: NumberItem[] }> = ({ numbers }) => {
  const handleLogNumbers = () => {
    console.log("=== Logging Numbers using forEach ===");
    numbers.forEach(item => {
      console.log(`Number: ${item.value}`);
    });
    console.log("=== End of Log ===");
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <h3>Console Logger</h3>
      <button onClick={handleLogNumbers}>
        Log Numbers to Console
      </button>
      <p>Click the button and check browser console to see forEach in action!</p>
    </div>
  );
};

// Main App component that combines all components
const App: React.FC = () => {
  const initialNumbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [numbers, setNumbers] = React.useState<NumberItem[]>(
    initialNumbers.map(num => ({ value: num }))
  );

  const handleFilterEven = () => {
    const evenNumbers = numbers.filter(item => item.value % 2 === 0);
    setNumbers(evenNumbers);
  };

  const handleDoubleNumbers = () => {
    const doubledNumbers = numbers.map(item => ({ value: item.value * 2 }));
    setNumbers(doubledNumbers);
  };

  const handleReset = () => {
    setNumbers(initialNumbers.map(num => ({ value: num })));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>JavaScript Concepts Demo</h1>
      
      <HoistingDemo />
      
      <ConstructorDemo numbers={initialNumbers} />
      
      <FilterControls 
        numbers={numbers}
        onFilterEven={handleFilterEven}
        onDoubleNumbers={handleDoubleNumbers}
        onReset={handleReset}
      />
      
      <NumberList numbers={numbers} title="Current Numbers" />
      
      <Logger numbers={numbers} />
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5' }}>
        <h3>JavaScript Concepts Demonstrated:</h3>
        <ul>
          <li>Variable Hoisting (var, let, const)</li>
          <li>Function Hoisting</li>
          <li>Array Methods: filter(), map(), forEach()</li>
          <li>Constructors and Classes</li>
          <li>React Components and State Management</li>
          <li>TypeScript Interfaces</li>
        </ul>
      </div>
    </div>
  );
};

export default App;