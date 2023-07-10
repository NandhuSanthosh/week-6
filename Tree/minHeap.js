class Node{
    constructor(){
        this.val   =  val 
        this.left  =  null;
        this.right =  null;
    }
}

class MinHeap{
    constructor(arr){
        this.size = 0;

        this.heapArr =[ 0, ...arr];
        this.size = arr.length;

        this.buildHeap()
    }

    // this function is used when we create a heap from a array
    buildHeap(){
        // we start by slowly making heap from the end of the array
        // we don't have to make the last level heap because they are already heap 
        // because in last level every subtree contain only one element, so that is heap
        for(let i = this.size/2 ; i>0; i--){
            // this function makes the subree with root at index i a heap
            this.heapify(i)
        }
    }

    // this function converts a tree in to heap if subtress of the tree are already heap
    heapify(i){
        // finding left and right child
        let leftChild = i*2
        let rightChild = i*2 + 1

        // initial value of largest is i
        let smallest = i;


        // finding the smallest among the root, leftchild, and right child
        // check whether the root is less than the leftChild or not
        if(leftChild <= this.size && this.heapArr[i] > this.heapArr[leftChild]){
            smallest = leftChild;
        }
        // checks whether the smallest among the leftChild and root is smallest than right child or not
        if(rightChild <= this.size && this.heapArr[smallest] > this.heapArr[rightChild]){
            smallest = rightChild;
        }

        // if the smalles is the root then we don't have to do anything because the left subtree is heap
        // and the right subtree is heap, and if the smallest is root then the whole tree is heap
        // if the smallest is not the root
        if(smallest != i){
            // swap root with the smallest among the leftchild and rightchild
            [this.heapArr[smallest], this.heapArr[i]] = [this.heapArr[i], this.heapArr[smallest]]
            // calling on the smallest among leftchild and rightchld
            // we just swapped the root of the tree so we have to make it heap if it is changed 
            this.heapify(smallest)
        }
    }

    insert(val){
        this.size++;
        this.heapArr.push(val)

        let i = this.size;
        while(i > 1){
            let parentNode = Math.floor(i/ 2)
            if(this.heapArr[i] < this.heapArr[parentNode]){
                this.swap(this.heapArr, parentNode, i)
            }
            else{
                break;
            }
            i = parentNode
        }
    }

    delete(pos = 1){
        if(pos > this.size || pos < 1) return;

        let deletedElement = this.heapArr[1];
        this.heapArr[pos] = this.heapArr[this.size]
        this.size--;


        let i = pos;
        while(i <= this.size){
            let leftChild = i * 2
            let rightChild = i * 2 + 1

            let swapIn = i;
            if(rightChild <= this.size){
                swapIn = this.minElementIndex(i, this.minElementIndex(leftChild, rightChild))
            }
            else if(leftChild <= this.size){
                swapIn = this.minElementIndex(i, leftChild)
            }

            if(swapIn == i) break;
            this.swap(this.heapArr, i, swapIn)
            i = swapIn;
        }

        return deletedElement;
    }

    display(){
        let output = [];
        for(let i = 1; i<=this.size; i++){
            output.push(this.heapArr[i])
        }
        console.log(output)
    }

    swap(arr, i, j){
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }

    minElementIndex(i, j, arr = this.heapArr){
        return arr[i] < arr[j] ? i : j;
    }
}

function heapSort(arr){
    let l = new MinHeap(arr)
    arr = helper(arr)
    function helper(arr){
        let output = [];
        for(let i = 0; i<arr.length; i++){
            output.push(l.delete())
        }
        return output
    }
    return arr;
}
 
let arr = [10, 9, 8, 7, 6, 5, 4, 3, 2 ,1]
arr = heapSort(arr)
console.log(arr)




