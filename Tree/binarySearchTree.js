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
        if(this.first) return this.first
    }

    
    
}

class LinkedList{
    Node = function(value){
        this.value = value
        this.next = null;
    }
    head = null;
    tail = null;
    length = 0;

    push(value){
        this.length++;
        let newNode = new this.Node(value)
        if(!this.head){
            this.head = newNode
        }
        else{
            this.tail.next = newNode
        }
        this.tail = newNode
    }

    unShift(value){
        let newNode = new this.Node(value);

        if(!this.head){
            this.tail = newNode
        }
        newNode.next = this.head;
        this.head = newNode;
        this.length++;
    }

    display(){
        if(!this.head){
            console.log("the liked list is empty")
        }

        function helper(curr){
            if(curr){
                console.log(curr.value)
                helper(curr.next)
            }
        }

        helper(this.head)
    }

    displayOn(){
        if(!this.head){
            console.log("Linked list is empty")
            return;
        }
        let output = ''
        function helper(curr){
            if(!curr) return 
            output += `${curr.value} `;
            helper(curr.next);
        }
        helper(this.head)
        console.log(output)
    }

    pop(){
        if(this.head == null){
            console.log("Linked list is empty");
            return;
        }
        this.length--;

        function helper(curr){
            if(curr.next == null){
                return null;
            }
            curr.next = helper(curr.next);
            return curr;
        }

        this.head = helper(this.head)
    }

    shift(){
        if(!this.head){
            return "LL is empty"
        }
        let output = this.head.value;
        this.length--;
        if(!this.head.next){
            this.tail = null;
        }
        this.head = this.head.next;
        return output;
    }

    get(index){
        if(index >= this.length){
            console.log("out of bounce");
            return;
        }

        function helper(index, curr){
            if(!index) return curr.value;
            return helper(index-1, curr.next);
        }

        return helper(index, this.head);
    }

    set(index, value){
        if(index >= this.length){
            return "list out of bound"
        }
        
        let curr = this.head;
        while(index){
            index--;
            curr = curr.next
        }

        curr.value = value;
    }

    insertInto(index, value){
        if(index <= 0){
            this.unShift(value)
        }
        else if(index == this.length){
            this.push(value)
        }
        else if(index > this.length){
            console.log("out of bound")
            return false;
        }
        else{
            let newNode = new this.Node(value);
            helper(index, this.head)
            this.length++;
        }

        function helper(index, curr){
            if(index){
                curr.next = helper(index-1, curr.next);
                return curr;
            }
            else{
                newNode.next = curr;
                return newNode;
            }
        }
        return true;

    }

    remove(index){
        if(index >=this.length) return false;

        if(index == 0) {
            this.shift();
            return true;
        }

        function helper(index, curr){
            // console.log(index, curr.value)
            if(index){
                curr.next = helper(index-1, curr.next);
                return curr;
            }
            else{
                return curr.next;
            }
        }
        this.length--;
        helper(index, this.head);
    }

    reverse(){

        if(!this.head) return 
        
        var helper = (curr)=>{
            if(!curr.next) {
                this.head = curr;
                return curr;
            }
            helper(curr.next).next = curr;
            curr.next = null;
            return curr;
        }
        this.tail = this.head;
        helper(this.head);
    }

    printReverser(curr){
        if(curr == null) return
        this.printReverser(curr.next)
        console.log(curr.value);
    }

    sort(){
        if(this.length <= 1) return;
        
        let i = this.head;
        while(i.next){
            let j = i.next;
            while(j){
                if(i.value > j.value){
                    let temp = i.value;
                    i.value = j.value;
                    j.value = temp;
                }
                j = j.next;
            }
            i = i.next;
        }
    }


    // this is a problem i found from leetcode 
    // you are given two numbers in the form of linked list in reverse order
    // 342 = 2 -> 4 -> 3
    // 465 = 5 -> 6 -> 4
    // you have to find the sum of the numbers and return it in the form 
    // of  a reversed linked list;
    // 342 + 465 = 807
    // output = 7 -> 0 -> 8
    static addTwoNumbers(l1, l2){

        let rest = 0;
        function helper(a, b){
            // iterate to the end of both the linked list
            if(!a && !b) {
                let first = new LinkedList();
                if(rest !== 0)
                    first.push(rest);
                return first;
            }

            let nodeVal = 0;
            let smallOutput;
            let sum = 0;
            if(!a){
                rest = Math.floor((b.value + rest) / 10);
                smallOutput = helper(a, b.next)
                sum = b.value
                nodeVal = (b.value + rest) % 10;
            }
            else if(!b){
                rest = Math.floor((a.value + rest) / 10)
                smallOutput = helper(a.next, b)
                sum = a.value;
                nodeVal = (a.value + rest) % 10;
            }
            else{
                sum = a.value + b.value;
                nodeVal = (a.value + b.value + rest) % 10 ;
                rest = Math.floor((a.value + b.value + rest) / 10)
                smallOutput = helper(a.next, b.next);
            }

            smallOutput.unShift(nodeVal);
            return smallOutput;
        }

        
        let output = helper(l1.head, l2.head);
        return output;
    }

}

