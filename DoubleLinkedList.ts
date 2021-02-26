export class Node {
    private _value: number
    private _next?: Node
    private _pre?: Node

    public get Value() {
        return this._value;
    }

    public set Value(value: number) {
        this._value = value;
    }

    public get Next() {
        return this._next;
    }

    public set Next(next: Node) {
        this._next = next;
    }
    public get Pre() {
        return this._pre;
    }

    public set Pre(pre: Node) {
        this._pre = pre;
    }

    constructor();
    constructor(value?: number);
    constructor(node?: Node);

    constructor(input?: number | Node) {
        this.Value = (input as Node)?.Value || input as number;
        this.Next = (input as Node)?.Next || null;
        this.Pre = (input as Node)?.Pre || null;
    }

    toString(callback?) {
        return callback ? callback(this.Value) : `${this.Value}`;
    }
}



export class DoubleLinkedList {
    private _root?: Node;
    private _tail?: Node;
    private _length;
    [index: number]: Node;

    public get Length(): number {
        let i: number = 0;
        if (this._length != 0) {
            let tmp = this._root;
            while (tmp != null) {
                tmp = tmp.Next;
                i++;
            }
        }
        else {
            this._length = 0;
        }
        return this._length;
    };

    public get MaxIndex(): number {
        return this._length - 1;
    }

    constructor();
    constructor(value?: number);
    constructor(arr?: number[]);

    constructor(input?: number | number[]) {
        if ((typeof input != typeof new Object())) {
            if ((input as number) == undefined) {
                this._root = null;
                this._tail = null;
                this._length = 0;
            }
            else {
                this.Add(input as number);
            }
        }
        else {
            if ((input as number[]).length != 0) {
                for (let i = 0; i < (input as number[]).length; i++) {
                    this.Add((input as number[])[i]);
                }
            }
            else {
                this._root = null;
                this._tail = null;
                this._length = 0;
            }
        }
    }

    private CreateFirstNode(value: number) {
        if (this._length === undefined || isNaN(this._length)) {
            this._length = 0;
        }

        if (this._length == 0) {
            this._root = new Node(value);
            this._tail = this._root;
            this[this._length] = this._root;
            this._length++;
            return null;
        }
        return value;
    }

    Add(value: number) {         //можно сделать по состоянию
        value = this.CreateFirstNode(value);

        if (value != null) {
            let tmp = this._tail;
            this._tail.Next = new Node(value);
            this._tail = this._tail.Next;
            this._tail.Pre = tmp;
            this._length++;
            this[this.MaxIndex] = this._tail;
        }
    }

    Unshift(value: number) {
        value = this.CreateFirstNode(value);

        if (value != null) {
            let tmp = this._root;
            this._root = new Node(value);
            this._root.Next = tmp;
            tmp.Pre = this._root;
            this._length++;

            this.ActualizeIndexes();
        }
    }
    private ActualizeIndexes() {
        let tmp = this._root;
        let i = 0;
        while (tmp != null) {
            this[i] = tmp;
            i++;
            tmp = tmp.Next;
        }
    }

    AddByIndex(index: number, value: number) {
        if (index <= this._length) {
            if (index < this._length / 2) {
                let tmp = this._root;
                for (let i = 1; i < index; i++) {
                    tmp = tmp.Next
                }
                let tmp2 = tmp.Next;
                tmp.Next = new Node(value);
                tmp.Next.Next = tmp2;
                tmp.Next.Next.Pre = tmp.Next;
                tmp.Next.Pre = tmp;
                this._length++;
            }
            else if (index != this._length) {
                let tmp = this._tail;
                for (let i = this._length - 2; i >= index; i--) {
                    tmp = tmp.Pre
                }
                let tmp2 = tmp.Pre;
                tmp.Pre = new Node(value);
                tmp.Pre.Pre = tmp2;
                tmp.Pre.Pre.Next = tmp.Pre;
                tmp.Pre.Next = tmp;
                this._length++;
            }
            else {
                this.Add(value);
                return this;
            }
            this.ActualizeIndexes();
        }
        return this;
    }

