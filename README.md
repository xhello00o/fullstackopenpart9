# fullstackopenpart9
typescript
## Course Content
In this part, we will be using the tools previously introduced to build end-to-end features to an existing ecosystem with linters predefined and an existing codebase writing TypeScript. After doing this part, you should be able to understand, develop and configure projects using TypeScript.

More details can be found [here](https://fullstackopen.com/en/part9)

## First steps with TypeScript ( Exercises 9.1 - 9.7 )
To start install ```ts-node``` and ```typescript```. TypeScript uses types, interfaces, and related constructs to enforce static typing, enhance code clarity, and detect errors early during compilation.
All the modules need be be typed and has to be install from ```@types/<package>```. Eslint config ```.eslintrc```can be configure with these typescript plugin for faster live error checking.
The exercises here creates a very simple typescript bmiCalculator, exerciseCalculator that is able to be activated from tbe command line and a very simple backend with express. They can be found in [```main```](https://github.com/xhello00o/fullstackopenpart9/blob/main)
```typescript
type Operation = 'multiply' | 'add' | 'divide';
interface MultiplyValues {
  value1: number;
  value2: number;
}
```
```typescript
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 11,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {

    "@typescript-eslint/no-explicit-any": 2
  }
}
```
## Typing an Express app ( Exercise 9.8 - 9.13 ) 
This section we are building a backend for a Patientor App. The frontend was already developed and a fork was created to use the frontend. 

Type assertions, indicated by the ```as``` keyword, should ideally be used sparingly, serving as a last resort. It's preferable to rely on TypeScript's type-checking capabilities rather than explicitly specifying types. Adding a ```?``` to a field designates it as optional, providing flexibility in type definitions.

To seamlessly incorporate JSON files into TypeScript, we can utilize ```"resolveJsonModule": true``` in the ```tsconfig.json```. However, potential issues may arise, making it advisable to opt for ```.ts``` files instead of .JSON/.JS for a more robust solution.

For excluding specific types, the ```Pick``` or ```Omit``` utility types can be employed. It's essential to note that TypeScript primarily verifies the presence of required fields, not the absence of undesired types. Consequently, thorough checks are necessary to handle potential undefined entries.

An alternative to using ```any``` is setting types to ```unknown```, promoting better type safety. Type guards, such as ```isString(var)```, prove useful for narrowing down types. There are other guards that leverage the ```in``` operator to ensure the presence of all required fields for objects.

In the realm of types, ```enums``` offer a structured approach, creating objects containing various types. This 'enum' object serves as a singular source of truth for both types and existence, enhancing code clarity and maintainability. The ```Objects.value(<enum>)``` function facilitates easy access to enum values to check for existence.

the exercises can be found in the [```backendpatientor```](https://github.com/xhello00o/fullstackopenpart9/blob/backendpatientor) branch.

```typescript
const diaries: DiaryEntry[] = diaryData;

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const diaries: DiaryEntry[] = diaryData as DiaryEntry[];
export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}
```
```typescript
const getNonSensitiveEntries =
  (): Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>[] => {
    // ...
  }

const getNonSensitiveEntries = (): Omit<DiaryEntry, 'comment'>[] => {
  // ...
}
```
```typescript
const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  const newEntry: NewDiaryEntry = {
    // ...
  }

  return newEntry;
}

const isString = (text: unknown): text is string => {

 return typeof text === 'string' || text instanceof String;
}

if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object)  {
    const newEntry: NewDiaryEntry = {
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility),
      date: parseDate(object.date),
      comment: parseComment(object.comment)
    };
```
```typescript
export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
//...
}

```

