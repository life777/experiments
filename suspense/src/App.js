import { List } from "./List";
import { MyList } from "./MyList";
import { Card } from "./Card";
import { AnotherList } from "./AnotherList";
import './App.css';
import { Suspense, useDeferredValue, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  const [changablePrefix, setChangablePrefix] = useState("");
  const prevPrefix = useDeferredValue(changablePrefix);
  const isLoading = prevPrefix !== changablePrefix;

  console.log(Date.now());
  console.log(prevPrefix, changablePrefix);

  return (
    <div className="App">
        <h1>Some lists</h1>
        <div>
            <h2>List of As</h2>
            <Suspense fallback={<span>⌛loading As...</span>}>
                <List prefix="A" />
            </Suspense>
        </div>
        <div>
            <h2>List of As</h2>
            <input value={changablePrefix} onChange={e => setChangablePrefix(e.target.value)} />
            <Suspense fallback={<span>⌛loading custom prefix...</span>}>
                <div style={{ opacity: isLoading ? 0.5 : 1 }}>
                    <List prefix={prevPrefix} />
                </div>
            </Suspense>
        </div>
        <div>
            <h2>List of Bs</h2>
            <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
                <Suspense fallback={"LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOADING........."}>
                    <Card>
                        <Suspense fallback={<span>⌛loading Bs...</span>}>
                            <List prefix="B" />
                        </Suspense>
                    </Card>
                </Suspense>
            </ErrorBoundary>
        </div>
        <div>
          <h2>Another list</h2>
            <AnotherList />
        </div>

        <div>
          <Suspense fallback="Waiting for my list">
              <MyList prefix="MY" />
          </Suspense>

        </div>
    </div>
  );
}

export default App;
