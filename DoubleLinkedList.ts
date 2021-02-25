export class Node{
    private _value: number
    private _next: Node
    private _pre: Node

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
        this.Value=input as number||(input as Node).Value||undefined;
        this.Next=(input as Node).Next||undefined||null;
        this.Pre=(input as Node).Pre||undefined||null;
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

    constructor(){
        this._length=0;
    }

    Add(value: number){
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
}


let myList = new DoubleLinkedList();

myList.Add(1);
myList.Add(5);
myList.Add(3);
myList.Add(50);

console.log(myList);
//if (myList.Length==0) console.log(0); else console.log(myList.Length);