class Graph{
    constructor(){
        this.adjacencyList = {};
    }

    addVertix(vertix){
        if(!this.adjacencyList[vertix]) this.adjacencyList[vertix] = [];
    }

    addEdge(vertix1, vertix2){
        if(!this.adjacencyList[vertix1] || !this.adjacencyList[vertix2]) return;
        if(!this.adjacencyList[vertix1].includes(vertix2)){
            this.adjacencyList[vertix1].push(vertix2)
            this.adjacencyList[vertix2].push(vertix1)
        }
    }

    removeEdge(vertix1, vertix2){
        if(!this.adjacencyList[vertix1] || !this.adjacencyList[vertix2]) return;
        this.adjacencyList[vertix1] = removeFromArray(this.adjacencyList[vertix1], vertix2)
        this.adjacencyList[vertix2] = removeFromArray(this.adjacencyList[vertix2], vertix1)


        function removeFromArray(arr, vertix){
            return arr.filter( x => {
                if(x != vertix) return true
                return false;
            })
        }
    }

    removeVertix(vertix){
        // checking whether it is a valid vertex or not
        if(!this.adjacencyList[vertix]) return;

        // removing the edge form all the adjacent vertices of the vertex
        this.adjacencyList[vertix].forEach( x=> {
            // we are using this method to remove the edge
            this.removeEdge(x, vertix)
        })

        // after removing all the edges we are delete the edge
        delete this.adjacencyList[vertix]
    }

    // curr is the key value of the curr vertex and  visited is a object which constains
    // all the visited keys
    dfs(curr, visited = {}){
        // recursive implementation of dfs
        // base case
        // if curr is already visited, then return
        if(visited[curr]) return;
            
        // printing the curr val
        console.log(curr)
        // update visited
        visited[curr] = 1;


        // recursive call
        // iterate throught the adjacency list of the curr node
        this.adjacencyList[curr].forEach( x => {
            // call every adjacent vertex
            this.dfs(x, visited)
        })
    }

    dfs2(vertix){
        // iterative implementation of dfs
        // if there is no such vertex then return
        if(!this.adjacencyList[vertix]) return 

        // object used to store visited vertices
        let visited = {}; 
        // array acting as a stack 
        let arr = [vertix]; 
        while(arr.length){
            // popping the last element
            let curr = arr.pop();
            // if the element is visited skipping the rest of the steps
            if(visited[curr]) continue;
            // marking the vertex as visited
            visited[curr] = true
            // displaying the vertex
            console.log(curr);
            // adding adjacent vertices to the array
            for(let x of this.adjacencyList[curr]){
                arr.push(x);
            }
        }
        
    }

    bfs(curr){

        if(!this.adjacencyList[curr]) return;
        let queue = [curr]
        let visited = { [curr] : true};
        let output = [];

        let  helper=()=>{
            // base case
            // if the queue is empty return;
            if(queue.length == 0) return;

            // operation
            // removing curr element form the queue
            let curr = queue.shift();
            // add curr element to the output array
            output.push(curr)
            // iterating to the adjacent nodes and adding it to the array if it is not visited
            for(let x of this.adjacencyList[curr]){
                if(!visited[x]){
                    queue.push(x);
                    // adding the new array to the visited object
                    visited[x] = true;
                } 
            }
            console.log(queue)
            // recursive call
            helper();
        }
        helper();
        console.log(output);
    }

    shortestPath(vertex1, vertex2){
        if(!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) return;

        let queue = [vertex1];
        let visited = {}
        let output = 0;
        let isPath = 0;
        while(queue.length){
            // update visited
            console.log(queue)
            let curr = queue.shift()
            // base case
            if(curr == vertex2) {
                isPath = 1
                break;
            }
            visited[curr] = true;
            // increment output
            output++;

            for(let x of this.adjacencyList[curr]){
                if(!visited[x]){
                    queue.push(x)
                    visited[x] = true
                }
            }
            // add unvisited adjecent vertex to queue
            // pop curr vertex
        }
        if(isPath) return output
    }
    
    shortestPath2(vertex1, vertex2){
        
        let output = 0;
        let visited = [vertex1]
        let helper = (queue)=>{
            // base case
            if(!queue.length) {
                return 0;
            }
            // operation
            output++;
            let newQueue = [];
            while(queue.length){
                let curr = queue.shift();
                for(let x of this.adjacencyList[curr]){
                    if(x == vertex2) return output;
                    if(!visited[x]){
                        visited[x] = true;
                        newQueue.push(x);
                    }
                }
            }

            // recursive call
            return helper(newQueue);
        }
        
        let queue = [vertex1]
        return helper(queue);
    }
}

let l = new Graph();
l.addVertix("A")
l.addVertix("B")
l.addVertix("C")
l.addVertix("D")
l.addVertix("E")
l.addVertix("F")
l.addVertix("G")

l.addEdge("A", "B")
l.addEdge("B", "C")
l.addEdge("C", "D")
l.addEdge("D", "E")
l.addEdge("E", "F")
l.addEdge("B", "F")
l.addEdge("D", "F")
l.addEdge("G", "F")
l.addEdge("G", "A")

// l.bfs("A")
console.log(l.shortestPath2("F", "C"))

