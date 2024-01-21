
export const Card = ({ children }) => {
    console.log("Start loading card")
    let { name, summary } ={ name: "Epcot Center", summary: "Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events." };
    console.log("Card is loaded")
    return <div>
         <details>
            <summary>{ name }</summary>
            <p>{ summary }</p>
        </details>
        { children }
    </div>
}