    DeleteLast() {
        if (this._length != 0) {
            if (this._length == 1) {
                this._tail = null;
                this._root = this._tail;
                delete this[this.MaxIndex];
                this._length--;
                return this;
            }
            this._tail = this._tail.Pre;
            this._tail.Next = null;
            delete this[this.MaxIndex];
            this._length--;
        }
        return this;
    }

    DeleteFirst() {
        if (this._length != 0) {
            if (this._length == 1) {
                this._root = null;
                this._tail = this._root;
                delete this[this.MaxIndex];
                this._length--;
                this.ActualizeIndexes();
                return this;
            }
            this._root = this._root.Next;
            this._root.Pre = null;
            delete this[this.MaxIndex];
            this._length--;
            this.ActualizeIndexes();
        }
        return this;
    }
    DeleteByIndex(index: number) {
        if (this._length != 0 && index <= this.MaxIndex) {
            if (index == 0) this.DeleteFirst();
            else if (index == this.MaxIndex) this.DeleteLast();
            else {
                if (index <= this._length / 2 + 1) {
                    let tmp = this._root;
                    for (let i = 1; i < index; i++) {
                        tmp = tmp.Next;
                    }
                    tmp.Next = tmp.Next.Next;
                    tmp.Next.Pre = tmp;


                    delete this[this.MaxIndex];
                    this._length--;
                    this.ActualizeIndexes();
                    return this;
                }
                else {
                    let tmp = this._tail;
                    for (let i = this.MaxIndex - 1; i >= index; i--) {
                        tmp = tmp.Pre;
                    }
                    tmp.Pre = tmp.Pre.Pre;
                    tmp.Pre.Next = tmp;
                }
                delete this[this.MaxIndex];
                this._length--;
                this.ActualizeIndexes();
            }
            return this;
        }
        else return this;
    }

    GetIndexByValue(value: number): number {
        let index = -1;
        if (this._length == 0) {
            return index;
        }
        if (this._root.Value == value && this._length == 1) {
            return index = 0;
        }
        let tmp = this._root;
        for (let i = 0; i < this._length; i++) {
            if (tmp.Value == value) {
                return i
            }
            tmp = tmp.Next;
        }
        return index;
    }

    OverwriteByIndex(index: number, value: number) {
        if (index == 0) {
            this.DeleteFirst();
            this.Unshift(value);
        }
        else {
            this.AddByIndex(index, value);
            this.DeleteByIndex(index + 1);
        }
        return this;
    }

    GetMinElement(): number | undefined {
        if (this._length != 0) {
            let min = this._root.Value;
            let tmp = this._root;
            while (tmp != null) {
                if (tmp.Value < min) {
                    min = tmp.Value;
                }
                tmp = tmp.Next;
            }
            return min;
        }
        return undefined;
    }

    GetMaxElement(): number | undefined {
        if (this._length != 0) {
            let max = this._root.Value;
            let tmp = this._root;
            while (tmp != null) {
                if (tmp.Value > max) {
                    max = tmp.Value;
                }
                tmp = tmp.Next;
            }
            return max;
        }

        return undefined;
    }

    GetIndexOfMinElement() {
        return this.GetIndexByValue(this.GetMinElement());
    }

    FindIndexOfMaxElement() {
        return this.GetIndexByValue(this.GetMaxElement());
    }

    DeleteByValueFirst(value: number) {
        if (this.GetIndexByValue(value) != -1) {
            this.DeleteByIndex(this.GetIndexByValue(value));
            return this;
        }
        return -1;
    }

    DeleteByValueAll(value: number) {
        let result: number | DoubleLinkedList = -1;
        while (this.GetIndexByValue(value) != -1) {
            result = this.DeleteByValueFirst(value);
        }
        return result;
    }