class TreeNode{
    constructor(val){
        this.val = val
        this.right = null;
        this.left = null;
    }
}

class Tree{
    constructor(){
        this.root = null;
    }

    // inserting node into the tree
    insertNode(val, curr = this.root ){
        if(!curr){
            this.root = new TreeNode(val);
            return;
        }
        if(curr.val == val) return 
        if(curr.val > val && curr.left){
            this.insertNode(val, curr.left);
        }
        else if(curr.val > val){
            curr.left = new TreeNode(val)
        }
        else if(curr.right){
            this.insertNode(val, curr.right)
        }
        else{
            curr.right = new TreeNode(val)
        }
    }
    // this inserts the node into the tree and returns the root
    insertNode2(val, curr = this.root){
        if(!curr){
            let newNode = new TreeNode(val)
            if(!this.root) this.root = newNode
            return newNode;
        }


        if(curr.val > val){
            curr.left = this.insertNode2(val, curr.left)
        }
        else if(curr.val < val){
            curr.right = this.insertNode2(val, curr.right)
        }
        return curr;
    }

    // display the tree
    display(curr = this.root){
        if(!curr) return;
        let output = curr.val + " => ";
        if(curr.left) output += curr.left.val + " "
        if(curr.right) output += curr.right.val
        console.log(output)
        this.display(curr.left)
        this.display(curr.right)
    }

    // searching
    find(val, curr = this.root){
        if(curr == null) return false;
        if(curr.val == val) return true;
        if(curr.val > val){
            return this.find(val, curr.left)
        }
        else{
            return this.find(val, curr.right)
        }
    }

    // depth first search
    preOrder(curr = this.root){
        if(curr == null) return "";
        let output = curr.val + " "
        output += this.preOrder(curr.left);
        output += this.preOrder(curr.right)
        return output
    }
    preOrder2(curr = this.root){
        if(!curr) return '';
        let output = curr.val + " ";
        output += this.preOrder2(curr.left)
        output += this.preOrder2(curr.right)
        return output
    }
    postOrder(curr = this.root){
        if(curr == null) return "";
        let output = this.postOrder(curr.left)
        output += this.postOrder(curr.right)
        output+= curr.val + " "
        return output
    }
    inOrder(curr = this.root){
        if(curr == null) return "";
        let output = this.inOrder(curr.left)
        output += curr.val + " ";
        output += this.inOrder(curr.right)
        return output
    }

    // breadth first serach using queue
    bfs(){
        let q = new Queue();
        q.enqueue(this.root)
        let output = '';
        function helper(){
            if(q.length == 0) return;
            let curr = q.peak();
            output += curr.val + " ";
            if(curr.left) q.enqueue(curr.left)
            if(curr.right) q.enqueue(curr.right)
            q.dequeue();
            helper();
        }
        helper();
        console.log(output)

    }

    bfs2(){
        let q = new Queue();
        let output = '';
        q.enqueue(this.root)
        while(q.length > 0){
            let curr = q.peak().value;
            // console.log(curr)
            output += curr.val + ' ' 
            if(curr.left){
                q.enqueue(curr.left)
            }
            if(curr.right){
                q.enqueue(curr.right)
            }
            q.dequeue();
        }
        console.log(output)
        
    }

    // this is a recursive function which deletes a node which has the specified value
    deleteNode(val, curr = this.root){
        if(!curr) return null;
        // if the curr node has to be deleted
        if(curr.val == val){
            // if the left side subtree is null return right subtree
            if(curr.left == null) return curr.right
            // if right subtree is null return left subtree
            if(curr.right == null) return curr.left
            // if there is both left and rigth subtree find a replacement for the curr node and return the replacement node
            // we can't just take a node as replacement, while finding a replacement node we have to maintain the properties of a binary search tree
            // we can choose the largest element in the left subtree or smallest element in the right subtree
            //          7                 consider this tree, if we want to delete 7, we can't replace 7 using 3
            //      3       9             if we do so, the we have to make a lot of changes and that is not recomented
            //    2   4    8  10          the best and easiest thing to do is that use 4 or 8 as the replacement
            // this findLargest function will find the largest element in the left subtree, which is 4 and return it
            let replaceMentNode = this.findLargest(curr.left)
            // now we have to delete the replacedNode from the left subtree
            curr.left = this.deleteNode(replaceMentNode.val, curr.left)
            
            // replacing the curr node with the replacement node
            replaceMentNode.left = curr.left
            replaceMentNode.right = curr.right

            // if curr node == root then we have to update the root
            if(curr == this.root) this.root = replaceMentNode;

            // finally return replacementNode;
            return replaceMentNode;
        }
        // curr.val < val means the value could be in the rigth so we call deleteNode on curr.right
        else if(curr.val < val){
            curr.right = this.deleteNode(val, curr.right)
        }
        // if val is not greater and not equal to the curr.val that means the value might be in the curr.left subtree
        else{
            curr.left = this.deleteNode(val, curr.left)
        }
        // returning curr
        return curr;
    }
    // this function is used in the deleteNode function
    findLargest(curr){
        if(!curr) return;
        let smallLargest = this.findLargest(curr.right)
        if(!smallLargest) return curr;
        return smallLargest
    }

