import Heading from "./Components/Heading";
import Section from "./Components/Section";
import Counter from "./Components/Counter";
import List from "./Components/List";

import { useState } from "react";

function App() {
  //* Array & Object types

  //! Arrays
  const stringArr: string[] = ["one", "two", "three"];
  let guitars: (string | number)[] = ["Strat", "Les Paul", 5150];
  let mixedData: (string | number | boolean)[] = ["EVH", 1984, true];

  const schools: string[] = ["tgs", "mags", "wbhs"];

  //! Tuple

  let myTuple: [string, number, boolean] = ["Dave", 42, true];
  let mixed = ["John", 17, false];

  //! Object

  let myObj: object;
  myObj = [];
  //?  console.log(typeof myObj);

  const theObj = {
    one: "dave",
    two: false,
  };

  interface Guitarist {
    name?: string;
    active: boolean;
    albums: (string | number)[];
  }

  let EVH: Guitarist = {
    name: "Eddie",
    active: false,
    albums: [1984, 515, "OU812"],
  };

  let JP: Guitarist = {
    name: "jimmy",
    active: false,
    albums: ["LZ1", 4, "Physical Graffiti"],
  };

  const greetGuitarist = (guitarist: Guitarist) => {
    if (guitarist.name) {
      return `Hello ${guitarist.name.toUpperCase()}`;
    }
    return undefined;
  };

  //TODO  console.log(greetGuitarist(JP))

  //! enum

  enum Grade {
    U = 2,
    D = 4,
    C,
    B,
    A,
  }

  //! Type Aliases

  type stringOrNumber = string | number;
  type stringOrNumberArr = (string | number)[];
  type UserId = stringOrNumber;
  // Can't do this with interfaces!

  //! Literal Types
  let username: "Dave" | "Amy";
  // ?  username = 'Don' {error!}
  // Variables where only certain values are to be expected


  //////////////////////////////////////////////////////////////////////////////////////////////////!

  //* Functions

  const add = (a: number, b: number): number => a + b;

  const cl = (message: any): void => console.log(message);
  //TODO  cl(add(2, 3));

  // with using type aliases
  type mathFunc = (a: number, b: number) => number;
  const multiply: mathFunc = (c, d) => c * d;
  //TODO  cl(multiply(4, 9));

  // with using interfaces

  interface MathFunc {
    (a: number, b: number): number;
  }

  //! Optional Params

  const addAll = (a: number, b: number, c?: number): number => {
    if (typeof c !== "undefined") {
      return a + b + c;
    }
    return a + b;
  };

  //! default param values

  const sumAll = (a: number = 10, b: number, c: number = 2): number =>
    a + b + c;
  // TODO cl(sumAll(undefined, 3, 2))

  //! Rest parameters

  const total = (a: number, ...nums: number[]): number => {
    return a + nums.reduce((prev, curr) => prev + curr);
  };
  // TODO cl(total(1,2,3,4))

  //! Never type

  const createError = (errorMsg: string): never => {
    throw new Error(errorMsg);
  };

  //?  const infinity = () => {
  // ?  let i: number = 1
  //  ? while (true) {
  //  ?   i++
  //  ? }
  // ? } ---Endless Loop!
  // If a break statement {if (i > 100)} was included, return type would become 'void'

  // custom type guard
  const checker = (value: number): boolean =>
    typeof value === "number" ? true : false;

  // use of the never type
  const numOrString = (value: number | string): string => {
    if (typeof value === "string") return "string";
    else if (checker(value)) return "number";
    return createError("Error");
  };



  ////////////////////////////////////////////////////////////////////////////////////////////!
  //* Type Assertions/Casting

  type One = string;
  type Two = string | number;
  type Three = "hello";

  //! convert to more or less specific
  let a: One = "hello";
  let b = a as Two; // less specific
  let c = a as Three; // more specific

  // assertions for narrowing

  const addOrConcat = (
    a: number,
    b: number,
    c: "add" | "concat"
  ): number | string => {
    if (c === "add") return a + b;
    return "" + a + b;
  };
  let myVal: string = addOrConcat(2, 2, "concat") as string;
  let nextVal: number = addOrConcat(2, 2, "concat") as number; //TS sees no problem - but a string is returned

  // Force casting / Double casting
  10 as unknown as string; // compared to {10 as string}


  //////////////////////////////////////////////////////////////////////////////////////////////!

  //* Classes

  class Coder {

    secondLang!: string

    constructor(
      public readonly name: string, 
      public music: string, 
      private age: number, // only be accessed in this class
      protected lang: string = 'Typescript') //only accessible in subclasses && this class
      {
      // this.name = name;
      // this.music = music;
      // this.age = age;
      // this.lang = lang;

       }

       public getAge() {
        return `Hello, I'm ${this.age}`
       }
  }

  const Dave = new Coder('Dave', 'Rock', 42 )
  // TODO cl(Dave.getAge())
  
  
  class WebDev extends Coder {
    constructor(
      public computer: string, 
      name: string,
      music: string,
      age: number,) {
        super(name, music, age)
        this.computer = computer
      }

      public getLang() {
        return `I write ${this.lang}`
      }
  }

  const Sara = new WebDev('Mac', 'Sara', 'Lofi', 25)
  // cl(Sara.lang)
  ////////////////////////////////////////////////////////////

  //! interfaces with Classes

interface Musician {
  stagename: string,
  instrument: string,
  plays(action: string): string
}

class GuitarMan implements Musician {
  stagename: string;
  instrument: string;
  constructor(stagename: string, instrument: string) {
    this.stagename = stagename;
    this.instrument = instrument;
  }

  plays(action: string) {
    return `${this.stagename} ${action} the ${this.instrument}`
  }
}

const Page = new GuitarMan('Jimmy', 'guitar')
// TODO cl(Page.plays('strums'))
////////////////////////////////////////////////////////////////////
 
//! Static keyword

class Peeps {
  static count: number = 0

  static getCount(): number {
    return Peeps.count // "count applies directly to the class itself"
  }

  public id: number

  constructor(public name: string) {
    this.name = name
    this.id = ++Peeps.count
  }
}

const Paul = new Peeps('Paul')
const Paual = new Peeps('Paul')
const Paurl = new Peeps('Paul')
const Pautl = new Peeps('Paul')

// cl(Paul.id) returns 1
// cl(Paual.id) returns 2 
////////////////////////////////////////////////////////////////////////

//! Getters vs Setters

class Bands {
  private dataState: string[]

  constructor() {
    this.dataState = []
  }

  public get data(): string[] {
    return this.dataState
  }

  public set data(value: string[]) {
    if (Array.isArray(value) && value.every(elem => typeof elem === 'string')){
      this.dataState = value
      return
    } else throw new Error('Param isnot an Arr of strings')
  }
}

const myBands = new Bands()
myBands.data = ['Pink Floyd', 'Led Zep']
myBands.data = [...myBands.data, 'Rush']
// TODO cl(myBands.data)

//////////////////////////////////////////////////////////////////////////!


//* Index Signatures & keyof Assertions 

//! Index Signatures

interface TransactionObj {
  [index: string]: number
  Pizza: number,
  Books: number
}

const todaysTransactions: TransactionObj = {
  Pizza: -10,
  Books: -5,
  Job: 50
}
//TODO cl(todaysTransactions.Pizza)
let prop: string = 'Pizza'
//TODO cl(todaysTransactions[prop]) //same as before!

///////////////////////////////////////////////////////////////

//! keyof Assertions

interface Student {
  //[key: string]: string | number | number[] | undefined
  name: string;
  GPA: number;
  classes?: number[];
}

const student: Student = {
  name: 'Jimmy',
  GPA: 3.4,
  classes: [100, 200]
}


for (const key in student) {
  // cl(`${key}: ${student[key as keyof Student]}`)
}

Object.keys(student).map(key => {
  // cl(student[key as keyof typeof student])
})

const logStudentKey = (student: Student, key: keyof Student): void => {
  cl(`Student ${key}: ${student[key]}`)
}

logStudentKey(student, 'name')


///////////////////////////////////////////////////////////////

// interface Incomes {
//   [key: string]: number
// }

type Streams = 'salary' | 'bonus' | 'sidehustle'

type Incomes = Record<Streams, number>

const monthlyIncomes: Incomes = {
  salary: 500,
  bonus: 100,
  sidehustle: 250
}

for (const revenue in monthlyIncomes) {
  cl(monthlyIncomes[revenue as keyof Incomes])
}





  return (
    <div className="App">
      {/* <Heading title={"Hello there"}/>
      <Section>This is the section</Section>
      <Counter setCount={setCount}>Count is {count}</Counter>
      <List items={['one', 'two', 'three']} render={(item: string) => <span style={{color: 'gold'}}>{item}</span>}></List> */}
    </div>
  );
}

export default App;
