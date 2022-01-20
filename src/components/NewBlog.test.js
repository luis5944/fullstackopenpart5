import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NewBlog from "./NewBlog";

test("<NewBlog /> updates parent state and calls onSubmit", () => {
  const createBlog = jest.fn();
  const setNotification = jest.fn();
  const user = jest.fn();
  const component = render(
    <NewBlog
      saveBlog={createBlog}
      setNotification={setNotification}
      user={user}
    />
  );

  const input = component.container.querySelector("#title");
  const form = component.container.querySelector("#form");

  fireEvent.change(input, {
    target: { value: "testing of forms could be easier" },
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe(
    "testing of forms could be easier"
  );
});
