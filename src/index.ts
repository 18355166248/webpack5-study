import "./assets/css/common.css";
import { isFunction } from "./utils/base";

class Dog {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  eat() {
    console.log("eat");
  }

  run() {
    console.log("run");
  }
}

const d = new Dog("corji");

d.eat();

const f = () => {
  return "f";
};

export const g = (v: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (v === 1) {
      reject("error");
    }

    resolve("g");
  });
};

console.log(f());

console.log("f是否是函数", isFunction(f));

g(1)
  .then(() => {
    console.log(22);
  })
  .catch((err) => {
    console.log(err);
  });

g(2)
  .then(() => {
    console.log(22);
  })
  .catch((err) => {
    console.log(err);
  });

const foo = "foo";
console.log("🚀 ~ foo:", foo);
