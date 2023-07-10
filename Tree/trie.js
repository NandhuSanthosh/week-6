
// this is the trie node
class TrieNode{
    constructor(val){
        this.val = val
        // trie node contains a object containts the address of child nodes
        this.children = {}
        // this specifies whether a word ends here or not
        this.wordEnds = false;
    }
}

class Trie{
    constructor(){
        this.root = new TrieNode('');
    }

    insert(str){
        // inserting str to the trie

        // initially we start from the root
        let curr = this.root;

        // we have to iterate throught the string and add node if it is not present
        for(let i = 0; i<str.length; i++){
            let char = str[i]
            // if there is not childnode for the char
            // then we create one and adds it to the children object
            if(!curr.children[char]){
                curr.children[char] = new TrieNode(char)
            }
            // for the next iteration we have to check the node which represents char(str[i])
            curr = curr.children[char];
        }
        // after the loop is executed the current would be the last character of the word
        // marking that a words ends here
        curr.wordEnds = true;
    }

    search(str){
        // we start form the root
        let curr = this.root;

        // iterate through the string
        for(let i = 0; i<str.length; i++){
            let char = str[i]
            //if there is not such node return false
            if(!curr.children[char]){
                return false;
            }
            // updating curr
            curr = curr.children[char];
        }
        // if the a word ends in the last place then return true, else false
        return curr.wordEnds ? true : false;
    }

    // recursive function to remove a string from the trie
    remove(str, i = 0, curr = this.root){
        // base case
        // that is string reaches
        if(str.length == i){
            // if there curr has children then return curr
            // we return node if we want to preseve it
            // if we don't want to store a node we just return undefined
            if(Object.keys(curr.children).length){
                curr.wordEnds = false;
                return curr;
            }
            else{
                console.log("here")
                return
            }
        }

        if(!curr.children[str[i]]) {
            return curr;
        }
        // call remove(i + 1, updated curr)
        curr.children[str[i]] = this.remove(str, i+1, curr.children[str[i]])
        if(curr.children[str[i]] || curr.wordEnds){
            return curr;
        }
        return;
            // if it is false 
                // check whether any word ends here 
                    // if then return curr
                    // else return undefined
            // return curr

        
    }

    // printing every elements in trie
    printEvery(curr = this.root, output = ''){
        // operation
        // adding the val of the current element to the output string
        output += curr.val
        // if a word ends here print the output
        if(curr.wordEnds) console.log(output)
        
        
        // base case
        // find the keys in the curr.children
        let validKeys = Object.keys(curr.children)
        // if it is equal to 0 return
        if(validKeys.length == 0) return;

        // recursive call
        // call the function for every children
        for(let x of validKeys){
            this.printEvery(curr.children[x], output)
        }
    }
}

let m = new Trie()
m.insert('nandhu')
m.insert('rahul')
m.insert('someone else')
// console.log(m.search("hehe"))

m.printEvery()