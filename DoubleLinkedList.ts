export class Node{
    private _value: number
    private _next?: Node
    private _pre?: Node

    public get Value(){
        return this._value;
    }

    public set Value (value: number){
        this._value = value;
    }

    public get Next(){
        return this._next;
    }

    public set Next (next: Node){
        this._next = next;
    }
    public get Pre(){
        return this._pre;
    }

    public set Pre (pre: Node){
        this._pre = pre;
    }

    constructor();
    constructor(value?:number);
    constructor(node?:Node);

    constructor(input?: number|Node){
        this.Value=(input as Node)?.Value||input as number;
        this.Next=(input as Node)?.Next||null;
        this.Pre=(input as Node)?.Pre||null;
    }

    toString(callback?) {
        return callback ? callback(this.Value) : `${this.Value}`;
      }
}



export class DoubleLinkedList
{
    private _root? : Node;
    private _tail? : Node;
    private _length;
    [index:number]:Node;

    public get Length():number {
        let i:number = 0;
        if (this._length!=0){
            let tmp = this._root;
            while(tmp!=null){
                tmp = tmp.Next;
                i++;
            }
        }
        else {
            this._length=0;
        }
        return this._length;
    };
    
    public get MaxIndex():number{
        return this._length-1;
    }
    
    constructor();
    constructor(value?:number);
    constructor(arr?: number[]);
    
    constructor(input?:number|number[])
    {
        if((typeof input != typeof new Object())){
            if ((input as number)==undefined){
                this._root=null;
                this._tail=null;
                this._length=0;
            }
            else{
                this.Add(input as number);
            }
        }
        else{
            if ((input as number[]).length!=0){
                for(let i=0; i<(input as number[]).length; i++){
                    this.Add((input as number[])[i]);
                }
            }
        }
    }

    
    Add(value: number){
        if (this._length===undefined || isNaN( this._length)){
            this._length=0;
        }

        if (this._length==0){
            this._root=new Node(value);
            this._tail=this._root;

            this[this._length]=this._root;
            this._length++;
        }
        else{
            let tmp = this._tail;
            this._tail.Next=new Node(value);
            this._tail=this._tail.Next;
            this._tail.Pre=tmp;
            this._length++;
            this[this.MaxIndex]=this._tail;
        }
    }
    toArray() {
        const nodes = [];
      
        let currentNode = this._root;
        while (currentNode) {
          nodes.push(currentNode);
          currentNode = currentNode.Next;
        }
        return nodes;
      }
    toString(callback?) {
        return this.toArray().map(node => node.toString(callback)).toString();
      }
}



let arr = [1, 2, 3, 4];

let myList = new DoubleLinkedList(arr);
myList.Add(0);
myList.Add(100);

console.log(myList[0+2].Next);