//step 1: Importing react from 'react';
//Step 2: Creating a functionk that returns JSX
//Step 3: Importing this component and using it in app.js
//Step 4: running and building

import React from 'react';

function Welcome(props) {
    return (
        <div>
            <h2> Hello, {props.name}!</h2>
            <p>Welcome to our first component</p>
        </div>
    )
}//closing function

export default Welcome; //exporting function
