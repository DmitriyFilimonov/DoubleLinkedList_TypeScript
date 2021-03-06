"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoubleLinkedList = exports.Node = void 0;
var Node = /** @class */ (function () {
    function Node(input) {
        var _a, _b, _c;
        this.Value = ((_a = input) === null || _a === void 0 ? void 0 : _a.Value) || input;
        this.Next = ((_b = input) === null || _b === void 0 ? void 0 : _b.Next) || null;
        this.Pre = ((_c = input) === null || _c === void 0 ? void 0 : _c.Pre) || null;
    }
    Object.defineProperty(Node.prototype, "Value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "Next", {
        get: function () {
            return this._next;
        },
        set: function (next) {
            this._next = next;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "Pre", {
        get: function () {
            return this._pre;
        },
        set: function (pre) {
            this._pre = pre;
        },
        enumerable: false,
        configurable: true
    });
    Node.prototype.toString = function (callback) {
        return callback ? callback(this.Value) : "" + this.Value;
    };
    return Node;
}());
exports.Node = Node;
var DoubleLinkedList = /** @class */ (function () {
    function DoubleLinkedList(input) {
        if ((typeof input != typeof new Object())) {
            if (input == undefined) {
                this._root = null;
                this._tail = null;
                this._length = 0;
            }
            else {
                this.Add(input);
            }
        }
        else {
            if (input.length != 0) {
                for (var i = 0; i < input.length; i++) {
                    this.Add(input[i]);
                }
            }
            else {
                this._root = null;
                this._tail = null;
                this._length = 0;
            }
        }
    }
    Object.defineProperty(DoubleLinkedList.prototype, "Length", {
        get: function () {
            var i = 0;
            if (this._length != 0) {
                var tmp = this._root;
                while (tmp != null) {
                    tmp = tmp.Next;
                    i++;
                }
            }
            else {
                this._length = 0;
            }
            return this._length;
        },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(DoubleLinkedList.prototype, "MaxIndex", {
        get: function () {
            return this._length - 1;
        },
        enumerable: false,
        configurable: true
    });
    DoubleLinkedList.prototype.CreateFirstNode = function (value) {
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
    };
    DoubleLinkedList.prototype.Add = function (value) {
        value = this.CreateFirstNode(value);
        if (value != null) {
            var tmp = this._tail;
            this._tail.Next = new Node(value);
            this._tail = this._tail.Next;
            this._tail.Pre = tmp;
            this._length++;
            this[this.MaxIndex] = this._tail;
        }
    };
    DoubleLinkedList.prototype.Unshift = function (value) {
        value = this.CreateFirstNode(value);
        if (value != null) {
            var tmp = this._root;
            this._root = new Node(value);
            this._root.Next = tmp;
            tmp.Pre = this._root;
            this._length++;
            this.ActualizeIndexes();
        }
    };
    DoubleLinkedList.prototype.ActualizeIndexes = function () {
        var tmp = this._root;
        var i = 0;
        while (tmp != null) {
            this[i] = tmp;
            i++;
            tmp = tmp.Next;
        }
    };
    DoubleLinkedList.prototype.AddByIndex = function (index, value) {
        if (index <= this._length) {
            if (index < this._length / 2) {
                var tmp = this._root;
                for (var i = 1; i < index; i++) {
                    tmp = tmp.Next;
                }
                var tmp2 = tmp.Next;
                tmp.Next = new Node(value);
                tmp.Next.Next = tmp2;
                tmp.Next.Next.Pre = tmp.Next;
                tmp.Next.Pre = tmp;
                this._length++;
            }
            else if (index != this._length) {
                var tmp = this._tail;
                for (var i = this._length - 2; i >= index; i--) {
                    tmp = tmp.Pre;
                }
                var tmp2 = tmp.Pre;
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
    };
    DoubleLinkedList.prototype.DeleteLast = function () {
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
    };
    DoubleLinkedList.prototype.DeleteFirst = function () {
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
    };
    DoubleLinkedList.prototype.DeleteByIndex = function (index) {
        if (this._length != 0 && index <= this.MaxIndex) {
            if (index == 0)
                this.DeleteFirst();
            else if (index == this.MaxIndex)
                this.DeleteLast();
            else {
                if (index <= this._length / 2 + 1) {
                    var tmp = this._root;
                    for (var i = 1; i < index; i++) {
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
                    var tmp = this._tail;
                    for (var i = this.MaxIndex - 1; i >= index; i--) {
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
        else
            return this;
    };
    DoubleLinkedList.prototype.GetIndexByValue = function (value) {
        var index = -1;
        if (this._length == 0) {
            return index;
        }
        if (this._root.Value == value && this._length == 1) {
            return index = 0;
        }
        var tmp = this._root;
        for (var i = 0; i < this._length; i++) {
            if (tmp.Value == value) {
                return i;
            }
            tmp = tmp.Next;
        }
        return index;
    };
    DoubleLinkedList.prototype.OverwriteByIndex = function (index, value) {
        if (index == 0) {
            this.DeleteFirst();
            this.Unshift(value);
        }
        else {
            this.AddByIndex(index, value);
            this.DeleteByIndex(index + 1);
        }
        return this;
    };
    DoubleLinkedList.prototype.GetMinElement = function () {
        if (this._length != 0) {
            var min = this._root.Value;
            var tmp = this._root;
            while (tmp != null) {
                if (tmp.Value < min) {
                    min = tmp.Value;
                }
                tmp = tmp.Next;
            }
            return min;
        }
        return undefined;
    };
    DoubleLinkedList.prototype.GetMaxElement = function () {
        if (this._length != 0) {
            var max = this._root.Value;
            var tmp = this._root;
            while (tmp != null) {
                if (tmp.Value > max) {
                    max = tmp.Value;
                }
                tmp = tmp.Next;
            }
            return max;
        }
        return undefined;
    };
    DoubleLinkedList.prototype.GetIndexOfMinElement = function () {
        return this.GetIndexByValue(this.GetMinElement());
    };
    DoubleLinkedList.prototype.FindIndexOfMaxElement = function () {
        return this.GetIndexByValue(this.GetMaxElement());
    };
    DoubleLinkedList.prototype.DeleteByValueFirst = function (value) {
        if (this.GetIndexByValue(value) != -1) {
            this.DeleteByIndex(this.GetIndexByValue(value));
            return this;
        }
        return -1;
    };
    DoubleLinkedList.prototype.DeleteByValueAll = function (value) {
        var result = -1;
        while (this.GetIndexByValue(value) != -1) {
            result = this.DeleteByValueFirst(value);
        }
        return result;
    };
    DoubleLinkedList.prototype.AddArray = function (array) {
        if (array.length == 0) {
            return this;
        }
        var input = new DoubleLinkedList(array);
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
                var tmp = this._tail;
                tmp.Next = input._root;
                input._root.Pre = tmp;
                this._tail = input._tail;
                this._length += array.length;
                this.ActualizeIndexes();
                return this;
            }
        }
    };
    DoubleLinkedList.prototype.UnshiftArray = function (array) {
        var input = new DoubleLinkedList(array);
        if (this._length == 0) {
            this._root = input._root;
            this._tail = input._tail;
            this._length = array.length;
            this.ActualizeIndexes();
            return this;
        }
        if (array.length == 0) {
            return this;
        }
        if (array.length == 1) {
            this.Add(array[0]);
            return this;
        }
        else {
            var tmp = input[input.MaxIndex];
            tmp.Next = this._root;
            tmp.Next.Pre = tmp;
            this._root = input._root;
            this._length += array.length;
            this.ActualizeIndexes();
            return this;
        }
    };
    DoubleLinkedList.prototype.AddArrayByIndex = function (index, array) {
        if (index == this._length) {
            this.AddArray(array);
            return this;
        }
        if (index == 0) {
            this.UnshiftArray(array);
            return this;
        }
        else {
            if (array.length == 0) {
                return;
            }
            if (array.length == 1) {
                this.AddByIndex(index, array[0]);
                return this;
            }
            else {
                var input = new DoubleLinkedList(array);
                var tmp = this._root;
                var tmp2 = input._tail;
                for (var i = 1; i < index; i++) {
                    tmp = tmp.Next;
                }
                var current = tmp.Next;
                tmp.Next = input._root;
                tmp.Next.Pre = tmp;
                tmp2.Next = current;
                tmp2.Next.Pre = tmp2;
                this._length += input.Length;
                this.ActualizeIndexes();
                return this;
            }
        }
    };
    DoubleLinkedList.prototype.DeleteNElementsFromEnd = function (number) {
        for (var i = 0; i < number; i++) {
            this.DeleteLast();
        }
        return this;
    };
    DoubleLinkedList.prototype.DeleteNElementsFromStart = function (number) {
        for (var i = 0; i < number; i++) {
            this.DeleteFirst();
        }
        return this;
    };
    DoubleLinkedList.prototype.DeleteNElementsByIndex = function (number, index) {
        for (var i = 0; i < number; i++) {
            this.DeleteByIndex(index);
        }
        return this;
    };
    DoubleLinkedList.prototype.SortAscend = function () {
        if (this._length != 0) {
            var newRoot = new Node(this.GetMinElement());
            var length_1 = this._length;
            this.DeleteByValueFirst(this.GetMinElement());
            var tmpNode = newRoot;
            for (var i = 1; i < length_1; i++) {
                tmpNode.Next = new Node(this.GetMinElement());
                tmpNode.Next.Pre = tmpNode;
                this.DeleteByValueFirst(this.GetMinElement());
                tmpNode = tmpNode.Next;
            }
            this._tail = tmpNode;
            this._length = length_1;
            this._root = newRoot;
            this.ActualizeIndexes();
            return this;
        }
        else
            return this;
    };
    DoubleLinkedList.prototype.SortDescend = function () {
        if (this._length != 0) {
            var newRoot = new Node(this.GetMaxElement());
            var tmpLength = this._length;
            this.DeleteByValueFirst(this.GetMaxElement());
            var tmpNode = newRoot;
            for (var i = 1; i < tmpLength; i++) {
                tmpNode.Next = new Node(this.GetMaxElement());
                tmpNode.Next.Pre = tmpNode;
                this.DeleteByValueFirst(this.GetMaxElement());
                tmpNode = tmpNode.Next;
            }
            this._tail = tmpNode;
            this._length = tmpLength;
            this._root = newRoot;
            this.ActualizeIndexes();
            return this;
        }
        else
            return this;
    };
    DoubleLinkedList.prototype.Reverse = function () {
        var currentNode = this._root;
        var prevNode = null;
        var tmpNextNode = null;
        while (currentNode != null) {
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
    };
    DoubleLinkedList.prototype.toArray = function () {
        var nodes = [];
        var currentNode = this._root;
        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.Next;
        }
        return nodes;
    };
    DoubleLinkedList.prototype.toString = function (callback) {
        return this.toArray().map(function (node) { return node.toString(callback); }).toString();
    };
    return DoubleLinkedList;
}());
exports.DoubleLinkedList = DoubleLinkedList;
var arr = [6, 1, 2, 3, 4, 5];
var arr1 = [1, 2];
var myList = new DoubleLinkedList(arr1);
console.log(myList.Reverse().toString());
