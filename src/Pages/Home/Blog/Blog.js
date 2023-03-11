import React from "react";
import useTitle from "../../../hooks/useTitle";

const Blog = () => {
  useTitle("Blog");
  return (
    <section>
      <div>
        <h2 className="text-5xl text-center">About's Our Products</h2>

        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-5 mt-10">
          <div className="collapse">
            <input type="checkbox" className="peer" />
            <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
              What are the different ways to manage a state in a React application?
            </div>
            <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
              <p>
                React state management is a process for managing the data that React components need in order to render
                themselves. This data is typically stored in the component's state object. When the state object
                changes, the component will re-render itself. React state management is basically half of a React app
              </p>
            </div>
          </div>
          <div className="collapse">
            <input type="checkbox" className="peer" />
            <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
              How does prototypical inheritance work?
            </div>
            <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
              <p>
                The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It
                is a method by which an object can inherit the properties and methods of another object. Traditionally,
                in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.
              </p>
            </div>
          </div>
          <div className="collapse">
            <input type="checkbox" className="peer" />
            <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
              What is a unit test? Why should we write unit tests?
            </div>
            <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
              <p>
                The main objective of unit testing is to isolate written code to test and determine if it works as
                intended. Unit testing is an important step in the development process, because if done correctly, it
                can help detect early flaws in code which may be more difficult to find in later testing stages.
              </p>
            </div>
          </div>
          <div className="collapse">
            <input type="checkbox" className="peer" />
            <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
              React vs. Angular vs. Vue?
            </div>
            <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
              <p>
                React is a UI library, Angular is a fully-fledged front-end framework, while Vue.js is a progressive
                framework. They can be used almost interchangeably to build front-end applications, but they’re not 100
                percent the same, so it makes sense to compare them and understand their differences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
