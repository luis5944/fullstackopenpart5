import React, { useState } from "react";
import { useImperativeHandle } from "react";

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div>
        <button
          style={hideWhenVisible}
          onClick={() => {
            setVisible(true);
          }}
        >
          Create New Blog
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button
          onClick={() => {
            setVisible(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
});

export default Togglable;
