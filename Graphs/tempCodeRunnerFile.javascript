
class something{
    outer(){
        let arr = [1, 2, 3, 4]
        let helper = (queue)=>{
            if( queue.length){
                console.log("wt")
            }
            else{
                console.log(queue.length)
            }
        }
        helper(arr)
    }

}

let s = new something();
s.outer()