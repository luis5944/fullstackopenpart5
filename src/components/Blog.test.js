import React from "react";
import { fireEvent, render } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";
import Blog from "./Blog";

const blog = {
  title: "Hello Darling",
  author: "Junior",
  likes: 0,
  url: "www.dot.com",
  user: { username: "Luis" },
};
let component;
let mockUpdateBlog;
beforeEach(() => {
  mockUpdateBlog = jest.fn();
  component = render(<Blog blog={blog} updateBlog={mockUpdateBlog} />);
});
test("Render Blog by default without URL and Likes", () => {
  let element = component.container.querySelector(".titleAuthor");
  expect(element).toBeDefined();
  element = component.container.querySelector(".url");
  expect(element).toBeNull();
  element = component.container.querySelector(".likes");
  expect(element).toBeNull();
});

test("after clicking the extended button, URL and likes are displayed", () => {
  const button = component.container.querySelector(".extended");
  fireEvent.click(button);

  let element = component.container.querySelector(".url");
  expect(element).toBeDefined();
  element = component.container.querySelector(".likes");
  expect(element).toBeDefined();
});

test("after clicking the like button twice, it calls twice", async () => {
  const mockUpdateBlog2 = jest.fn();
  const component2 = render(<Blog blog={blog} updateBlog={mockUpdateBlog2} />);

  let button = component2.container.querySelector(".extended");
  fireEvent.click(button);
  let button2 = component2.container.querySelector(".updateBlog");
  fireEvent.click(button2);
  fireEvent.click(button2);

  expect(mockUpdateBlog2.mock.calls).toHaveLength(2);
});
