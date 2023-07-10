class AVLTreeNode{
    constructor(val){
        this.val = val;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree{
    constructor(){
        this.root = null;
    }

    // to find the height of a specified node
    height(node){
        if(!node) return 0;
        return node.height
    }

    // returns the getBalanceFactor of the node
    getBalanceFactor(node){
        if(!node) return 0
        return this.height(node.left) - this.height(node.right)
    }

    insert(val){
        let helper = (curr)=>{
            if(!curr) return new AVLTreeNode(val)

            if(val < curr.val){
                curr.left = helper(curr.left)
            }
            else if(val > curr.val){
                curr.right = helper(curr.right)
            }
            else return curr;
            
            // updating the height
            curr.height = Math.max( this.height(curr.left), this.height(curr.right)) + 1
           
            // finding the balance factor of the curr node
            let bf = this.getBalanceFactor(curr)
            // console.log(curr.val, curr.height, this.height(curr.left), this.height(curr.right),bf)

            // bf > 1 means the left side has more height, val < curr.left.val means this is a LL case
            if(bf > 1 && val < curr.left.val){
                curr = this.rightShift(curr)
            }
            // bf < -1 means the right side has more height, val > curr.right.val means this is a RR case
            else if(bf < -1 && val > curr.right.val){
                curr = this.leftShift(curr)
            }
            // bf > 1 means the left side has more height, val < curr.left.val means that this is a LR case
            else if( bf > 1 && val > curr.left.val){
                // this is LR case so we have to first perform a leftShift based on the curr.left
                curr.left = this.leftShift(curr.left)
                // then perform a rightshift on curr node
                curr = this.rightShift(curr)
            }
            // bf < -1 means right has more keys, val < curr.right.val means it is a RL case
            else if( bf < -1 && val < curr.right.val){
                // this RL case so first perform rightShift curr.right
                curr.right =  this.rightShift(curr.right)
                // then leftShift on curr
                curr = this.leftShift(curr)
            }

            // return curr;
            return curr;
        }

        this.root = helper(this.root)
    }


    // makes a left shift and return the new top
    // you have to assign it properly
    leftShift(node){
        let newHead = node.right
        node.right = newHead.left
        newHead.left = node 
        
        // update height
        node.height = Math.min( this.height(node.left), this.height(node.right))  + 1
        newHead.height = Math.min( this.height(newHead.left), this.height(newHead.right)) + 1
        return newHead;
    }

    // makes a right shift and return the new top
    // you have to assign it properly
    rightShift(node){
        let newHead = node.left
        node.left = newHead.right
        newHead.right = node

        // update height
        node.height = Math.min( this.height(node.left), this.height(node.right))  + 1
        newHead.height = Math.min( this.height(newHead.left), this.height(newHead.right)) + 1
        return newHead;
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
}

let s = new AVLTree();

s.insert(10)
s.insert(20)
s.insert(30)
s.insert(40)
s.insert(50)
// s.insert(60)

s.display() 
console.log(s.isBalanced())
