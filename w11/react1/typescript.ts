// 1. 타입 주석과 타입 추론
// 타입 주석 : 변수, 상수 혹은 반환값이 무슨 타입인지를 나타냄
// 타입 추론 : 해당 변수가 어떤 타입인지 추론. 생략하면 컴파일 타임에 추론.

let a: number = 1;
let b = 2;
let c: boolean = false;
let d: string = "TypeScript";
let f = { a: 1 };
let h: number[] = []; // 선언한 타입만 배열로 다룸
let g: any = 1; // 어떤 타입이든 가능, 남용주의

function add(a: number, b: number): number {
  return a + b;
}
console.log(add(1, "3"));

// 2. 인터페이스 : 미리 객체의 타입을 정의하는 방법, interface

interface Company {
  name: string;
  age: number;
  address?: string; // ? : 옵셔널
}

const cobalt: Company = {
  name: "Cobalt",
  age: 3,
  address: "Seoul",
};

// 익명 인터페이스
const person: {
  name: string;
  age?: number;
} = {
  name: "Tom",
};

// 3. tuple : 배열을 Tuple로 이용

const tuple: [string, number] = ["Tom", 20];

// 4. enum : 열거형

enum Color {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
}

const blue = Color.BLUE;

// 5. 대수 타입 : 여러자료형의 값을 가질 수 있음. 합집합 타입 & 교집합 타입

// 합집합 타입
let numOrStr: number | string = 1;

// 교집합 타입 : 원시타입에선 사용불가
interface Name {
  name: string;
}
interface Age {
  age: number;
}
let Tom: Name & Age = {
  name: "Tom",
  age: 20,
};
// type : 대수타입처럼 사용가능
type Person = Name & Age;
let Jerry: Person = {
  name: "Jerry",
  age: 8,
};

// 6. Optional :

interface Post {
  title: string;
  content: string;
}

interface ResponseData {
  post?: Post;
  message?: string;
  status: number;
}

const response: ResponseData[] = [
  {
    post: {
      title: "Heloo",
      content: "How R U",
    },
    status: 200,
  },
  {
    message: "ERROR",
    status: 500,
  },
];

console.log(response[1].post && response[1].post.title);
console.log(response[1].post?.title);
// ? : 옵셔널 데이터의 경우 데이터 없어도 오류 뱉지 않음
// ! : 해당 데이터가 무적권 있을때 사용

// 7. Generic : 하나의 인터페이스로 여러 타입을 이용할 수 있게

interface Value<T> {
  value: T;
}
// interface <타입>
const value: Value<string> = {
  value: "1",
};

function toString<T>(a: T): string {
  return `${a}`;
}

console.log(toString<string>("5"));
console.log(toString("5")); // 생략가능, 타입 추론 가능

// 8. Partial, Required, Pick, Omit : 기존 큰 interface 재활용

interface User {
  id: number;
  name: string;
  age: number;
  address: string;
  createdAt?: string;
  updatedAt?: string;
}

// 모든 필드가 옵셔널로
const partial: Partial<User> = {
  name: "TOM",
};

// 모든 필드가 필수로
const required: Required<User> = {
  id: 1,
  name: "TOM",
  age: 0,
  address: "Seoul",
  createdAt: "",
  updatedAt: "",
};

// 특정 필드만 골라서
const pick: Pick<User, "name" | "age"> = {
  name: "TOM",
  age: 30,
};

// 특정 필드만 제외해서
const omit: Omit<User, "id" | "createdAt" | "updatedAt"> = {
  name: "TOM",
  age: 30,
  address: "Seoul",
};

const mixed: Omit<User, "id" | "address" | "age" | "createdAt" | "updatedAt"> &
  Pick<Partial<User>, "address" | "age"> = {
  name: "TOM",
  address: "",
  age: 0,
};

// 9. extends: 특정 인터페이스를 상속받아 확장가능

interface Time {
  hour: number;
  minute: number;
  second: number;
}

interface DateTime extends Time {
  year: number;
  month: number;
  day: number;
}

interface OffsetDateTime extends DateTime {
  offset: number;
}

interface ZonedDateTime extends DateTime {
  zoneId: string;
}

interface TimeFormat extends Pick<Time, "hour" | "minute"> {
  ampm: "am" | "pm";
}

const timeFormat: TimeFormat = {
  hour: 10,
  minute: 30,
  ampm: "am",
};
