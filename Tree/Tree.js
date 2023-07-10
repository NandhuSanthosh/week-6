class Node{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class Queue{
    constructor(){
        this.first = null;
        this.last = null;
        this.length = 0;
    }

    enqueue(value){
        let newNode = new Node(value);

        if(!this.first){
            this.first = newNode;
        }
        else{
            this.last.next = newNode;
        }
        this.last = newNode;

        this.length++;
        return this.length;
    }

    dequeue(){
        if(!this.first) return null;
        let curr = this.first;
        this.first = this.first.next;
        curr.next = null;

        this.length--;
        return curr;
    }

    display(){
        let output = '';
        function helper(curr){
            if(!curr) return;
            output += curr.value + " ";
            helper(curr.next)
        }

        helper(this.first)
        console.log("This is the output" , output)
    }

    peak(){
        if(this.first) return this.first.value
    }

    
}



class TreeNode{
    constructor(val){
        this.val = val
        this.children = []
    }
}


class Tree{
    constructor(){
        this.root = null;
    }
    
    takeInput(arr){
        // we can create a tree using a array
        // the format of the array would be 
            // the first element is the value of root
            // next is the number of child nodes of root, say n
            // next n values would be values of child node of the root
    
        // eg: if the array is [1, 2, 2, 3]
                // array[0] = 1 contains the value of the root
                // array[1] = 2 is the number of child node root have
                // array[3, 4] = are the child nodes of the root
        if(arr.length == 0) return

        // first we create the root and push it to the queue
        this.root = new TreeNode(arr[0]);
        let q = new Queue();
        q.enqueue(this.root);

        // this function recursively populate the tree
        // index of the function is the number of child the first element of queue have
        function helper(index){
            // if no element in the queue return;
            if(q.length == 0) return;

            // we iterate throught the array and create the child node
            // then we connect it with the first element in the queue
            // then we add the element in the queue
            for(let i = index+1; i<= arr[index] + index; i++){
                let newNode = new TreeNode(arr[i])
                q.peak().children.push(newNode)
                q.enqueue(newNode);
            }

            // now the first element in the queue is populated so we delete it from the queue
            q.dequeue();

            // call the function to populate the next node;
            helper(arr[index] + index + 1)
        }

        // we give 1 as arrugumet because the parameter of the function is the index of array which contains the
        // number of child nodes of the first element in the queue
        // in this case the first element in the queue is the root
        // and the number of children of root is in the first node
        helper(1)
    }

    display(){
        // this display function displays the tree using queue
        // if you have any doubt with the implementation of this function refer the the takeInput(), 
        // I put appropriate comments in the takeInput() which has a similar approach

        let q = new Queue();
        q.enqueue(this.root)
        function helper(curr = q.peak()){
            if(!curr) return;
            let output = curr.val + " => ";
            for(let x of curr.children){
                q.enqueue(x)
                output += x.val + " ";
            }
            console.log(output)
            q.dequeue();
            for(let x of curr.children){
                helper()
            }
        }

        helper()
    }



}

let arr = [1, 2, 2, 3, 3, 4, 5, 6, 2, 7, 8]
let m = new Tree();
m.takeInput(arr)
m.display()