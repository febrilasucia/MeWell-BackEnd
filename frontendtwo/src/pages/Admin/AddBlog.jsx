import React, { useState } from 'react';

import { PickerOverlay } from 'filestack-react';
const AddBlog = () => {
  const [isPicker, setIsPicker] = useState(false);
  return (
    <div>
      <form>
        <label>pick image</label>
        <button onClick={() => setIsPicker(!isPicker)}>click</button>
        {isPicker && (
          <PickerOverlay
            apikey={'AW44Sa5W9Rvqz3cJlpFxKz'}
            onSuccess={(res) => console.log(res)}
            onUploadDone={(res) => console.log(res)}
          />
        )}
      </form>
    </div>
  );
};

export default AddBlog;
