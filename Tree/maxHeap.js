class Heap{
    constructor(){
        this.heapArr = [];
        this.heapArr.push(0)
        this.size = 0;
    }

    insert(val){
        this.size++;
        this.heapArr.push(val)

        for(let i = this.size; i>1; ){
            let parent = Math.floor(i / 2)
            if(this.heapArr[parent] < this.heapArr[i])
                [this.heapArr[parent], this.heapArr[i]] = [this.heapArr[i], this.heapArr[parent]]
            else
                break
            i = parent;
        }
    }

    display(){
        let output = [];
        for(let i = 1; i<=this.size; i++){
            output.push(this.heapArr[i])
        }
        console.log(output)
    }

    deletePos(pos){
        if(pos>this.size) return;

        this.heapArr[pos] = this.heapArr[this.size]
        this.size--;
        this.heapArr.pop();

        let i = pos;

        while(true){
            let leftChild = i * 2
            let rightChild = i * 2 + 1



            let swapIndex = 0;
            if(rightChild <= this.size){
                swapIndex = this.heapArr[leftChild] > this.heapArr[rightChild] ? leftChild : rightChild
                swapIndex = this.heapArr[i] > this.heapArr[swapIndex] ? 0 : swapIndex
            }
            else if(leftChild <= this.size){
                swapIndex = this.heapArr[leftChild] > this.heapArr[i] ? leftChild : 0
            }

            if(swapIndex == 0) break;
            [this.heapArr[i], this.heapArr[swapIndex]] = [this.heapArr[swapIndex], this.heapArr[i]]
            i = swapIndex
        }

        
    }
}

let h = new Heap()
h.display();
h.insert(50)
h.insert(30)
h.insert(40)
h.insert(10)
h.insert(5)
h.insert(20)
h.insert(30)
h.insert(60)


h.display() 
h.deletePos(1); // 60 deleted
h.display()
h.deletePos(1); // 50 deleted
h.display()
h.deletePos(1); // 40 deleted
h.display()
h.deletePos(1); // 30 deleted
h.display()
h.deletePos(1); // 30 deleted
h.display()
h.deletePos(1); // 20 deleted
h.display()
h.deletePos(1); // 20 deleted
h.display()
h.deletePos(1); // 20 deleted
h.display()
h.deletePos(1); // 20 deleted
h.display()