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

## React with types ( Exercises 9.14 - 9.19 )

For React elements/components, it shoudl be typed as ```JSX.element```. Props can be typed in an interface or deconstructed and individually typed. Event handling, like for handleClicks, can be typed with ```React.SyntheticEvent```. The ```!``` symbol asserts to TypeScript that a variable will never be null, functioning similarly to as for type assertion.

When dealing with multiple objects sharing similar keys/properties, extend can customize the base type to fit respective interfaces. Each interface requires a consistent identifier, such as ```kind:...```, similarly for the data. Deep typing allows further narrowing with ```switch (part.kind) ... case "<kind>" ``` for specific code suggestions based on the kind.

For ```useState()```, typing is achieved by asserting with ```<type>```. The same applies to ```axios.get``` or other ```axios``` commands.

Defining a type or interface is interchangeable. The distinction lies in uniqueness; a type must be unique, whereas interfaces with the same name are merged.

For exercises 9.14 - 9.15, a simple course description app was done.It can be found in the branch [```typing_React```](https://github.com/xhello00o/fullstackopenpart9/tree/typing_React).In this section for exercises 9.16 - 9.19, a flight diary app was made. The template for the backend was provided [here](https://github.com/fullstack-hy2020/flight-diary). The frontend of this flight diary was built on top of the fork from the backend. It can be found in the branch [```flight_diary_FrontEnd```](https://github.com/xhello00o/fullstackopenpart9/tree/flight_diary_FrontEnd)

```typescript
interface WelcomeProps {
  name: string;
}
const Welcome = (props: WelcomeProps): JSX.Element => {
  return <h1>Hello, {props.name}</h1>;
};
// Or do it like this
const Welcome = ({ name }: { name: string }): JSX.Element => (
  <h1>Hello, {name}</h1>

const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const noteToAdd = {
      content: newNote,
      id: notes.length + 1
    }
    setNotes(notes.concat(noteToAdd));
    setNewNote('')
  };
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Welcome name="Sarah" />
)
```
```typescript
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: "basic"
}
interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}
interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: "background"
}
type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;
```
```typescript
const [notes, setNotes] = useState<Note[]>([]);

export const getAllNotes = () => {
  return axios
    .get<Note[]>(baseUrl)
    .then(response => response.data)
}
```