    AddArray(array: number[]) {
        if (array.length == 0) {
            return this;
        }
        let input = new DoubleLinkedList(array);
        if (this._length == 0) {
            this._root = input._root;
            this._tail = input._tail;
            this._length = array.length;
            this.ActualizeIndexes();
            return this;
        }
        else {
            if (this._length == 1) {
                this._root.Next = input._root;
                this._root.Next.Pre = this._root;
                this._tail = input._tail;
                this._length += array.length;
                this.ActualizeIndexes();
                return this;
            }
            else {
                let tmp = this._tail;
                tmp.Next = input._root;
                input._root.Pre = tmp;
                this._tail = input._tail;
                this._length += array.length;
                this.ActualizeIndexes();
                return this;
            }
        }
    }
    UnshiftArray(array:number[]){
        let input = new DoubleLinkedList(array);
        if (this._length == 0){
            this._root = input._root;
            this._tail = input._tail;
            this._length = array.length;
            this.ActualizeIndexes();
            return this;
        }
        if (array.length == 0){
            return this;
        }
        if (array.length == 1){
            this.Add(array[0]);
            return this;
        }
        else{
            let tmp = input[input.MaxIndex];
            tmp.Next = this._root;
            tmp.Next.Pre = tmp;
            this._root = input._root;
            this._length += array.length;
            this.ActualizeIndexes();
            return this;
        }
    }

    AddArrayByIndex(index:number, array:number[]){
        if (index == this._length){
            this.AddArray(array);
            return this;
        }
        if (index == 0){
            this.UnshiftArray(array);
            return this;
        }
        else{
            if (array.length == 0){
                return;
            }
            if (array.length == 1){
                this.AddByIndex(index, array[0]);
                return this;
            }
            else{
                let input = new DoubleLinkedList(array);
                let tmp = this._root;
                let tmp2 = input._tail;
                for (let i = 1; i < index; i++){
                    tmp = tmp.Next;
                }
                let current = tmp.Next;
                tmp.Next = input._root;
                tmp.Next.Pre = tmp;
                tmp2.Next = current;
                tmp2.Next.Pre = tmp2;
                this._length += input.Length;
                this.ActualizeIndexes();
                return this;
            }
        }
    }

    DeleteNElementsFromEnd(number:number){
        for (let i = 0; i < number; i++){
            this.DeleteLast();
        }
        return this;
    }

    DeleteNElementsFromStart(number:number){
        for (let i = 0; i < number; i++){
            this.DeleteFirst();
        }
        return this;
    }

    DeleteNElementsByIndex(number:number, index:number){
        for (let i = 0; i < number; i++){
            this.DeleteByIndex(index);
        }
        return this;
    }

    SortAscend(){
        if (this._length != 0){
            let newRoot = new Node(this.GetMinElement());
            let length = this._length;
            this.DeleteByValueFirst(this.GetMinElement());
            let tmpNode = newRoot;
            for (let i = 1; i < length; i++){
                tmpNode.Next = new Node(this.GetMinElement());
                tmpNode.Next.Pre = tmpNode;
                this.DeleteByValueFirst(this.GetMinElement());
                tmpNode = tmpNode.Next;
            }
            this._tail = tmpNode;
            this._length = length;
            this._root = newRoot;
            this.ActualizeIndexes();
            return this;
        }
        else return this;
    }

    SortDescend() {
        if (this._length != 0){
            let newRoot = new Node(this.GetMaxElement());
            let tmpLength = this._length;
            this.DeleteByValueFirst(this.GetMaxElement());
            let tmpNode = newRoot;
            for (let i = 1; i < tmpLength; i++){
                tmpNode.Next = new Node(this.GetMaxElement());
                tmpNode.Next.Pre = tmpNode;
                this.DeleteByValueFirst(this.GetMaxElement());
                tmpNode = tmpNode.Next;
            }
            this._tail = tmpNode;
            this._length = tmpLength;
            this._root = newRoot;
            this.ActualizeIndexes()
            return this;
        }
        else return this;
    }

    Reverse(){
        let currentNode = this._root;
        let prevNode = null;
        let tmpNextNode = null;
        while (currentNode!=null) {
            tmpNextNode = currentNode.Next;
            prevNode = currentNode.Pre;
            currentNode.Next = prevNode;
            currentNode.Pre = tmpNextNode;
            prevNode = currentNode;
            currentNode = tmpNextNode;
        }
        this._tail = this._root;
        this._root = prevNode;
        return this;
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


let arr = [6, 1, 2, 3, 4, 5];
let arr1 = [1, 2];

let myList = new DoubleLinkedList(arr1);
console.log(myList.Reverse().toString());
