"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoubleLinkedList = exports.Node = void 0;
var Node = /** @class */ (function () {
    function Node(input) {
        this.Value = input || input.Value || undefined;
        this.Next = input.Next || undefined || null;
        this.Pre = input.Pre || undefined || null;
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
    return Node;
}());
exports.Node = Node;
var DoubleLinkedList = /** @class */ (function () {
    function DoubleLinkedList() {
        this._length = 0;
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
    DoubleLinkedList.prototype.Add = function (value) {
        if (this._length == 0) {
            this._root = new Node(value);
            this._tail = this._root;
            this[this._length] = this._root;
            this._length++;
        }
        else {
            var tmp = this._tail;
            this._tail.Next = new Node(value);
            this._tail = this._tail.Next;
            this._tail.Pre = tmp;
            this._length++;
            this[this.MaxIndex] = this._tail;
        }
    };
    return DoubleLinkedList;
}());
exports.DoubleLinkedList = DoubleLinkedList;
var myList = new DoubleLinkedList();
myList.Add(1);
myList.Add(5);
myList.Add(3);
myList.Add(50);
console.log(myList);
//if (myList.Length==0) console.log(0); else console.log(myList.Length);
