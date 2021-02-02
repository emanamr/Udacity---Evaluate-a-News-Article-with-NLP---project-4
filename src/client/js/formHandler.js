// POST request to get meaningCloud Data

const postMeaningCloudInfo = async (url_path = "", data={}) => {
    const response = await fetch(url_path, {
            method: 'POST', 
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
           // Body data type must match "Content-Type" header        
            body: JSON.stringify(data),
        });

    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log("error formHandler", error);
    }
}



function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let inputValue = document.getElementById('name').value
    console.log(Client.isUrlValid(inputValue));
    if (!Client.isUrlValid(inputValue)) {
        alert("Please enter a valid URL");
        return;
    }
    

console.log("::: Form Submitted :::")
  
const evaluate = document.getElementById("evaluate")

    postMeaningCloudInfo(`http://localhost:8081/meaningCloud`, {url: inputValue})
    .then(function(res){
        const entries = Object.entries(res);
        console.log("entries==>", entries);
        document.getElementById("url-id").textContent = inputValue;
        while (evaluate.firstChild) {
            evaluate.firstChild.remove()
        }
        for (const entry of entries){
            const createDiv = document.createElement('div');
            createDiv.setAttribute("class", "auto-url-evaluate");
            createDiv.appendChild(document.createTextNode(`${entry[0]}: ${entry[1]}`))
            document.getElementById('evaluate').appendChild(createDiv);
        }        
    })
}

export { handleSubmit }
