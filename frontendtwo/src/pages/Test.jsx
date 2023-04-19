import React from 'react';

const pop = async () => {
  // const response = await upload();
  // console.log(response);
};

// const upload = async () => {
//   const client = filestack.init('AW44Sa5W9Rvqz3cJlpFxKz');
//   const options = {
//     accept: ['image/*'],
//   };
//   const response = await client.picker(options).open();
//   return response
// };

const Test = () => {
  return (
    <div>
      <button onClick={pop}>click</button>
    </div>
  );
};

export default Test;