    // this function checks whether the tree is bst or not
    // i implemented the function just for the sake of implementing it
    // we can only create bst using the insert function so this function is always gonna return true
    // but if there is a binary tree which is not bst then it would return false(hopefully)
    isBst(curr = this.root){
        if(!curr) return {isBst : true}

        let status = {isBst: true, largest: curr.val, smallest: curr.val}
        if(curr.left){
            let sL = this.isBst(curr.left)
            if(!sL.isBst || sL.largest > curr.val) return {isBst: false}
            status.smallest = sL.smallest;
        }
        if(curr.right){
            let sR = this.isBst(curr.right)
            if(!sR.isBst || sR.largest < curr.val) return {isBst: false}
            status.largest = sR.largest
        }
        
        return status;
    }

    // convert a bst to a sorted linked list
    // this is very easy you just want to crate a linked list and 
    // add elements by traversing the tree in inorder manner
    createLinkedList(){
        let ll = new LinkedList();

        function helper(curr){
            if(!curr)return;
            helper(curr.left)
            ll.push(curr.val)
            helper(curr.right)
        }
        helper(this.root);
        return ll;
    }

    // find the closest value to a given number
    findClosestValue(val, curr = this.root){
        if(!curr) return null;

        // this will give us the closest value from the left and right subtree
        let closestLeftSubtree = this.findClosestValue(val, curr.left)
        let closestRightSubtree = this.findClosestValue(val, curr.right)

        // find the difference between the traget value and curr.val
        let diff = curr.val > val ? curr.val - val : val - curr.val;
        // first we assume that curr.val is the answer
        let ans = curr.val;

        // if closestLeftSubtree is not null 
        if(closestLeftSubtree){
            // finding the difference between closestLeftSubtree and target
            let leftDiff = closestLeftSubtree > val ? closestLeftSubtree - val : val - closestLeftSubtree;
            // if closestLeftSubtree is closer to target reassigning the ans variable
            ans = diff > leftDiff ? closestLeftSubtree : ans;
        }
        // if closestRightSubtree is not null
        if(closestRightSubtree){
            // finding the difference between closestRightSubtree and target
            let rightDiff = closestRightSubtree > val ? closestRightSubtree - val : val - closestRightSubtree;
            // if closestRightSubtree is closer to target reassigning the ans variable
            ans = diff > rightDiff ? closestRightSubtree : ans;
        }

        // returning the answer
        return ans;
    }

    // find the depth from a node 
    // by depth i mean the length from the node to the leaf
    // if no node is specified while calling this will find the depth of the root by default
    depth(curr = this.root){
        // if curr == null then return 0 , there is no depth
        if(!curr) return 0;

        // else find the depth of the left subtree and right subtree, and find the max of it
        // return the max(depth of the left subtree and right tree) + 1
        let ans = Math.max(this.depth(curr.left), this.depth(curr.right))
        return ans+1;
    }

    // checking whether a tree is height blanced or not
    isBalanced(curr = this.root){
        if(!curr) return 0;

        let leftStatus = this.isBalanced(curr.left)
        let rightStatus = this.isBalanced(curr.right)
        // console.log(leftStatus, rightStatus, curr.val)

        if(leftStatus === false || rightStatus === false) return false;
        let diff = leftStatus - rightStatus;
        if(diff >= 2 || diff <= -2) return false;

        return curr === this.root ? true : Math.max(leftStatus, rightStatus) + 1;
    }

    //  
}



let t = new Tree();
t.insertNode(4)
t.insertNode(2)
t.insertNode(1)
t.insertNode(3)
t.insertNode(6)
t.insertNode(5)
t.insertNode(7)
t.insertNode(10)
t.insertNode(12)

// t.bfs()
// t.deleteNode(4)
// t.display()

// console.log(t.find(1))
// console.log(t.preOrder())
// console.log(t.postOrder())
// console.log(t.inOrder())
// t.bfs()
// t.display()
// console.log(t.isBst())

// let ll = t.createLinkedList()
// ll.displayOn()

// console.log(t.findClosestValue(100))
console.log(t.isBalanced())

t.bfs2();
